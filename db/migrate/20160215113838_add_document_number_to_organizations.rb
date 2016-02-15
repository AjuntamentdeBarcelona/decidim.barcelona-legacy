class AddDocumentNumberToOrganizations < ActiveRecord::Migration
  def change
    change_table :organizations do |t| 
      t.string :document_number
    end
  end
end
