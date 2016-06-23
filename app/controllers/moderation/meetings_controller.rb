class Moderation::MeetingsController < Moderation::BaseController
  include HasParticipatoryProcess
  include ModerateActions

  has_filters %w{pending closed all}, only: :index

  before_action :load_resources, only: [:index]
  before_action :load_featured_tags, only: [:new, :create, :edit, :update]

  load_and_authorize_resource

  def index
    @participatory_processes = ParticipatoryProcess.all
    @search    = params[:search]
    @resources = @resources.send(@current_filter)
    @resources = @resources.search(@search) if @search.present?

    respond_to do |format|
      format.html do
        @resources = @resources.page(params[:page]).per(50)
        set_resources_instance
      end

      format.xls do
        package = Axlsx::Package.new do |p|
          p.workbook.add_worksheet(:name => "Meetings") do |sheet|
            row = []
            row.push "Data"
            row.push "Nom"
            row.push "Adreça"
            row.push "Assistents"
            row.push "Intervencions"
            row.push "Organizations"
            row.push "Propostes sorgides de la cita"
            row.push "Àmbit"
            row.push "Eix"
            row.push "Línia d'acció"
            sheet.add_row row
            @resources.each do |meeting|
              row = []
              row.push meeting.held_at
              row.push meeting.title
              row.push meeting.address
              row.push meeting.attendee_count
              row.push meeting.interventions
              row.push meeting.organization_count
              row.push meeting.proposals.size
              row.push meeting.scope == 'city' ? I18n.t('action_plans.form.action_plan_scope_city') : District.find(meeting.district).try(:name)
              row.push meeting.category.try(:decorate).try(:name)
              row.push meeting.subcategory.try(:decorate).try(:name)
              sheet.add_row row
            end
          end

        end

        send_data package.to_stream.read, disposition: 'inline', filename: "meetings.xls"
      end
    end
  end


  def new
    @resource = resource_model.new
    set_resource_instance
  end

  def create
    @resource = resource_model.new(strong_params)
    @resource.author = current_user
    @resource.participatory_process_id = @participatory_process.id if @participatory_process.present?

    if @resource.save
      redirect_to moderation_meetings_url, notice: t('flash.actions.create.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :new
    end
  end

  def edit
    @participatory_process = @meeting.participatory_process
  end

  def update
    resource.assign_attributes(strong_params)
    if resource.save
      redirect_to moderation_meetings_url, notice: t('flash.actions.update.notice', resource_name: "#{resource_name.capitalize}")
    else
      @participatory_process = resource.participatory_process
      set_resource_instance
      render :edit
    end
  end

  def destroy
    resource.destroy
    redirect_to moderation_meetings_url, notice: t('flash.actions.destroy.notice', resource_name: "#{resource_name.capitalize}")
  end

  private

  def meeting_params
    params.require(:meeting).permit(:title, :description, :address,
                                    :address_longitude, :address_latitude,
                                    :address_details, :held_at, :start_at,
                                    :end_at, :category_id, :subcategory_id,
                                    :tag_list, :scope, :district,
                                    :proposal_ids => [])
  end

  def resource_model
    Meeting
  end

  def load_resources
    @resources = resource_model.accessible_by(current_ability, :read)
  end

  def load_featured_tags
    @featured_tags = ActsAsTaggableOn::Tag.where(featured: true)
  end
end
