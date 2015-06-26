class DateRangeOptionsController < ApplicationController
  def index
    render json: DateRangeOption.all, each_serializer: DateRangeOptionSerializer
  end
end
