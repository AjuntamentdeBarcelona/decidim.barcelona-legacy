class Api::FollowsController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    follows = Follow.where({
      follower: current_user,
      following_id: params[:following][:id],
      following_type: params[:following][:type]
    }).all
    render json: follows
  end

  def create
    follow = Follow.find_or_create_by({
      follower: current_user,
      following_id: strong_params[:id],
      following_type: strong_params[:type]
    })
    render json: follow
  end

  def destroy
    follow = Follow.find(params[:id])
    follow.destroy
    render json: follow
  end

  private

  def strong_params
    permitted_params = [:id, :type]
    params.require(:following).permit(permitted_params)
  end
end
