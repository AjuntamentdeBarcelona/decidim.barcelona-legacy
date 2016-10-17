class AddDefaultStepToDefaultParticipatoryProcess < ActiveRecord::Migration
  def up
    pam = ParticipatoryProcess.where(name: "pam").first
    pam.steps.create(flags: Step::FLAGS.map(&:to_s), active: true)
  end

  def down
    pam = ParticipatoryProcess.where(name: "pam").first
    pam.steps.destroy_all
  end
end
