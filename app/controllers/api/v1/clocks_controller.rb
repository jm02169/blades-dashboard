class Api::V1::ClocksController < ApplicationController
  def index
    game = Game.find(params[:game_id])
    clocks = game.clocks
    render json: clocks, include: [:comments]
  end

  def show
    clock = Clock.find(params[:id])
    render json: clock, include: [:comments]
  end
end
