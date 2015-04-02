require 'lib/date_range'

class ReportController < ApplicationController
  before_action :get_date_range, only: [:subcategory]
  before_action :set_data_range, only: [:income_vs_expense, :eod_balance, :category]

  def index
  end

  def income_vs_expense
    category_types = { income: CategoryType.income, expense: CategoryType.expense }
    report_data = { income: {}, expense: {} }

    [:income, :expense].each do |category_type|
      report_data[category_type] = get_category_type_data(category_type, category_types)
    end

    render json: report_data
  end

  def income_expense_bar
    income_type = CategoryType.income
    expense_type = CategoryType.expense

    date_range = Lib::Last12MonthsDateRange.new
    income_search = Lib::CategoryTypeSearch.new(date_range: date_range, category_type: income_type)
    expense_search = Lib::CategoryTypeSearch.new(date_range: date_range, category_type: expense_type)

    report_data = merge_data(income_search.month_totals, expense_search.month_totals)
    render json: report_data
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
    set_category
    search = Lib::CategorySearch.new(category: @category, date_range: @date_range)
    transactions = search.transactions
    month_totals = search.month_totals

    report_data = { transactions: transactions, month_totals: month_totals }
    render json: report_data
  end

  def subcategory
    @category = nil
    @category_id = nil
    @subcategory = nil
    @subcategory_id = nil
    if params.key?(:subcategory_id) && !params[:subcategory_id].blank?
      @subcategory_id = params[:subcategory_id]
      @subcategory =  Subcategory.find(@subcategory_id)
      @category = @subcategory.category
    end

    # if subcategory wasn't in params, check for category_id
    if @subcategory.nil? && params.key?(:category_id)
      @category = Category.find(params[:category_id])
    end

    # data for select boxes
    @subcategories = []
    @categories = Category.all
    unless @category.nil?
      @category_id = @category.id
      @subcategories = @category.subcategories
    end

    # create search and run it
    search = Lib::SubcategorySearch.new(category: @category, subcategory: @subcategory, date_range: @date_range)
    @transactions = search.transactions
    @transaction_total = search.sum
    @monthly_totals = search.month_totals
  end

  private

  def merge_data(income_data, expense_data)
    data = []
    income_data.each_with_index do |a, i|
      data << [a[0], a[1], expense_data[i][1]]
    end
    data
  end

  def get_category_type_data(category_type, category_types)
    data = {}
    search = Lib::CategoryTypeSearch.new(date_range: @date_range, category_type: category_types[category_type])
    data[:subcategory_totals] = search.group_by(:category_id, :subcategory_id)
    data[:category_totals] = search.group_by(:category_id)
    unassigned_search = Lib::CategorySearch.new(date_range: @date_range, category: nil, category_type: category_types[category_type])
    unassigned_sum = unassigned_search.sum
    data[:category_totals] << { sum: unassigned_sum, category_id: nil }
    data[:total] = search.sum + unassigned_sum
    data
  end

  def set_data_range
    @date_range = Lib::CustomDateRange.new from_date: params[:from_date], to_date: params[:to_date]
  end

  def set_category
    @category = params.key?(:category_id) && !params[:category_id].blank? ? Category.find(params[:category_id]) : nil
  end
end
