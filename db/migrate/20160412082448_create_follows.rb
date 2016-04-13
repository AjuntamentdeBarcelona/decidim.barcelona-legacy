class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :follower_id
      t.integer :following_id
      t.string  :following_type

      t.timestamps
    end
  end
end
