module Api::HasParticipatoryProcess
  extend ActiveSupport::Concern

  included do
    before_filter :participatory_process, only: [:index]

    def participatory_process
      if params[:participatory_process_id].present?
        @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
      end
    end
  end
end
