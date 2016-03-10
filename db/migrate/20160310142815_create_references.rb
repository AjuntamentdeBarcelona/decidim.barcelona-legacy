class CreateReferences < ActiveRecord::Migration
  def change
    create_table :references do |t|
      t.references :comment
      t.references :referenced, polymorphic: true

      t.timestamps null: false
    end
  end
end
