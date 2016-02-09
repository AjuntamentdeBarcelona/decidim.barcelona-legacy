class ResourceFilter
  IGNORE_FILTER_PARAMS = ["source", "other"]
  attr_reader :search_filter, :tag_filter, :params

  def initialize(params={})
    @params = params[:filter]
    @exclude_ids = params[:exclude_ids]
    @search_filter = params[:search] if params[:search].present?
    @tag_filter = params[:tag]
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

      if @params["source"].present?
        @params["official"] = @params["source"].include? "official"
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

      if @params["source"] && @params["source"].include?("organizations")
        #proposal_from_organizations_ids = Organization.verified.pluck(:id).uniq
        proposal_from_organizations_ids = Organization.pluck(:id).uniq
        collection = collection.where(id: proposal_from_organizations_ids)
      end

    end
    collection
  end
end
