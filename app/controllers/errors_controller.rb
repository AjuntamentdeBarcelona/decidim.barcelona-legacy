class ErrorsController < ApplicationController
  include Gaffe::Errors

  layout 'application'

  skip_before_filter :authenticate_user!
  skip_authorization_check

  def show
    render "errors/#{@rescue_response}", status: @status_code
  end
end
