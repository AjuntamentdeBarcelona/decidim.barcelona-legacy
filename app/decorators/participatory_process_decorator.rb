class ParticipatoryProcessDecorator < ApplicationDecorator
  delegate_all

  translates :title, :subtitle, :summary, :description

  decorates_association :steps

  def scope
    if object.scope == "city"
      h.t("scopes.city")
    elsif object.district
      District.find(object.district).name
    end
  end
end
