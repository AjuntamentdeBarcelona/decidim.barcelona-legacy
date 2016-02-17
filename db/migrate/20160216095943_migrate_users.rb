class MigrateUsers < ActiveRecord::Migration
  def change
    execute("SELECT user_id from administrators").each do |result|
      user = User.find(result["user_id"])
      user.roles = ['administrator']
      user.save!
    end

    execute("SELECT user_id from moderators").each do |result|
      user = User.find(result["user_id"])
      user.roles = ['moderator']
      user.save!
    end

    Comment.where('administrator_id IS NOT NULL').each do |comment|
      user_data = execute("select user_id from administrators where id=#{comment.administrator_id}")
      comment.update(administrator_id: user_data["user_id"])
    end

    Comment.where('moderator_id IS NOT NULL').each do |comment|
      user_data = execute("select user_id from moderators where id=#{comment.moderator_id}")
      comment.update(moderator_id: user_data["user_id"])
    end

    drop_table :administrators
    drop_table :moderators
  end
end
