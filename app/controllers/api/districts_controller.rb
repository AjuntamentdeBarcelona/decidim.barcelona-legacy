class Api::DistrictsController < Api::ApplicationController
  load_and_authorize_resource

  def index
    @districts = District.all.map { |district| [district.name, district.id] }

    respond_to do |format|
      format.json { render json: @districts }
    end
  end
end
