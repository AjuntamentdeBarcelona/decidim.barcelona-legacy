class ParticipatoryProcessDecorator < ApplicationDecorator
  delegate_all

  translates :title, :subtitle, :summary, :description

  decorates_association :steps
  decorates_association :categories
end
