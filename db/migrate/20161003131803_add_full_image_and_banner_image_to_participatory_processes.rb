class AddFullImageAndBannerImageToParticipatoryProcesses < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :full_image, :string
    add_column :participatory_processes, :banner_image, :string
  end
end
