
class ReportController < ApplicationController

  def index
  end

  def income_vs_expense
  	
	get_date_range
	  	
  	@category_types = CategoryType.all 
  	
  	@transfer_category = CategoryType.find_by(name: "Transfer")
  	@income_categories = CategoryType.find_by(name: "Income").categories.order(:name)
  	@expense_categories = CategoryType.find_by(name: "Expense").categories.order(:name)
  	
  	# sum all transactions by category + subcategory
  	@report_data =  Transaction.where("date >= ? and date <= ?", @from_date, @to_date).group([:category_id, :subcategory_id]).sum(:amount)
  	@unassigned_income_amount = Transaction.where("category_id is null and amount >=0 and date >= ? and date <= ?", @from_date, @to_date).sum(:amount)
  	@unassigned_expense_amount = Transaction.where("category_id is null and amount <0 and date >= ? and date <= ?", @from_date, @to_date).sum(:amount)
  	
	@category_totals = {}
	@income_total = @unassigned_income_amount
	@expense_total = @unassigned_expense_amount
	
	@report_data.each do |key, total|
		if !key[0].nil? then
			category = Category.find(key[0])
			subcategory_name = key[1] == nil ? nil : Subcategory.find(key[1]).name
			if @category_totals.has_key?(category.name) then
				@category_totals[category.name][subcategory_name] = total
			else
				@category_totals[category.name] = {subcategory_name => total}
			end
			
			if category.category_type.name == "Income" then @income_total += total
			elsif category.category_type.name == "Expense" then @expense_total += total
			end
		end
	end  
	
  end
  
  def category
  
  p params
  
  	get_date_range
  	
  	@categories = Category.all
  	
  	# check for category_id in params... if it's not there show unassigned transactions
  	@category_id = params[:category_id]
  	if @category_id.nil? || @category_id.blank? then
  		@category = nil 
  		@category_id = nil
  		p "category_id is nil or blank"
	else
  		@category = Category.find(@category_id)
  	end
  	
  	if @category_id.nil? then
  		@transactions = Transaction.where("category_id is null and date >= ? and date <= ?", @from_date, @to_date)
  		
  		@transaction_total = Transaction.where("category_id is null and date >= ? and date <= ?", @from_date, @to_date).sum(:amount)
  	else
  		@transactions = Transaction.where("category_id = ? and date >= ? and date <= ?", @category_id, @from_date, @to_date)
  		@transaction_total = Transaction.where("category_id = ? and date >= ? and date <= ?", @category_id, @from_date, @to_date).sum(:amount)
  	end
  	
  end

  def subcategory
  
  	get_date_range
  	
  	@subcategories = Subcategory.all
  	@subcategory = params.has_key?(:subcategory_id) ? Subcategory.find(params[:subcategory_id]) : Subcategory.first
  	
  	p @subcategory
  	
  	@transactions = Transaction.where("subcategory_id = ? and date >= ? and date <= ?", @subcategory.id, @from_date, @to_date)
  	@transaction_total = Transaction.where("subcategory_id = ? and date >= ? and date <= ?", @subcategory.id, @from_date, @to_date).sum(:amount)
  
  end
  
  def get_date_range
  
    # check params first, then session
    @from_date = params.has_key?(:from_date) ? params[:from_date] : session[:from_date]
    @to_date = params.has_key?(:to_date) ? params[:to_date] : session[:to_date]
  	
  	# if date not found in either params or session, then assign a default
  	if @from_date == nil then 
  		@from_date = Date.new(Date.today.month >= 7 ? Date.today.year : Date.today.year + 1, 7, 1)
  	end
  	if @to_date == nil then 
  		@to_date = Date.new(Date.today.month >= 7 ? Date.today.year + 1 : Date.today.year, 6, 30)
  	end
  	
  	# update session
  	session[:from_date] = @from_date
  	session[:to_date] = @to_date

  end
  
end
