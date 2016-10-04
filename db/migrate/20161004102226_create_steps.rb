class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.text :title
      t.text :description
      t.date :start_at
      t.date :end_at
      t.integer :position, default: 0
      t.integer :participatory_process_id
      t.datetime :hidden_at
      t.datetime :confirmed_hide_at

      t.timestamps null: false
    end
  end
end
