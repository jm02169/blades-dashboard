class ClocksController < ApplicationController
  def index
    if current_user
      @current_user_id = current_user.id
    else
      @current_user_id = 0
    end
    render "games/index"
  end

  def show
    if current_user
      @current_user_id = current_user.id
    else
      @current_user_id = 0
    end
    render "games/index"
  end


end
