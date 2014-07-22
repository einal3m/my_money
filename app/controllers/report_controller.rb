
class ReportController < ApplicationController

  def index
  end

  def income_vs_expense
  	
	get_date_range
	  	
  	@category_types = CategoryType.all 
  	
  	@transfer_category = CategoryType.transfer
  	@income_categories = CategoryType.income.categories.order(:name)
  	@expense_categories = CategoryType.expense.categories.order(:name)
  	
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
			subcategory = key[1] == nil ? nil : Subcategory.find(key[1])
			if @category_totals.has_key?(category.name) then
				@category_totals[category.name][subcategory] = total
			else
				@category_totals[category.name] = {subcategory => total}
			end
			
			if category.category_type.name == "Income" then @income_total += total
			elsif category.category_type.name == "Expense" then @expense_total += total
			end
		end
	end  
	

  	make_pie_chart("Expense", -@unassigned_expense_amount, @from_date, @to_date)
  	make_pie_chart("Income", @unassigned_income_amount, @from_date, @to_date)
  	
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

# report for transactions with a specific subcategory

  def subcategory
  
    # get date range from either session or params
  	get_date_range
  	
  	# report data
  	@subcategories = []
  	@categories = Category.all
  	
  	# get subcategory_id from params
  	@category = nil
  	@category_id = nil
  	@subcategory = nil
  	@subcategory_id = nil
  	if params.has_key?(:subcategory_id) && !params[:subcategory_id].blank? then
  		@subcategory_id = params[:subcategory_id]
  		@subcategory =  Subcategory.find(@subcategory_id)
  		@category = @subcategory.category
	end
	  	
  	# if subcategory wasn't in params, check for category_id
  	if @subcategory.nil? && params.has_key?(:category_id) then
  		@category = Category.find(params[:category_id])
  	end
  	
  	if !@category.nil? then 
  		@category_id = @category.id 
  		@subcategories = @category.subcategories
  	end

	# collect data  	
  	@transactions = []
  	@transaction_total = 0
  	
  	# if subcategory was defined, search for it
  	if !@subcategory.nil? then
	  	@transactions = Transaction.where("subcategory_id = ? and date >= ? and date <= ?", @subcategory.id, @from_date, @to_date)
  		@transaction_total = Transaction.where("subcategory_id = ? and date >= ? and date <= ?", @subcategory.id, @from_date, @to_date).sum(:amount)

  	# if only category defined, search for category with nil subcategory
  	elsif !@category.nil? then
  		@transactions = Transaction.where("category_id = ? and subcategory_id is null and date >= ? and date <= ?", @category.id, @from_date, @to_date)
  		@transaction_total = Transaction.where("category_id = ? and subcategory_id is null and date >= ? and date <= ?", @category.id, @from_date, @to_date).sum(:amount)
  	
  	end
  
  end
  
  
# makes a pie chart for a given category type and date range

  def make_pie_chart(category_type, unassigned_total, from_date, to_date)
  
	# get the category type id
	category_type_id = CategoryType.find_by(name: category_type).id
	
	# generate sql for data
	my_sql = "select categories.name, abs(sum(transactions.amount)) FROM transactions, categories WHERE transactions.category_id = categories.id AND transactions.category_id IN (SELECT id FROM categories WHERE category_type_id = #{category_type_id}) AND (date >= '#{from_date}' and date <= '#{to_date}') GROUP BY transactions.category_id"
	
	pie_data = Transaction.connection.select_all(my_sql).rows
	
	# add un-assigned data to chart
	pie_data.push(["Un-assigned", unassigned_total])

	# create pie chart  
  	g = Gruff::Pie.new("500x350")
	
	# add data to pie chart
	pie_data.each do |row|
		g.data(row[0], row[1])
	end
	
	# set some chart formatting
	g.hide_title = true
	g.theme_pastel
	g.legend_at_bottom = true
	
	# write chart to image file
	g.write("app/assets/images/graphs/pie_#{category_type}.png")
  
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
