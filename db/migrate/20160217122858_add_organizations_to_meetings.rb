class AddOrganizationsToMeetings < ActiveRecord::Migration
  def change
    change_table :meetings do |t|
      t.text :organizations
    end
  end
end
