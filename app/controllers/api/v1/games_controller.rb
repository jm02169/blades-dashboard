class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    games = Game.all
    render json: games, include: [:comments, :factions, :npcs, :clocks]
  end

  def show
    game = Game.find(params[:id])
    if current_user_id = game.user.id
      render json: game, include: [:comments, :factions, :npcs, :clocks]
    else
      render json: {}, status: :unauthorized
    end
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json: { game: game }
    else
      render json: {error: game.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def game_params
   params.require(:game).permit(:name, :description, :user_id)
  end
end
