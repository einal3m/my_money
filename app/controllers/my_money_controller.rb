# frozen_string_literal: true

class MyMoneyController < ApplicationController
  def my_money
    render :my_money
  end

  def backbone
    render layout: false
  end
end
