class Moderation::Meetings::CloseController <  Moderation::BaseController
  include ModerateActions

  load_and_authorize_resource :meeting

  def new
  end

  def create
    resource.assign_attributes(strong_params)
    resource.closed_at = Time.now
    if resource.save
      redirect_to moderation_meetings_url, notice: t('flash.actions.update.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :new
    end
  end

  private

  def meeting_params
    params.require(:meeting).permit(:close_report, :attendee_count,
                                    :organizations,:interventions,
                                    meeting_proposals_attributes: [:id, :consensus])
  end

  def resource_model
    Meeting
  end
end
