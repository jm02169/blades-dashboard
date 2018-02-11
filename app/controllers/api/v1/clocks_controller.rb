class Api::V1::ClocksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    game = Game.find(params[:game_id])
    clocks = game.clocks
    render json: clocks, include: [:comments]
  end

  def show
    clock = Clock.find(params[:id])
    render json: clock, include: [:comments]
  end

  def create
    clock = Clock.new(clock_params)
    if clock.save
      render json: { clock: clock}
    else
      render json: {error: game.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def clock_params
   params.require(:clock).permit(:name, :description, :ticks, :segments, :faction_id, :npc_id, :game_id)
  end
end
