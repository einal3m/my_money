# frozen_string_literal: true

class Api::CategoryType2Controller < ApplicationController
  def index
    category_types = CategoryType2.all.map do |category_type|
      {
        id: category_type.id,
        code: category_type.code,
        name: category_type.name,
        editable: category_type.editable?
      }
    end

    render json: { category_type2: category_types }
  end
end
