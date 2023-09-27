# frozen_string_literal: true

module Api
  class CategoryTypesController < ApplicationController
    def index
      render json: CategoryType.all
    end
  end
end
