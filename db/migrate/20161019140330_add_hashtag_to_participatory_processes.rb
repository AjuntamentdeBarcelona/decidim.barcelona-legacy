class AddHashtagToParticipatoryProcesses < ActiveRecord::Migration
  def change
    change_table :participatory_processes do |t|
      t.string :hashtag
    end
  end
end
