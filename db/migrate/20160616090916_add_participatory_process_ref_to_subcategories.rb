class AddParticipatoryProcessRefToSubcategories < ActiveRecord::Migration
  def change
    add_reference :subcategories, :participatory_process, index: true, foreign_key: true
  end
end
