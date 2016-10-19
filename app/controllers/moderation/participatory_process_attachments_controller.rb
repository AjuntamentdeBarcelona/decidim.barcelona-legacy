class Moderation::ParticipatoryProcessAttachmentsController < Moderation::BaseController
  before_filter :load_participatory_process
  authorize_resource

  def index
    @attachments = @participatory_process.attachments.order(:name)
    @new_attachment = ParticipatoryProcessAttachment.new(participatory_process: @participatory_process)
  end

  def create
    @attachment = @participatory_process.attachments.build(attachment_params)

    if @attachment.save
      redirect_to url_for(action: :index)
    else
      render :new
    end
  end

  def destroy
    @attachment = @participatory_process.attachments.find(params[:id])
    @attachment.destroy

    redirect_to url_for(action: :index)
  end

  def restore
    @participatory_process = ParticipatoryProcess.with_hidden.find(params[:id])
    @participatory_process.restore
    redirect_to moderation_participatory_processes_url(filter: @current_filter), notice: t('flash.actions.update.notice', resource_name: "Participatory process")
  end

  def publish
    change_participatory_process_published_flag_to(true)
  end

  def unpublish
    change_participatory_process_published_flag_to(false)
  end

  private

  def attachment_params
    params.require(:participatory_process_attachment).permit(
      :name, :file, :description => I18n.available_locales.map(&:to_s),
    )
  end

  def load_participatory_process
    @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
  end
end
