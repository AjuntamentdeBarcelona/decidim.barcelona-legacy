Rails.application.routes.draw do

  devise_for :users, controllers: {
                       registrations: 'users/registrations',
                       sessions: 'users/sessions',
                       confirmations: 'users/confirmations',
                       omniauth_callbacks: 'users/omniauth_callbacks'
                     }
  devise_for :organizations, class_name: 'User',
             controllers: {
               registrations: 'organizations/registrations',
               sessions: 'devise/sessions',
             },
             skip: [:omniauth_callbacks]

  devise_scope :organization do
    get 'organizations/sign_up/success', to: 'organizations/registrations#success'
  end

  devise_scope :user do
    patch '/user/confirmation', to: 'users/confirmations#update', as: :update_user_confirmation
    get '/user/registrations/check_username', to: 'users/registrations#check_username'
    get 'users/sign_up/success', to: 'users/registrations#success'
    get 'users/registrations/delete_form', to: 'users/registrations#delete_form'
    delete 'users/registrations', to: 'users/registrations#delete'
    get :finish_signup, to: 'users/registrations#finish_signup'
    patch :do_finish_signup, to: 'users/registrations#do_finish_signup'
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  get '/welcome', to: 'welcome#welcome'

  get '/cookies/allow', to: 'cookie_policy#allow', as: :allow_cookies
  get '/cookies/deny', to: 'cookie_policy#deny', as: :deny_cookies

  resources :spending_proposals, only: [:index, :new, :create]

  resource :email_notifications_reminder, only: [:create, :destroy]

  resources :users, only: [:show]

  resource :account, controller: "account", only: [:show, :update, :delete] do
    collection { get :erase }
  end

  resources :notifications, only: [:index, :show] do
    collection { put :mark_all_as_read }
  end

  resource :verification, controller: "verification", only: [:show]

  scope module: :verification do
    resource :residence, controller: "residence", only: [:new, :create]
    resource :sms, controller: "sms", only: [:new, :create, :edit, :update]
    resource :verified_user, controller: "verified_user", only: [:show]
    resource :email, controller: "email", only: [:new, :show, :create]
    resource :letter, controller: "letter", only: [:new, :create, :show, :edit, :update]
  end

  namespace :admin do
    root to: "dashboard#index"
    resources :organizations, only: :index do
      collection { get :search }
      member do
        put :verify
        put :reject
      end
    end

    resources :users, only: [:index, :edit, :update] do
      member do
        put :restore
        put :confirm_hide
      end
    end

    resources :debates, only: :index do
      member do
        put :restore
        put :confirm_hide
      end
    end

    resources :proposals, only: :index do
      member do
        put :restore
        put :confirm_hide
      end
    end

    resources :spending_proposals, only: [:index, :show] do
      member do
        put :accept
        put :reject
      end
    end

    resources :comments, only: :index do
      member do
        put :restore
        put :confirm_hide
      end
    end

    resources :tags, only: [:index, :create, :update, :destroy]

    resources :settings, only: [:index, :update]

    resources :verifications, controller: :verifications, only: :index do
      collection { get :search}
    end

    resource :activity, controller: :activity, only: :show
    resource :stats, only: :show

    namespace :api do
      resource :stats, only: :show
    end

    resources :categories do
      resources :subcategories
    end

    resources :participatory_processes do
      resources :attachments, controller: "participatory_process_attachments", only: [:index, :create, :destroy]

      resources :steps do
        member do
          put :mark_as_active
          put :restore
        end
      end

      member do
        put :restore
        put :publish
        put :unpublish
      end
    end
  end

  namespace :moderation do
    root to: "dashboard#index"

    resources :users, only: :index do
      member do
        put :hide
        put :hide_in_moderation_screen
      end
    end

    resources :debates, only: :index do
      member do
        put :hide
      end
      collection do
        put :moderate
      end
    end

    resources :proposals, only: :index do
      member do
        put :hide
      end
      collection do
        put :moderate
      end
    end

    resources :comments, only: :index do
      member do
        put :hide
      end
      collection do
        put :moderate
      end
    end

    resources :meetings, except: [:show] do
      resource :close, controller: 'meetings/close', only: [:new, :create]
      resources :pictures, controller: 'meetings/pictures'
    end
  end

  namespace :revision do
    root to: "proposals#index"

    resources :proposals, only: [:index, :show]
    resources :action_plan_reports, only: [:index, :create, :show]
  end

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

  namespace :api do
    resources :districts, only: [:index]
    resources :categories, only: [:index]
    resources :subcategories, only: [:index]
    resources :proposals, only: [:show, :index, :update] do
      member do
        get :references
        get :action_plans
        patch :hide
        patch :flag
        patch :unflag
      end
      resources :votes, only: [:create]
      resource :answers, only: [:show, :create, :update], controller: :proposal_answers
      resources :meetings, only: [:index]
      resource :author, only: [], controller: 'proposals/author' do
        member do
          patch :hide
        end
      end
    end
    resources :action_plans do
      resources :proposals, controller: 'action_plans/proposals'
      resources :meetings, controller: 'action_plans/meetings'
    end
    resources :meetings, only: [:index]
    resources :follows, only: [:index, :create, :destroy]
    resources :comments, only: [:index, :create] do
      member do
        patch :flag
        patch :unflag
        patch :upvote
        patch :downvote
        patch :hide
      end

      resource :author, only: [], controller: 'comments/author' do
        member do
          patch :hide
        end
      end
    end
    resources :debates, only: [:show]
  end

  [
    "proposals",
    "action_plans",
    "meetings",
    "debates",
    "categories",
    "dataviz"
  ].each do |path|
    get "/(pam)/#{path}/(:id)", as: "#{path}_root" , to: redirect { |_, request|
      p = ParticipatoryProcess.find('pam')
      resource = path.split("/").first
      if p.present?
        "/#{p.to_param}/#{(Step.step_for(p, resource) || p.active_step).to_param}#{request.path.gsub(/^\/pam/, "")}"
      else
        raise ActionController::RoutingError.new('Not Found')
      end
    }
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  mount Tolk::Engine => '/translate', :as => 'tolk'

  require 'sidekiq/web'

  if Rails.env.development?
    mount Sidekiq::Web => '/sidekiq'
  else
    authenticate :user, lambda { |u| u.administrator? } do
      mount Sidekiq::Web => '/sidekiq'
    end
  end

  resources :participatory_processes, path: "/processes", only: [:index, :show] do
    collection do
      get :list
    end
  end

  scope ":participatory_process_id" do
    scope ":step_id" do
      resource :step

      resources :proposals do
        member do
          post :vote
          post :vote_featured
          put :flag
          put :unflag
        end
      end

      resources :meetings, only: [:index, :show]

      resources :debates do
        member do
          post :vote
          put :flag
          put :unflag
        end
      end

      resources :action_plans do
        resources :revisions, except: [:show, :delete], controller: 'action_plans/revisions'
        collection do
          get :build_from_proposal
        end
      end

      resources :categories, only: [:index]
      resources :dataviz, only: [:show, :index]
    end
  end

  scope "(:participatory_process_id/:step_id)" do
    # static pages
    resources :pages, path: '/', only: [:show]
  end
end
