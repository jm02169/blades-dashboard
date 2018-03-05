class Api::V1::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :authenticate_user!

  def index
    if params[:game_id]
      game = Game.find(params[:game_id])
      comments = game.comments.order(:id)
      if game.user_id == current_user_id
        render json: comments
      else
        render json: {}, status: :unauthorized
      end
    elsif params[:faction_id]
      faction = Faction.find(params[:faction_id])
      game = faction.game
      comments = faction.comments
      if game.user_id == current_user_id
        render json: comments
      else
        render json: {}, status: :unauthorized
      end
    elsif params[:npc_id]
      npc = Npc.find(params[:npc_id])
      game = npc.game
      comments = npc.comments
      if game.user_id == current_user_id
        render json: comments
      else
        render json: {}, status: :unauthorized
      end
    elsif params[:clock_id]
      clock = Clock.find(params[:clock_id])
      game = clock.game
      comments = clock.comments
      if game.user_id == current_user_id
        render json: comments
      else
        render json: {}, status: :unauthorized
      end
    end
  end

  def create
    if params[:game_id]
      game = Game.find(params[:game_id])
    elsif params[:faction_id]
      faction = Faction.find(params[:faction_id])
      game = faction.game
    elsif params[:npc_id]
      npc = Npc.find(params[:npc_id])
      game = npc.game
    elsif params[:clock_id]
      clock = Clock.find(params[:clock_id])
      game = clock.game
    end
    
    if game.user_id == current_user_id
      comment = Comment.new(comment_params)
      if comment.save
        render json: comment
      else
        render json: {error: comment.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  def update
    comment = Comment.find(params[:id])
    game = comment.game
    if game.user.id == current_user_id
      comments = game.comments.order(:id)
      if comment.update(comment_params)
        render json: comments
      else
        render json: {error: game.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unauthorized
    end
  end

  private

  def comment_params
   params.require(:comment).permit(:body, :clock_id, :faction_id, :npc_id, :game_id)
  end
end
