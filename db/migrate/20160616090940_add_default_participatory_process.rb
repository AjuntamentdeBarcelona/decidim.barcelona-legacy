class AddDefaultParticipatoryProcess < ActiveRecord::Migration
  def up
    ParticipatoryProcess.transaction do
      pam = ParticipatoryProcess.create(name: "pam")
      Proposal.update_all(participatory_process_id: pam.id)
      Meeting.update_all(participatory_process_id: pam.id)
      Debate.update_all(participatory_process_id: pam.id)
      Category.update_all(participatory_process_id: pam.id)
      Subcategory.update_all(participatory_process_id: pam.id)
    end
  end

  def down
    ParticipatoryProcess.transaction do
      pam = ParticipatoryProcess.where(name: "pam").first
      Proposal.where(participatory_process_id: pam.id).update_all(participatory_process_id: nil)
      Meeting.where(participatory_process_id: pam.id).update_all(participatory_process_id: nil)
      Debate.where(participatory_process_id: pam.id).update_all(participatory_process_id: nil)
      Category.where(participatory_process_id: pam.id).update_all(participatory_process_id: nil)
      Subcategory.where(participatory_process_id: pam.id).update_all(participatory_process_id: nil)
      pam.destroy
    end
  end
end
