require 'lib/date_range'

class ReportController < ApplicationController
  before_action :get_date_range, only: [:income_vs_expense, :category, :subcategory, :eod_balance]

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

    income_type = CategoryType.income
    expense_type = CategoryType.expense

    date_range = Lib::CustomDateRange.new(from_date: @from_date.to_s, to_date: @to_date.to_s)
    income_search = Lib::CategoryTypeSearch.new(date_range: date_range, category_type: income_type)
    expense_search = Lib::CategoryTypeSearch.new(date_range: date_range, category_type: expense_type)

    @report_data = merge_data(income_search.month_totals, expense_search.month_totals)
  end

  def merge_data(income_data, expense_data)
    data = []
    income_data.each_with_index do |a, i|
      data << [a[0], a[1], -expense_data[i][1]]
    end
    data
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

  # balance
  # retrieves the end of day balance for the specified account for the date range
  def eod_balance
    get_account

    # if account has been selected, run search
    if @account.nil?
      @line_chart_data = []
    else
      search = Lib::BalanceSearch.new(account: @account, date_range: @date_range)
      @line_chart_data = search.eod_balance
    end

    render json: @line_chart_data
  end

  def category
    @category_id = params[:category_id]
    if @category_id.nil? || @category_id.blank?
      @category = nil
      @category_id = nil
    else
      @category = Category.find(@category_id)
    end

    # data for select box
    @categories = Category.all

    # create search and run it
    search = Lib::CategorySearch.new(category: @category, date_range: @date_range)
    @transactions = search.transactions
    @transaction_total = search.sum
    @monthly_totals = search.month_totals

    result = { transactions: @transactions, transaction_total: @transaction_total, monthly_totals: @monthly_totals }
  end

  def subcategory
    @category = nil
    @category_id = nil
    @subcategory = nil
    @subcategory_id = nil
    if params.key?(:subcategory_id) && !params[:subcategory_id].blank? then
      @subcategory_id = params[:subcategory_id]
      @subcategory =  Subcategory.find(@subcategory_id)
      @category = @subcategory.category
    end
      
    # if subcategory wasn't in params, check for category_id
    if @subcategory.nil? && params.key?(:category_id) then
      @category = Category.find(params[:category_id])
    end
    
    # data for select boxes
    @subcategories = []
    @categories = Category.all
    if !@category.nil? then 
      @category_id = @category.id 
      @subcategories = @category.subcategories
    end

    # create search and run it
    search = Lib::SubcategorySearch.new(category: @category, subcategory: @subcategory, date_range: @date_range)
    @transactions = search.transactions
    @transaction_total = search.sum
    @monthly_totals = search.month_totals
  end
end
