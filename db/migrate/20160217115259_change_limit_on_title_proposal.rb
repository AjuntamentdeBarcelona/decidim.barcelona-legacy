class ChangeLimitOnTitleProposal < ActiveRecord::Migration
  def up
    change_column :proposals, :title, :string, :limit => 255
  end
  def down
    change_column :proposals, :title, :string, :limit => 80
  end
end
