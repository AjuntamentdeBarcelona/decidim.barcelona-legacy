class AddParticipatoryProcessRefToCategories < ActiveRecord::Migration
  def change
    add_reference :categories, :participatory_process, index: true, foreign_key: true
  end
end
