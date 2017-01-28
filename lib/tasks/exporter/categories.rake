require "exporter"

namespace :exporter do
  task :categories => :environment do
    data = Category.unscoped.find_each.map do |category|
      {
        id: category.id,
        name: category.name,
        process_id: category.participatory_process_id,
        description: category.description,
        categories: subcategories(category)
      }
    end

    Exporter.write_json("categories", data)
  end

  def subcategories(category)
    category.subcategories.map do |subcategory|
      {
        id: subcategory.id,
        name: subcategory.name,
        process_id: subcategory.participatory_process_id,
        description: subcategory.description
      }
    end
  end
end
