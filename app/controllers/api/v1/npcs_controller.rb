class Api::V1::NpcsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :authenticate_user!

  def index
    game = Game.find(params[:game_id])
    npcs = game.npcs.order(:id)
    if game.user_id == current_user_id
      render json: npcs, include: [:comments]
    else
      render json: {}, status: :unauthorized
    end
  end

  def show
    npc = Npc.find(params[:id])
    if npc.game.user_id == current_user_id
      render json: npc, include: [:comments, :npcs]
    else
      render json: {}, status: :unauthorized
    end
  end
  def create
    game = Game.find(params[:game_id])
    if game.user_id == current_user_id
      npc = Npc.new(npc_params)
      if npc.save
        render json: { npc: npc }
      else
        render json: {error: npc.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def update
    npc = Npc.find(params[:id])
    game = npc.game
    npcs = game.npcs.order(:id)
    if game.id == current_user_id
      if npc.update(npc_params)
        render json: npcs
      else
        render json: {error: game.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  private

  def npc_params
   params.require(:npc).permit(:name, :description, :faction_id, :game_id)
  end
end
