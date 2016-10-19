class Admin::VerificationsController < Admin::BaseController
  before_action do
    authorize!(:manage, :verifications)
  end

  def index
    @users = User.incomplete_verification.page(params[:page])
  end

  def search
    @users = User.incomplete_verification.search(params[:name_or_email]).page(params[:page]).for_render
    render :index
  end

end
