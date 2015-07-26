require 'destroyers/category_destroyer'

class CategoriesController < ApplicationController
  def index
    render json: Category.all
  end

  def create
    new_category = Category.new(category_params)
    if new_category.save
      render json: new_category, status: :created
    else
      render json: new_category.errors, status: :unprocessable_entity
    end
  end

  def update
    if category.update(category_params)
      render json: category, status: :ok
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    destroyer = CategoryDestroyer.new category
    destroyer.execute
    head :no_content
  end

  private

  def category
    @category ||= Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :category_type_id)
  end
end
