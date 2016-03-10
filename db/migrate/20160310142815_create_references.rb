class CreateReferences < ActiveRecord::Migration
  def change
    create_table :references do |t|
      t.references :source, polymorphic: true
      t.references :referrer, polymorphic: true
      t.references :referenced, polymorphic: true

      t.timestamps null: false
    end
  end
end
