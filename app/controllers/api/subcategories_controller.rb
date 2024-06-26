# frozen_string_literal: true

require_relative '../../models/destroyers/subcategory_destroyer'

module Api
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
      old_category_id = subcategory.category_id
      if subcategory.update(subcategory_params)
        update_transactions if category_has_changed(old_category_id)
        render json: subcategory, status: :ok
      else
        render json: subcategory.errors, status: :unprocessable_entity
      end
    end

    def destroy
      destroyer = SubcategoryDestroyer.new subcategory
      destroyer.execute
      head :no_content
    end

    private

    def category_has_changed(old_category_id)
      (subcategory.category_id != old_category_id)
    end

    def update_transactions
      subcategory.transactions.update_all(category_id: subcategory.category_id) # rubocop:disable Rails/SkipsModelValidations
    end

    def subcategory
      @subcategory ||= Subcategory.find(params[:id])
    end

    def subcategory_params
      params.require(:subcategory).permit(:name, :category_id)
    end
  end
end
