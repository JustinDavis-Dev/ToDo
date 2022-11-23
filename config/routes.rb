Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    resources :tasks
  end
  devise_for :users
end
