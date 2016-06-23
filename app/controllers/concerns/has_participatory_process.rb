module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]

    def participatory_process
      begin
        @participatory_process_id = params[:participatory_process_id]
        @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
      rescue
        raise ActionController::RoutingError.new('Not Found')
      end
    end
  end
end
