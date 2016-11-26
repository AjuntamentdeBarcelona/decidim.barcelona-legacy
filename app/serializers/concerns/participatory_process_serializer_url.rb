module Concerns
  module ParticipatoryProcessSerializerUrl
    def url
      scope && scope.url_for(id: object, controller: "/#{controller_name}", action: :show,
                                  participatory_process_id: object.participatory_process.slug,
                                  step_id: serialization_options[:step_id] || step)
    end

    def step
      object.participatory_process
        .includes(:steps)
        .steps.where(active: true).order('position desc')
        .to_a.find{ |s| s.flags.include? feature_name }
    end

    def feature_name
      raise "Must implement"
    end

    def controller_name
      feature_name
    end
  end
end
