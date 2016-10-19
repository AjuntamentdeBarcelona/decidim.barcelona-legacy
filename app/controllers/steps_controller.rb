class StepsController < ApplicationController
  include HasParticipatoryProcess

  layout "participatory_process"
  skip_authorization_check

  def show
    @step = participatory_process.steps.find(params[:step_id]).decorate
  end
end
