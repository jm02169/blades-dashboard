class Api::V1::ClocksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :authenticate_user!

  def index
    game = Game.find(params[:game_id])
    clocks = game.clocks.order(:id)

    render json: clocks, include: [:comments]
  end

  def show
    clock = Clock.find(params[:id])
    if clock.game.user_id == current_user_id
      render json: clock, include: [:comments]
    else
      redirect_to "../public/401.html", status: :unauthorized
    end
  end

  def create
    clock = Clock.new(clock_params)
    if clock.save
      render json: { clock: clock }
    else
      render json: {error: clock.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    clock = Clock.find(params[:id])
    game = clock.game
    clocks = game.clocks.order(:id)
    if clock.update(clock_params)
      render json: clocks, each_serializer: ClockSerializer
    else
      render json: {error: game.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def clock_params
   params.require(:clock).permit(:name, :description, :ticks, :segments, :faction_id, :npc_id, :game_id)
  end
end
