class ParticipatoryProcessDecorator < ApplicationDecorator
  delegate_all

  translates :title, :subtitle, :summary, :description
end
