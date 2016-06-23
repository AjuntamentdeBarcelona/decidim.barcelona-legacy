module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]

    def participatory_process
      begin
        if params[:participatory_process_id].present?
          @participatory_process_id = params[:participatory_process_id]
          @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
        else
          default_participatory_process_id = ParticipatoryProcess.first.slug
          redirect_to url_for(params.merge(participatory_process_id: default_participatory_process_id))
        end
      rescue
        raise ActionController::RoutingError.new('Not Found')
      end
    end
  end
end
