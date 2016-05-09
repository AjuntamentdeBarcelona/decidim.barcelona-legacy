class Admin::UsersController < Admin::BaseController
  has_filters %w{all without_confirmed_hide with_confirmed_hide administrators moderators dynamizers reviewer}, only: :index

  before_action :load_user, only: [:confirm_hide, :restore]

  helper_method :debates, :comments

  def index
    @users = User.
             with_hidden.
             send(@current_filter).
             order('updated_at desc').
             page(params[:page])

    @users = @users.search(params[:search]) if params[:search]
  end

  def edit
    @user = User.with_hidden.find(params[:id])
  end

  def update
    @user = User.with_hidden.find(params[:id])
    @user.assign_attributes user_params
    @user.roles = roles
    @user.skip_reconfirmation!

    if @user.save
      flash[:notice] = "User successfully saved"
      redirect_to action: 'edit'
    else
      render action: 'edit'
    end
  end

  def confirm_hide
    @user.confirm_hide
    redirect_to request.query_parameters.merge(action: :index)
  end

  def restore
    @user.restore
    Activity.log(current_user, :restore, @user)
    redirect_to request.query_parameters.merge(action: :index)
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :document_number, :document_type,
                                 :address, :verified, :official_level)
  end

  def roles
    params[:user][:roles].select{ |r| !r.blank? }.compact
  end

  def debates
    @debates = @user.debates.with_hidden.page(params[:page])
  end

  def comments
    @comments = @user.comments.with_hidden.page(params[:page])
  end

    def load_user
      @user = User.with_hidden.find(params[:id])
    end

end
