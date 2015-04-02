require 'rails_helper'

RSpec.describe ReportController, type: :controller do
  describe 'EOD Balance Report' do
    it 'returns an array of eod balances' do
      account_id = 11
      from_date = '2014-01-01'
      to_date = '2014-01-2'
      data = [['01 Jan, 2014', 4.0], ['02 Jan, 2014', 14.0]]

      account = double :account
      search = double :search
      date_range = double :date_range

      expect(Lib::CustomDateRange).to receive(:new).with(from_date: from_date, to_date: to_date).and_return(date_range)
      expect(Account).to receive(:find).with(account_id).and_return(account)
      expect(Lib::BalanceSearch).to receive(:new).with(account: account, date_range: date_range).and_return(search)
      expect(search).to receive(:eod_balance).and_return(data)

      get :eod_balance, account_id: account_id, from_date: from_date, to_date: to_date
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['report'].length).to eq(2)
      expect(json['report']).to eq(data)
    end

    it 'returns no data when account not specified' do
      get :eod_balance
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['report'].length).to eq(0)
    end
  end

  describe 'Income vs Expense Bar Chart' do
    it 'returns an array of monthly income and expenses' do
      income_data = [['date1', 40], ['date2', 140]]
      expense_data = [['date1', -60], ['date2', -70]]

      date_range = double :date_range
      income_category_type = double :income_category_type
      expense_category_type = double :expense_category_type
      income_search = double :income_search
      expense_search = double :expense_search

      expect(CategoryType).to receive(:income).and_return(income_category_type)
      expect(CategoryType).to receive(:expense).and_return(expense_category_type)

      expect(Lib::Last12MonthsDateRange).to receive(:new).and_return(date_range)
      expect(Lib::CategoryTypeSearch).to receive(:new).with(category_type: income_category_type, date_range: date_range).and_return(income_search)
      expect(Lib::CategoryTypeSearch).to receive(:new).with(category_type: expense_category_type, date_range: date_range).and_return(expense_search)

      expect(income_search).to receive(:month_totals).and_return(income_data)
      expect(expense_search).to receive(:month_totals).and_return(expense_data)

      get :income_expense_bar

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['report'].length).to eq(2)
      expect(json['report']).to eq([['date1', 40, -60], ['date2', 140, -70]])
    end
  end

  describe 'Income vs Expense Report' do
    it 'returns report data' do
      from_date = '2014-12-01'
      to_date = '2014-12-31'
      unassigned_total = { income: 99, expense: 77 }
      total = { income: 100, expense: 101 }

      date_range = double :date_range
      expect(Lib::CustomDateRange).to receive(:new).with(from_date: from_date, to_date: to_date).and_return(date_range)

      [:income, :expense].each do |type|
        category_type = double :category_type
        category_type_search = double :category_type_search
        unassigned_search = double :unassigned_search

        expect(CategoryType).to receive(type).and_return(category_type)
        expect(Lib::CategoryTypeSearch).to receive(:new)
          .with(date_range: date_range, category_type: category_type)
          .and_return(category_type_search)
        expect(Lib::CategorySearch).to receive(:new)
          .with(date_range: date_range, category: nil, category_type: category_type)
          .and_return(unassigned_search)

        expect(category_type_search).to receive(:group_by).with(:category_id, :subcategory_id)
          .and_return([{ type => 100 }])
        expect(category_type_search).to receive(:group_by).with(:category_id)
          .and_return([{ type => 200 }])
        expect(unassigned_search).to receive(:sum).and_return(unassigned_total[type])
        expect(category_type_search).to receive(:sum).and_return(total[type])
      end

      get :income_vs_expense, from_date: from_date, to_date: to_date
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json).to eq(
        'income' => {
          'subcategory_totals' => [{ 'income' => 100 }],
          'category_totals' => [{ 'income' => 200 }] << { 'sum' => unassigned_total[:income], 'category_id' => nil },
          'total' => total[:income] + unassigned_total[:income]
        },
        'expense' => {
          'subcategory_totals' => [{ 'expense' => 100 }],
          'category_totals' => [{ 'expense' => 200 }] << { 'sum' => unassigned_total[:expense], 'category_id' => nil },
          'total' => total[:expense] + unassigned_total[:expense]
        }
      )
    end
  end

  describe 'category report' do
    it 'returns all transactions and summary data for the specified category and date range' do
      from_date = '2014-01-01'
      to_date = '2014-02-28'
      category_id = 11
      category = double :category, id: category_id
      date_range = double :date_range
      search = double :search
      t1 = FactoryGirl.create(:transaction)
      t2 = FactoryGirl.create(:transaction)
      month_data = [['date1', 40, -60], ['date2', 140, -70]]

      expect(Lib::CustomDateRange).to receive(:new).with(from_date: from_date, to_date: to_date).and_return(date_range)
      expect(Lib::CategorySearch).to receive(:new).with(category: category, date_range: date_range).and_return(search)
      expect(Category).to receive(:find).with(category_id.to_s).and_return(category)
      expect(search).to receive(:month_totals).and_return(month_data)
      expect(search).to receive(:transactions).and_return([t1, t2])

      get :category, category_id: category.id, from_date: from_date, to_date: to_date

      expect(response).to be_success
      json = JSON.parse(response.body)

      expect(json['month_totals'].length).to eq(2)
      expect(json['month_totals']).to eq(month_data)

      expect(json['transactions'].length).to eq(2)
      # expect(json['transactions'][0]).to eq(serialize_transaction(t1))
      # expect(json['transactions'][1]).to eq(serialize_transaction(t2))
    end
  end

  describe 'subcategory report' do
    it 'returns all transactions and summary data for the specified subcategory and date range' do
      from_date = '2014-01-01'
      to_date = '2014-02-28'
      subcategory_id = 12
      subcategory = double :subcategory, id: subcategory_id
      category = double :category
      date_range = double :date_range
      search = double :search
      t1 = FactoryGirl.create(:transaction)
      t2 = FactoryGirl.create(:transaction)
      month_data = [['date1', 40, -60], ['date2', 140, -70]]

      expect(Lib::CustomDateRange).to receive(:new).with(from_date: from_date, to_date: to_date).and_return(date_range)
      expect(Lib::SubcategorySearch).to receive(:new).with(category: category, subcategory: subcategory, date_range: date_range).and_return(search)
      expect(Subcategory).to receive(:find).with(subcategory_id.to_s).and_return(subcategory)
      expect(subcategory).to receive(:category).and_return(category)
      expect(search).to receive(:month_totals).and_return(month_data)
      expect(search).to receive(:transactions).and_return([t1, t2])

      get :subcategory, subcategory_id: subcategory.id, from_date: from_date, to_date: to_date

      expect(response).to be_success
      json = JSON.parse(response.body)

      expect(json['month_totals'].length).to eq(2)
      expect(json['month_totals']).to eq(month_data)

      expect(json['transactions'].length).to eq(2)
      # expect(json['transactions'][0]).to eq(serialize_transaction(t1))
      # expect(json['transactions'][1]).to eq(serialize_transaction(t2))
    end
  end
end
