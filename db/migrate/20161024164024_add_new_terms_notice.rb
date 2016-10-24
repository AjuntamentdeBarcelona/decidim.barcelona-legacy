class AddNewTermsNotice < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.boolean :new_terms_shown
    end
  end
end
