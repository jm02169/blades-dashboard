class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    games = Game.all
    render json: games, include: [:comments, :factions, :npcs, :clocks]
  end

  def show
    game = Game.find(params[:id])
    render json: game, include: [:comments, :factions, :npcs, :clocks]
  end

end
