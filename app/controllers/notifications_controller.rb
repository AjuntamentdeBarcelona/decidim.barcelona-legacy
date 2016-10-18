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
      participatory_process = @notification.notifiable.participatory_process
      resource_name = @notification.notifiable.class.name.downcase.pluralize

      redirect_to url_for({
        controller: resource_name,
        action: 'show',
        id: @notification.notifiable,
        participatory_process_id: participatory_process,
        step_id: Step.step_for(participatory_process, resource_name)
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
