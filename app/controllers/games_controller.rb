class GamesController < ApplicationController
  def index
    if current_user
      @current_user_id = current_user.id
    else
      @current_user_id = 0
    end
  end

  def show
    if current_user
      @current_user_id = current_user.id
    else
      @current_user_id = 0
    end
    render :index
  end
end
