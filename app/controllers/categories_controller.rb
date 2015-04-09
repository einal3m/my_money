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
    validate_delete
    if category.errors.empty?
      category.destroy
      head :no_content
    else
      render json: category.errors, status: :unprocessable_entity
    end
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

  def validate_delete
    # TODO: should be moved to model
    category.errors.add(:subcategory, 'Category has subcategories') if category.subcategories.length > 0
    category.errors.add(:transaction, 'Category has transactions') if category.transactions.length > 0
    category.errors.add(:patterns, 'Category has patterns') if category.patterns.length > 0
  end

  def category
    @category ||= Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :category_type_id)
  end
end
