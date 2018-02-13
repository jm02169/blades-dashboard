class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user_id
  before_action :authenticate_user!

  protected
  def current_user_id
    current_user ? current_user.id : nil
  end
end
