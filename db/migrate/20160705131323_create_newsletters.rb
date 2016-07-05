class CreateNewsletters < ActiveRecord::Migration
  def change
    create_table :newsletters do |t|
      t.text :title, null: false
      t.text :body, null: false
      t.datetime :sent_at

      t.timestamps null: false
    end
  end
end
