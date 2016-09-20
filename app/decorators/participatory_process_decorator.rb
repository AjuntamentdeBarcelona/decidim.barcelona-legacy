class ParticipatoryProcessDecorator < ApplicationDecorator
  delegate_all

  translates :title, :subtitle
end
