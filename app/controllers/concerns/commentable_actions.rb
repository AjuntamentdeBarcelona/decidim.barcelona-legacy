module CommentableActions
  extend ActiveSupport::Concern
  include Polymorphic

  def index
    @resources = @search_terms.present? ? resource_model.search(@search_terms) : resource_model.all
    @resources = @advanced_search_terms.present? ? @resources.filter(@advanced_search_terms) : @resources

    @resources = @resources.tagged_with(@tag_filter) if @tag_filter
    @resources = @resources.page(params[:page]).for_render.send("sort_by_#{@current_order}")
    @resources = @resources.where(participatory_process: @participatory_process) if @participatory_process.present?
    index_customization if index_customization.present?

    @tag_cloud = tag_cloud
    set_resource_votes(@resources)
    set_resources_instance
  end

  def show
    set_resource_votes(resource)
    @commentable = resource
    @comment_tree = CommentTree.new(@commentable, params[:page], @current_order)
    set_comment_flags(@comment_tree.comments)
    set_resource_instance
  end

  def new
    raise "Unauthorized" unless user_can_create?
    @resource = resource_model.new
    set_resource_instance
    load_featured_tags
  end

  def create
    raise "Unauthorized" unless user_can_create?
    @resource = resource_model.new(strong_params)
    @resource.author = current_user
    @resource.participatory_process_id = @participatory_process.id if @participatory_process.present?

    if verify_recaptcha(model: @resource) && @resource.save
      track_event
      if @resource.participatory_process.present?
        redirect_path = url_for(controller: controller_name, action: :show,
                                id: @resource,
                                participatory_process_id: @resource. participatory_process,
                                step_id: Step. step_for(@resource.participatory_process, controller_name))
      else
        redirect_path = url_for(controller: controller_name, action: :show, id: @resource)
      end
      redirect_to redirect_path, notice: t("flash.actions.create.#{resource_name.underscore}")
    else
      load_featured_tags
      set_resource_instance
      render :new
    end
  end

  def edit
    load_featured_tags
  end

  def update
    resource.assign_attributes(strong_params)
    if verify_recaptcha(model: resource) && resource.save
      if resource.participatory_process.present?
        redirect_path = url_for(controller: controller_name, action: :show,
                                id: resource, participatory_process_id: resource.participatory_process,
                                step_id: Step.step_for(resource.participatory_process, controller_name))
      else
        redirect_path = url_for(controller: controller_name, action: :show, id: resource)
      end
      redirect_to redirect_path, notice: t("flash.actions.update.#{resource_name.underscore}")
    else
      load_featured_tags
      set_resource_instance
      render :edit
    end
  end

  private

    def track_event
      ahoy.track "#{resource_name}_created".to_sym, "#{resource_name}_id": resource.id
    end

    def tag_cloud
      resource_model.last_week.tag_counts.order("#{resource_name.pluralize}_count": :desc, name: :asc).limit(5)
    end

    def load_featured_tags
      @featured_tags = ActsAsTaggableOn::Tag.where(featured: true)
    end

    def parse_tag_filter
      if params[:tag].present?
        @tag_filter = params[:tag] if ActsAsTaggableOn::Tag.named(params[:tag]).exists?
      end
    end

    def parse_search_terms
      @search_terms = params[:search] if params[:search].present?
    end

    def parse_advanced_search_terms
      @advanced_search_terms = params[:advanced_search] if params[:advanced_search].present?
      parse_search_date
    end

    def parse_search_date
      return unless search_by_date?
      params[:advanced_search][:date_range] = search_date_range
    end

    def search_by_date?
      params[:advanced_search] && params[:advanced_search][:date_min].present?
    end

    def search_start_date
      case params[:advanced_search][:date_min]
      when '1'
        24.hours.ago
      when '2'
        1.week.ago
      when '3'
        1.month.ago
      when '4'
        1.year.ago
      else
        Date.parse(params[:advanced_search][:date_min]) rescue nil
      end
    end

    def method_name

    end

    def search_finish_date
      params[:advanced_search][:date_max].try(:to_date) || Date.today
    end

    def search_date_range
      search_start_date.beginning_of_day..search_finish_date.end_of_day
    end

    def set_search_order
      if params[:search].present? && params[:order].blank?
        params[:order] = 'relevance'
      end
    end

    def set_resource_votes(instance)
      send("set_#{resource_name}_votes", instance)
    end

    def index_customization
      nil
    end

    def user_can_create?
      step = Step.find(params[:step_id])
      resource_name != "proposal" || step.feature_enabled?(:enable_proposal_creation)
    end
end
