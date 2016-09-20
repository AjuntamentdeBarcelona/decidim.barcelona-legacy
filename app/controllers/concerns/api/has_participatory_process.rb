module Api::HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, only: [:index]

    def participatory_process
      begin
        if params[:participatory_process_id].present?
          @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
        end
      rescue
        render json: {error: "Not found"}, status: 404
      end
    end
  end
end
