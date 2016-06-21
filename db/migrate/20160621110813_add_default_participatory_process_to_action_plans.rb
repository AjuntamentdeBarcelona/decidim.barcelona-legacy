class AddDefaultParticipatoryProcessToActionPlans < ActiveRecord::Migration
  def up
    pam = ParticipatoryProcess.where(name: "pam").first
    ActionPlan.update_all(participatory_process_id: pam.id)
  end

  def down
    pam = ParticipatoryProcess.where(name: "pam").first
    ActionPlan.where(participatory_process_id: pam.id).update_all(participatory_process_id: nil)
  end
end
