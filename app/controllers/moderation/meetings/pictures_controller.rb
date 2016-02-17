class Moderation::Meetings::PicturesController <  Moderation::BaseController
  helper_method :meeting
  authorize_resource :meeting

  def index
    @meeting_picture = MeetingPicture.new(meeting: meeting)
  end

  def create
    @meeting_picture = MeetingPicture.new(
      params.require(:meeting_picture).permit(:file)
    )
    @meeting_picture.meeting = meeting

    if @meeting_picture.save
      redirect_to :back
    else
      render action: 'index'
    end
  end

  def destroy
    @meeting_picture = meeting.pictures.find(params[:id])
    @meeting_picture.destroy!
    redirect_to :back
  end

  private

  def meeting
    @meeting ||= Meeting.find(params[:meeting_id])
  end
end
