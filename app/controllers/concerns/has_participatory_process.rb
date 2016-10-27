module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]
    helper_method :participatory_process_step

    def participatory_process
      if params[:participatory_process_id]
        @participatory_process_id ||= params[:participatory_process_id]
        @participatory_process ||= ParticipatoryProcess.find(params[:participatory_process_id])
        raise ActionController::RoutingError.new("Not allowed") unless can?(:read, @participatory_process)

        @participatory_process
      end
    end

    def participatory_process_step
      return unless participatory_process
      @participatory_process_step = participatory_process.steps.find(params[:step_id])
      raise "Not authorized" unless @participatory_process_step.enabled?
      @participatory_process_step
    end
  end
end
