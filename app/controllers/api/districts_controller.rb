class Api::DistrictsController < ApplicationController
  skip_authorization_check

  def index
    @districts = District.all.map { |district| [district.name, district.id.to_s] }

    respond_to do |format|
      format.json { render json: @districts }
    end
  end
end
