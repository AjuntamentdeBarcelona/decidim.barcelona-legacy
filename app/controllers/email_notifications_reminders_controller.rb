class EmailNotificationsRemindersController < ApplicationController
  skip_authorization_check

  def create
    current_user.update_attributes(
      weekly_summary: true,
      email_on_comment: true,
      email_on_comment_reply: true,
      notifications_by_default: true
    )

    destroy
  end

  def destroy
    $redis.srem("email_notifications_reminder", current_user.id.to_s)
    render nothing: true
  end
end
