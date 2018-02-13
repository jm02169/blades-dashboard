class ClocksController < ApplicationController
  def index
    render "games/index"
  end

  def show
    render "games/index"
  end

  def new
    render "games/index"
  end

  def create
    render "games/index"
  end

  def edit
    if current_user
      @current_user_id = current_user.id
    else
      @current_user_id = 0
    end
    render "games/index"
  end

end
