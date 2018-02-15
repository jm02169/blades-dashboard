class Api::V1::FactionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :authenticate_user!

  def index
    game = Game.find(params[:game_id])
    factions = game.factions.order(:id)
    if game.user_id == current_user_id
      render json: factions, include: [:comments]
    else
      render json: {}, status: :unauthorized
    end
  end

  def show
    faction = Faction.find(params[:id])
    if faction.game.user_id == current_user_id
      render json: faction, include: [:comments, :npcs]
    else
      render json: {}, status: :unauthorized
    end
  end
  def create
    game = Game.find(params[:game_id])
    if game.user_id == current_user_id
      faction = Faction.new(faction_params)
      if faction.save
        render json: { faction: faction }
      else
        render json: {error: faction.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def update
    faction = Faction.find(params[:id])
    game = faction.game
    if game.id == current_user_id
      factions = game.factions.order(:id)
      if faction.update(faction_params)
        render json: factions
      else
        render json: {error: game.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  private

  def faction_params
   params.require(:faction).permit(:name, :description, :faction_status, :game_id)
  end
end
