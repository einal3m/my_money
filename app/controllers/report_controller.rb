require 'date_range'

class ReportController < ApplicationController
  before_action :get_date_range, only: [:income_vs_expense, :category, :subcategory]

  def index
  end

  def income_vs_expense
	  	
	# only interested in income and expense categories
	income_type = CategoryType.income
	expense_type = CategoryType.expense
	
	# get data for each category type
	@report_data = {}
	@unassigned_data = {}
	@report_data["Income"] = get_category_type_data(income_type)
	@report_data["Expense"] = get_category_type_data(expense_type)
	
  end
  
  def income_expense_bar
  
    # date range is previous 12 months
    @to_date = Date.new(Date.today.year, Date.today.month, -1)
    @from_date = (@to_date << 12) + 1

	# only interested in income and expense categories
	income_type = CategoryType.income
	expense_type = CategoryType.expense

	# get data for each category type
	month_totals = {}
	month_totals["Income"] = Hash[get_category_type_month_totals(income_type)]
	month_totals["Expense"] = Hash[get_category_type_month_totals(expense_type)]

    @report_data = []
    months = []
    starting_date = Date.today >> 1
    
    # generate list of months to report on
    12.times do |month|
    	months[month] = starting_date << (month+1)
    end
  
  	# fill report_data array
  	months.each do |month_date|
  		month_text = month_date.strftime('%m-%Y')
  		@report_data.unshift([month_date.strftime('%b-%y'), 
  			month_totals["Income"].has_key?(month_text) ? month_totals["Income"][month_text] : 0,
  			month_totals["Expense"].has_key?(month_text) ? month_totals["Expense"][month_text] : 0])
  	
  	end
  
  end
  
  def get_category_type_data(category_type)

	# for expenses, reverse the sign
  	factor = 1
  	if (category_type.name == "Expense") then factor = -1 end
  
	# create report data class
  	report_data = ReportData.new(:category_type_name => category_type.name)
  	
  	# find any unassigned transactions
	report_data.unassigned_total = factor * Transaction.where("category_id is null and ?*amount >=0 and date >= ? and date <= ?", factor, @date_range.from_date, @date_range.to_date).sum(:amount).to_f

  
	# generate sql for category data
	my_sql = "select categories.id, subcategory_id, (#{factor}*sum(transactions.amount)) FROM transactions, categories WHERE transactions.category_id = categories.id AND (date >= '#{@date_range.from_date}' and date <= '#{@date_range.to_date}') AND transactions.category_id IN (SELECT id FROM categories WHERE category_type_id = #{category_type.id}) GROUP BY transactions.category_id, transactions.subcategory_id ORDER BY categories.name"
	
  	report_data.parse(Transaction.connection.select_all(my_sql).rows)

	return report_data
  	
  end

  def get_category_type_month_totals(category_type)

	# for expenses, reverse the sign
  	factor = 1
  	if (category_type.name == "Expense") then factor = -1 end

	# generate sql for category type data
	my_sql = "select strftime('%m-%Y', t.date), (#{factor}*sum(t.amount)) FROM transactions t LEFT JOIN categories c ON t.category_id = c.id WHERE (t.date >= '#{@from_date}' and t.date <= '#{@to_date}') AND (t.category_id IN (SELECT id FROM categories WHERE category_type_id = #{category_type.id}) OR (t.category_id is null and #{factor}*amount>=0)) GROUP BY strftime('%m-%Y', t.date)"
		
	return Transaction.connection.select_all(my_sql).rows
  end
  
  def category

    # for from select boxes
  	@categories = Category.all

  	# check for category_id in params... if it's not there show unassigned transactions
  	@category_id = params[:category_id]
  	if @category_id.nil? || @category_id.blank? then
  		@category = nil 
  		@category_id = nil
	  else
  		@category = Category.find(@category_id)
  	end
  	
    search = CategorySearch.new({category: @category, date_range: @date_range})
    @transactions = search.transactions
    @transaction_total = search.sum

  	if @category_id.nil? then
       
      # generate sql for category type data
      my_sql = "select strftime('%m-%Y', t.date), sum(t.amount) FROM transactions t WHERE (t.date >= '#{@date_range.from_date}' and t.date <= '#{@date_range.to_date}') AND (t.category_id IS NULL) GROUP BY strftime('%m-%Y', t.date)"    
      sql_data = Hash[Transaction.connection.select_all(my_sql).rows]
  	else

      # for expenses, reverse the sign
      factor = 1
      if (@category.category_type.name == "Expense") then factor = -1 end
       
      # generate sql for category type data
      my_sql = "select strftime('%m-%Y', t.date), (#{factor}*sum(t.amount)) FROM transactions t WHERE (t.date >= '#{@date_range.from_date}' and t.date <= '#{@date_range.to_date}') AND (t.category_id == #{@category_id}) GROUP BY strftime('%m-%Y', t.date)"    
      sql_data = Hash[Transaction.connection.select_all(my_sql).rows]
  	end

    # generate list of months to report on
    months = []
    number_of_months = (@date_range.to_date.year*12+@date_range.to_date.month)-(@date_range.from_date.year*12+@date_range.from_date.month) + 1
    number_of_months.times do |month|
      months[month] = @date_range.from_date >> (month)
    end
  
    # fill report_data array
    @report_data = []
    months.each do |month_date|
      month_text = month_date.strftime('%m-%Y')
      @report_data << [month_date.strftime('%b-%y'), sql_data[month_date.strftime('%m-%Y')] || 0.00]    
    end

  end

# report for transactions with a specific subcategory

  def subcategory
  	
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
	  	@transactions = Transaction.where("subcategory_id = ? and date >= ? and date <= ?", @subcategory.id, @date_range.from_date, @date_range.to_date).reverse_date_order
  		@transaction_total = Transaction.where("subcategory_id = ? and date >= ? and date <= ?", @subcategory.id, @date_range.from_date, @date_range.to_date).sum(:amount)

  	# if only category defined, search for category with nil subcategory
  	elsif !@category.nil? then
  		@transactions = Transaction.where("category_id = ? and subcategory_id is null and date >= ? and date <= ?", @category.id, @date_range.from_date, @date_range.to_date).reverse_date_order
  		@transaction_total = Transaction.where("category_id = ? and subcategory_id is null and date >= ? and date <= ?", @category.id, @date_range.from_date, @date_range.to_date).sum(:amount)
  	
  	end
  
  end
  
end
