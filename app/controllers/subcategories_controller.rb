class SubcategoriesController < ApplicationController
  before_action :set_subcategory, only: [:edit, :update, :destroy]

  # GET /subcategories
  # GET /subcategories.json
  def index
    redirect_to categories_url
  end

  # GET /subcategories/1
  # GET /subcategories/1.json
  def show
    redirect_to categories_url
  end

  # GET /subcategories/new
  def new
    @subcategory = Subcategory.new

    # get category id from parameters, if it doesn't exist, return to category index
    if params.has_key?(:category_id) then
      @subcategory.category = Category.find(params[:category_id])
    else
      redirect_to categories_url, notice: "No category specified"
    end
  end

  # GET /subcategories/1/edit
  def edit
  end

  # POST /subcategories
  # POST /subcategories.json
  def create
    @subcategory = Subcategory.new(subcategory_params)

    respond_to do |format|
      if @subcategory.save
        format.html { redirect_to categories_url, notice: "Sub-category \'#{@subcategory.name}\' was successfully created." }
        format.json { render :show, status: :created, location: @subcategory }
      else
        format.html { render :new }
        format.json { render json: @subcategory.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /subcategories/1
  # PATCH/PUT /subcategories/1.json
  def update
    respond_to do |format|
      if @subcategory.update(subcategory_params)
        format.html { redirect_to categories_url, notice: "Sub-category \'#{@subcategory.name}\' was successfully updated." }
        format.json { render :show, status: :ok, location: @subcategory }
      else
        format.html { render :edit }
        format.json { render json: @subcategory.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /subcategories/1
  # DELETE /subcategories/1.json
  def destroy
    @subcategory.destroy
    respond_to do |format|
      format.html { redirect_to categories_url, notice: "Sub-category \'#{@subcategory.name}\' was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subcategory
      @subcategory = Subcategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def subcategory_params
      params.require(:subcategory).permit(:name, :category_id)
    end
    
end
