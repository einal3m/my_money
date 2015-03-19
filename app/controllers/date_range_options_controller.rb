class DateRangeOptionsController < ApplicationController
  before_action :set_date_range_option, only: [:show, :edit, :update, :destroy]

  # GET /date_range_options
  # GET /date_range_options.json
  def index
    @date_range_options = DateRangeOption.all
    @date_range_option = DateRangeOption.new
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @date_range_options }
    # render json: @date_range_options
    end
  end

  # GET /date_range_options/1/edit
  def edit
  end

  # POST /date_range_options
  # POST /date_range_options.json
  def create
    @date_range_option = DateRangeOption.new(date_range_option_params)

    respond_to do |format|
      if @date_range_option.save
        format.html { redirect_to date_range_options_path, notice: 'Date range option was successfully created.' }
        format.json { render :show, status: :created, location: @date_range_option }
      else
p @date_range_option.errors
        format.html { redirect_to date_range_options_path, notice: 'Unable to create date range object: ' + @date_range_option.errors.full_messages.first }
        format.json { render json: @date_range_option.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /date_range_options/1
  # PATCH/PUT /date_range_options/1.json
  def update
    respond_to do |format|
      if @date_range_option.update(date_range_option_params)
        format.html { redirect_to date_range_options_path, notice: 'Date range option was successfully updated.' }
        format.json { render :show, status: :ok, location: @date_range_option }
      else
        format.html { render :edit }
        format.json { render json: @date_range_option.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /date_range_options/1
  # DELETE /date_range_options/1.json
  def destroy
    session.delete(:date_range_option_id) if session[:date_range_option_id] == @date_range_option.id
    @date_range_option.destroy

    respond_to do |format|
      format.html { redirect_to date_range_options_url, notice: 'Date range option was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_date_range_option
      @date_range_option = DateRangeOption.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def date_range_option_params
      params.require(:date_range_option).permit(:description, :klass, :default)
    end
end
