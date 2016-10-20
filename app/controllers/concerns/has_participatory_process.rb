module HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, except: [:destroy]

    def participatory_process
      if params[:participatory_process_id].blank?
        # TODO: load from subdomain?
        @participatory_process = ParticipatoryProcess.first
      else
        @participatory_process_id = params[:participatory_process_id]
        @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
      end

      if @participatory_process && !can?(:read, @participatory_process)
        raise ActionController::RoutingError.new("Not allowed")
      end

      @participatory_process
    end
  end
end
