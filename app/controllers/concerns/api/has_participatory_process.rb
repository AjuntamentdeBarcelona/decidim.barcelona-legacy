module Api::HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, only: [:index]

    def participatory_process
      begin
        if params[:participatory_process_id].present?
          @participatory_process_id ||= params[:participatory_process_id]
          @participatory_process ||= ParticipatoryProcess.find(params[:participatory_process_id])
          raise ActionController::RoutingError.new("Not allowed") unless can?(:read, @participatory_process)

          @participatory_process
        end
      rescue
        render json: {error: "Not found"}, status: 404
      end
    end
  end
end
