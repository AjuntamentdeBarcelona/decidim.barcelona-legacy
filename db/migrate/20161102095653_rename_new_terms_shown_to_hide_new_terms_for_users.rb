class RenameNewTermsShownToHideNewTermsForUsers < ActiveRecord::Migration
  def up
    rename_column :users, :new_terms_shown, :hide_new_terms
    change_column_default :users, :hide_new_terms, false
  end

  def down
    rename_column :users, :hide_new_terms, :new_terms_shown
  end
end
