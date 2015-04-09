class SubcategoriesController < ApplicationController
  def index
    render json: Subcategory.all
  end

  def create
    new_subcategory = Subcategory.new(subcategory_params)
    if new_subcategory.save
      render json: new_subcategory, status: :created
    else
      render json: new_subcategory.errors, status: :unprocessable_entity
    end
  end

  def update
    if subcategory.update(subcategory_params)
      render json: subcategory, status: :ok
    else
      render json: subcategory.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if subcategory.destroy
      head :no_content
    else
      render json: subcategory.errors, status: :unprocessable_entity
    end
  end

  private

  def subcategory
    @subcategory ||= Subcategory.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def subcategory_params
    params.require(:subcategory).permit(:name, :category_id)
  end
end
