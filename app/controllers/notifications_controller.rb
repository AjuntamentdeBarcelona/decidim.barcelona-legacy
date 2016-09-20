class NotificationsController < ApplicationController
  before_action :authenticate_user!
  after_action :mark_as_read, only: :show
  skip_authorization_check

  def index
    @notifications = current_user.notifications.unread.recent.for_render
  end

  def show
    @notification = current_user.notifications.find(params[:id])
    if @notification.notifiable.respond_to? :participatory_process
      redirect_to url_for({
        controller: @notification.notifiable.class.name.downcase.pluralize,
        action: 'show',
        id: @notification.notifiable,
        participatory_process_id: @notification.notifiable.participatory_process
      })
    else
      redirect_to url_for(@notification.notifiable)
    end
  end

  def mark_all_as_read
    current_user.notifications.each { |notification| notification.mark_as_read }
    redirect_to notifications_path
  end

  private

    def mark_as_read
      @notification.mark_as_read
    end

end
