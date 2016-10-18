module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]
    helper_method :participatory_process_step

    def participatory_process
      begin
        if params[:participatory_process_id]
          @participatory_process_id = params[:participatory_process_id]
          @participatory_process = ParticipatoryProcess.published.find(params[:participatory_process_id]).decorate
        end
      rescue
        raise ActionController::RoutingError.new('Not Found')
      end
    end

    def participatory_process_step
      return unless participatory_process

      participatory_process.steps.find(params[:step_id])
    end
  end
end
