# frozen_string_literal: true

class Api::CategoryTypesController < ApplicationController
  def index
    render json: CategoryType.all
  end
end
