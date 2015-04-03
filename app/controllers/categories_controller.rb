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
    category.destroy
    head :no_content
  end
  
  # called when user changes category on transaction forms
  def subcategories_by_category
    if params[:category_id].present?
      @subcategories = Category.find(params[:category_id]).subcategories
    else
      @subcategories = []
    end
  end

  private

  def category
    @category ||= Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :category_type_id)
  end
end
