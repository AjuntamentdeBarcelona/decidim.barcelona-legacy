class StepDecorator < ApplicationDecorator
  delegate_all

  translates :title, :description, :summary
end
