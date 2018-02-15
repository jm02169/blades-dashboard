Rails.application.routes.draw do
  root 'games#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :games, only: [:index, :show, :new] do
    resources :clocks, only: [:index, :show, :edit]
    resources :factions, only: [:index, :show, :edit]
    resources :npcs, only: [:index, :show]
    resources :comments, only: [:index]
  end
  resources :clocks, only: [:show, :edit]
  resources :factions, only: [:show, :edit]
  resources :npcs, only: [:show, :edit]
  resources :comments, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show, :create] do
        resources :clocks, only: [:index, :show, :new, :create, :update]
        resources :factions, only: [:index, :show, :new, :create, :update]
        resources :npcs, only: [:index, :show, :new, :create, :update]
        resources :comments, only: [:index, :show, :new, :create, :update]
      end
      resources :clocks, only: [:show, :update]
      resources :factions, only: [:show, :update]
      resources :npcs, only: [:show, :update]
      resources :comments, only: [:show, :update]
    end
  end
end
