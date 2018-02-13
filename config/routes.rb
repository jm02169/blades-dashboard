Rails.application.routes.draw do
  root 'games#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :games, only: [:index, :show, :new] do
    resources :clocks, only: [:index, :show, :edit]
    resources :factions, only: [:index, :show, :edit]
  end
  resources :clocks, only: [:show, :edit]
  resources :factions, only: [:show, :edit]
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show, :create] do
        resources :clocks, only: [:index, :show, :new, :create, :update]
        resources :factions, only: [:index, :show, :new, :create, :update]
      end
      resources :clocks, only: [:show, :update]
      resources :factions, only: [:show, :update]
    end
  end
end
