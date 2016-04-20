class ResourceFilter
  IGNORE_FILTER_PARAMS = ["source", "other", "date", "reviewer_status",
                          "interaction", "action_plan", "review_validation",
                          "review_status", "action_plan_approval", "action_plan_source"]
  attr_reader :search_filter, :tag_filter, :params

  def initialize(params={}, options = {})
    @params = params[:filter].deep_dup
    @exclude_ids = params[:exclude_ids]
    @search_filter = params[:search] if params[:search].present?
    @tag_filter = params[:tag]
    @options = options
  end

  def filter_collection(collection)
    collection = exclude(collection)
    collection = filter_by_search(collection)
    collection = filter_by_tag(collection)
    collection = filter(collection)
    collection
  end

  def tag_cloud(collection)
    collection.tag_counts.order("#{collection.table_name}_count": :desc, name: :asc).limit(20)
  end

  private

  def exclude(collection)
    if @exclude_ids.present?
      collection = collection.where("id not in (?)", @exclude_ids)
    end
    collection
  end

  def filter_by_search(collection)
    if @search_filter.present?
      collection = collection.search(@search_filter)
    end
    collection
  end

  def filter_by_tag(collection)
    if @tag_filter.present?
      if @tag_filter.kind_of? String
        @tag_filter = @tag_filter.split(',')
      end
      @tag_filter = @tag_filter if ActsAsTaggableOn::Tag.named_any(@tag_filter).exists?
      collection = collection.tagged_with(@tag_filter) if @tag_filter
    end
    collection
  end

  def filter(collection)
    if @params.present?
      @params = @params.split(':').reduce({}) do |result, filterGroup|
        filterGroupName, filterGroupValue = filterGroup.split('=')
        result[filterGroupName] = filterGroupValue.split(',') if filterGroupValue
        result
      end
    else
      @params = {}
    end

    if @params["source"].present?
      @params["official"] = true if @params["source"].include? "official"
    end

    if @params["source"].present?
      @params["from_meeting"] = true if @params["source"].include? "meetings"
    end

    if @options[:filter_date]
      if @params["date"] && @params["date"].include?("past")
        collection = collection.past
      else
        collection = collection.upcoming
      end
    end

    @params.each do |attr, value|
      unless IGNORE_FILTER_PARAMS.include? attr
        collection = collection.where(attr => value)
      end
    end

    if @params["other"] && @params["other"].include?("meetings")
      proposal_in_meetings_ids = MeetingProposal.pluck(:proposal_id).uniq
      collection = collection.where(id: proposal_in_meetings_ids)
    end

    if @params["source"] && @params["source"].include?("organization")
      collection = collection.where(author_id: Organization.verified.select(:user_id))
    end

    if @params["source"] && @params["source"].include?("citizenship")
      collection = collection.where(official: false)
    end

    if @params["interaction"]
      collection = build_interaction(collection, @params["interaction"])
    end

    if @params["action_plan"] && params["action_plan"].include?("with_action_plan")
      collection = collection.includes(:action_plans).where.not(action_plans: { id: nil })
    end

    if @params["action_plan"] && params["action_plan"].include?("without_action_plan")
      collection = collection.includes(:action_plans).where(action_plans: { id: nil })
    end

    if @params["review_validation"]
      if params["review_validation"].include?("validated")
        collection = collection.includes(:answer).where(proposal_answers: { official: true })
      elsif params["review_validation"].include?("not_validated")
        collection = collection.includes(:answer). where(proposal_answers: { official: false })
      end
    end

    if @params["review_status"]
      collection = collection.includes(:answer).
                   where(proposal_answers: { status: @params["review_status"]})
    end

    if @params["reviewer_status"]
      if params["reviewer_status"].include? "reviewed"
        collection = collection.reviewed
      else
        collection = collection.not_reviewed
      end
    end

    if @params["action_plan_approval"]
      if params["action_plan_approval"].include? "approved"
        collection = collection.where(approved: true)
      else
        collection = collection.where(approved: false)
      end
    end

    if @params["action_plan_source"]
      if params["action_plan_source"].include? "official"
        collection = collection.where(official: true)
      end

      if params["action_plan_source"].include? "citizenship"
        collection = collection.where(official: false)
      end
    end

    collection
  end

  private

  def build_interaction(collection, interactions)
    return collection unless @options[:user]
    user = @options[:user]
    result = []

    if interactions.include?("voted")
      result << Proposal.arel_table[:id].in(user.get_voted(Proposal).pluck(:id))
    end

    if interactions.include?("created")
      result << Proposal.arel_table[:id].in(user.proposals.pluck(:id))
    end

    if interactions.include?("commented")
      comments = user.comments.where(commentable_type: 'Proposal')
      result << Proposal.arel_table[:id].in(comments.pluck(:commentable_id))
    end

    if interactions.include?("followed")
      follows = Follow.where(follower: user).where(following_type: "Proposal")
      result << Proposal.arel_table[:id].in(follows.pluck(:following_id))
    end

    collection.where(result.inject(&:or))
  end
end
