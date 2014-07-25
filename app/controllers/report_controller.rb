
class ReportController < ApplicationController

  def index
  end

  def income_vs_expense
  	
  	# get date range from parameters or session
	get_date_range
	  	
	# only interested in income and expense categories
	income_type = CategoryType.income
	expense_type = CategoryType.expense
	
	# get data for each category type
	@report_data = {}
	@unassigned_data = {}
	@report_data["Income"] = get_category_type_data(income_type)
	@report_data["Expense"] = get_category_type_data(expense_type)
	

p @unassigned_data
  	
  end
  
  def get_category_type_data(category_type)

	# for expenses, reverse the sign
  	factor = 1
  	if (category_type.name == "Expense") then factor = -1 end
  
	# create report data class
  	report_data = ReportData.new(:category_type_name => category_type.name)
  	
  	# find any unassigned transactions
	report_data.unassigned_total = factor * Transaction.where("category_id is null and ?*amount >=0 and date >= ? and date <= ?", factor, @from_date, @to_date).sum(:amount).to_f

  
	# generate sql for category data
	my_sql = "select categories.id, subcategory_id, (#{factor}*sum(transactions.amount)) FROM transactions, categories WHERE transactions.category_id = categories.id AND (date >= '#{@from_date}' and date <= '#{@to_date}') AND transactions.category_id IN (SELECT id FROM categories WHERE category_type_id = #{category_type.id}) GROUP BY transactions.category_id, transactions.subcategory_id ORDER BY categories.name"
	
  	report_data.parse(Transaction.connection.select_all(my_sql).rows)

	return report_data
  	
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
