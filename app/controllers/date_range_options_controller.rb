# frozen_string_literal: true

class DateRangeOptionsController < ApplicationController
  def index
    date_range_options = DateRangeOption.all.map do |date_range_option|
      {
        id: date_range_option.id,
        name: date_range_option.name,
        default: date_range_option.default,
        from_date: date_range_option.from_date,
        to_date: date_range_option.to_date,
        custom: date_range_option.custom?
      }
    end

    render json: { date_range_options: date_range_options }
  end
end
