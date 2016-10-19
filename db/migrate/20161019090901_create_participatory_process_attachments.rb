class CreateParticipatoryProcessAttachments < ActiveRecord::Migration
  def change
    create_table :participatory_process_attachments do |t|
      t.string :name
      t.string :file
      t.string :content_type
      t.text :description
      t.integer :file_size
      t.references :participatory_process, null: false
      t.timestamps null: false
    end
  end
end
