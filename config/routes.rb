Rails.application.routes.draw do
  root 'games#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :games, only: [:index, :show] do
    resources :clocks, only: [:index, :show]
  end
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show] do
        resources :clocks, only: [:index]
      end
    end
  end
end
