module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]
    helper_method :participatory_process_step

    def participatory_process
      begin
        if params[:participatory_process_id]
          @participatory_process_id = params[:participatory_process_id]
          @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
        end
      rescue
        raise ActionController::RoutingError.new('Not Found')
      end

      raise ActionController::RoutingError.new("Not allowed") unless can?(:read, @participatory_process)
    end

    def participatory_process_step
      return unless participatory_process
      step = participatory_process.steps.find(params[:step_id])
      raise "Not authorized" unless step.enabled?
      step
    end
  end
end
