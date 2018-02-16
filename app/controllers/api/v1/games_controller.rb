class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :authenticate_user!

  def index
    user = current_user
    games = Game.where(user: current_user)
    render json: games, include: [:comments, :factions, :npcs, :clocks]
  end

  def show
    game = Game.find(params[:id])
    if current_user_id == game.user_id
      render json: game, include: [:comments, :factions, :npcs, :clocks]
    else
      render json: {}, status: :unauthorized
    end
  end

  def create
    game = Game.create(game_params)
    if game.user_id == current_user_id
      if game.save
        render json: { game: game }
      else
        render json: {error: game.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  private
  def game_params
   params.require(:game).permit(:name, :description, :user_id, :default_factions)
  end
end
