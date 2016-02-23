class StaticPagesController < ApplicationController
  def home
  end

  def my_money
  end

  def react
    render :layout => false
  end
end
