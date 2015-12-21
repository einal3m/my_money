class CategoryType2Controller < ApplicationController
  def index
    render json: CategoryType2.all, each_serializer: CategoryTypeSerializer
  end
end
