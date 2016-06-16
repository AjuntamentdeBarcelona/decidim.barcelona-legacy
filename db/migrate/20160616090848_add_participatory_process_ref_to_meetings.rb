class AddParticipatoryProcessRefToMeetings < ActiveRecord::Migration
  def change
    add_reference :meetings, :participatory_process, index: true, foreign_key: true
  end
end
