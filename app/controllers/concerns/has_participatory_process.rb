module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]

    def participatory_process
      begin
        if params[:participatory_process_id].blank?
          # TODO: load from subdomain?
          @participatory_process = ParticipatoryProcess.first
        else
          @participatory_process_id = params[:participatory_process_id]
          @participatory_process = ParticipatoryProcess.published.find(params[:participatory_process_id])
        end
      rescue
        raise ActionController::RoutingError.new('Not Found')
      end
    end
  end
end
