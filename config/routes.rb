Rails.application.routes.draw do
  get 'report/income_vs_expense'
  get 'report/income_expense_bar'
  get 'report/subcategory'
  get 'report/category'
  get 'report/eod_balance'
  get 'report/index'

  resources :date_range_options

  get 'import_transactions/file_chooser'
  post 'import_transactions/import'

  post 'transactions/import'
  post 'transactions/index'

  get 'my_money' => 'accounts#my_money'
  get 'react' => 'static_pages#react'
  get 'static_pages/home'
  get 'upload/file_chooser'
  post 'upload/upload_file'

  resources :subcategories
  resources :categories
  resources :category_types, only: [:index]
  resources :category_type2, only: [:index]
  resources :transaction_types, only: [:index]
  resources :account_types, only: [:index]

  post 'categories/subcategories_by_category'
  post 'reconciliations/:id/reconcile' => 'reconciliations#reconcile', as: :reconciliations_reconcile

  # backbones routes
  resources :accounts, only: [:create, :index, :destroy, :update] do
    resources :reconciliations
    resources :bank_statements, only: [:create, :index, :destroy]
    resources :transactions do
      collection do
        get 'unreconciled'
        post 'ofx'
      end
    end
    resources :patterns
  end

  # react bundle
  get 'react' => 'react#index'

  # post 'accounts/:id/last_reconciliation' => 'accounts#last_reconciliation', as: :accounts_last_reconciliation
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'static_pages#my_money'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
