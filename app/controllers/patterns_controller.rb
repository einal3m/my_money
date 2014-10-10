class PatternsController < ApplicationController
  before_action :set_pattern, only: [:edit, :update, :destroy]

  # GET /patterns
  # GET /patterns.json
  def index
    # list of all accounts
    @accounts = Account.all
    
    # check params for a change in selected account
    account_id = params[:account_id]
    
    # if new account has not been selected...
    if account_id.nil? then
    
      # ... check the session
      account_id = session[:account_id];
  	end

    # find patterns for account if it is not nil
    if account_id.nil? then 
      @account = nil
      @patterns = []
    else
    	session[:account_id] = account_id
      @account = Account.find(account_id)
      @patterns = @account.patterns
    end
  end

  # GET /patterns/1
  # GET /patterns/1.json
  def show
    redirect_to patterns_url
  end

  # GET /patterns/new
  def new
    @pattern = Pattern.new
    @pattern.account = Account.find(params[:account_id])
    load_form_data
  end

  # GET /patterns/1/edit
  def edit
	load_form_data
  end

  # POST /patterns
  # POST /patterns.json
  def create
    @pattern = Pattern.new(pattern_params)

    respond_to do |format|
      if @pattern.save
        format.html { redirect_to patterns_url, notice: 'Pattern was successfully created.' }
        format.json { render :show, status: :created, location: @pattern }
      else
        load_form_data
        format.html { render :new }
        format.json { render json: @pattern.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patterns/1
  # PATCH/PUT /patterns/1.json
  def update
    respond_to do |format|
      if @pattern.update(pattern_params)
        format.html { redirect_to patterns_url, notice: 'Pattern was successfully updated.' }
        format.json { render :show, status: :ok, location: @pattern }
      else
        load_form_data
        format.html { render :edit }
        format.json { render json: @pattern.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patterns/1
  # DELETE /patterns/1.json
  def destroy
    @pattern.destroy
    respond_to do |format|
      format.html { redirect_to patterns_url, notice: 'Pattern was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def load_form_data
  
    # lists for drop-downs
  	@subcategories = []
	  @categories = Category.all
	
  	# hash for category drop down
  	@category_options = {prompt: true}
  	if !@pattern.category.nil? then
  		@category_options[:selected] = @pattern.category_id.to_i
  		@subcategories = @pattern.category.subcategories
  	end

  	# hash for sub-category drop down
  	@subcategory_options = {prompt: true}
  	if !@pattern.subcategory.nil? then
  		@subcategory_options[:selected] = @pattern.subcategory_id.to_i
  	end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pattern
      @pattern = Pattern.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pattern_params
      params.require(:pattern).permit(:account_id, :match_text, :notes, :category_id, :subcategory_id)
    end
end
