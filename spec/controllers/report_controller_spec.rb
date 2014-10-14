require 'rails_helper'

RSpec.describe ReportController, :type => :controller do

	describe "income vs expense report" do
		# setup two categories
		#ct_in = FactoryGirl.create(:category_type, name: "Income")
		#ct_ex = FactoryGirl.create(:category_type, name: "Expense")
		#c_in = FactoryGirl.create(:category, category_type: ct_in)
		#c_ex = FactoryGirl.create(:category, category_type: ct_ex)
		#sc_in = FactoryGirl.create(:subcategory, category: c_in)
		#sc_ex = FactoryGirl.create(:subcategory, category: c_ex)

	end

	describe "category report" do

		before :each do
			@t1 = FactoryGirl.create(:transaction, date: "2014-01-01", amount: 4.0, subcategory: nil)
			@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category, subcategory: nil, amount: 10.0)
			@t3 = FactoryGirl.create(:transaction, date: "2014-01-01", category: nil, subcategory: nil, amount: 12.0)
			@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @t1.category, subcategory: nil, amount: 15.0)
			@t5 = FactoryGirl.create(:transaction, date: "2014-01-03", category: nil, subcategory: nil, amount: 5.00)
			@t6 = FactoryGirl.create(:transaction, date: "2014-03-02", category: @t1.category, subcategory: nil)
			@t7 = FactoryGirl.create(:transaction, date: "2014-03-03", category: nil, subcategory: nil)

			@dr1 = FactoryGirl.create(:date_range_option, description: "Current Month", klass: "CurrentMonthDateRange", default: true)
			@dr2 = FactoryGirl.create(:date_range_option, description: "Custom Dates", klass: "CustomDateRange")

		end

		it "returns all transactions for the specified category and date range" do
      get :category, {:category_id => @t1.category.id, date_range_option_id: @dr2.id, from_date: "2014-01-01", to_date: "2014-02-28"}

      expect(assigns(:transactions)).to eq([@t4, @t2, @t1])
      expect(assigns(:report_data)).to eq([['Jan-14', 14.0], ['Feb-14', 15.0]])
		end

		it "returns all transactions without categories when none is supplied" do

      get :category, {date_range_option_id: @dr2.id, from_date: "2014-01-01", to_date: "2014-02-28"}
      expect(assigns(:transactions)).to eq([@t5, @t3])
      expect(assigns(:report_data)).to eq([['Jan-14', 17.00], ['Feb-14', 0.00]])
		end

		it "returns no transactions when no category is selected" do
			get :category

			expect(assigns(:transactions)).to eq([])
		end

		it "provides a list of categories" do
			get :category

			expect(assigns(:categories)).to eq([@t1.category])
		end

		it "provides a list of date range options and a default selected date range" do
      get :category

      expect(assigns(:date_range_options)).to eq([@dr1,@dr2])
      expect(assigns(:date_range_option)).to eq(@dr1)
		end

	  context "Current Month" do

	  	it "returns all transactions for specified category for the current month" do
				t8 = FactoryGirl.create(:transaction, date: Date.today, category: nil)
				t9 = FactoryGirl.create(:transaction, date: Date.today, category: @t1.category)

	      get :category, {:category_id => @t1.category.id, date_range_option_id: @dr1.id}

	      expect(assigns(:transactions)).to eq([t9])
#      expect(assigns(:report_data)).to eq([['Jan-14', 14.0], ['Feb-14', 15.0]])
			end

	  	it "returns all transactions for no category for the current month" do
				t8 = FactoryGirl.create(:transaction, date: Date.today, category: nil)
				t9 = FactoryGirl.create(:transaction, date: Date.today)

	      get :category, {date_range_option_id: @dr1.id}

	      expect(assigns(:transactions)).to eq([t8])
#      expect(assigns(:report_data)).to eq([['Jan-14', 14.0], ['Feb-14', 15.0]])
			end
	  end
	end

	describe "subcategory report" do

		before :each do
			@sc = FactoryGirl.create(:subcategory)
			@c = @sc.category
			@t1 = FactoryGirl.create(:transaction, date: "2014-01-01", category: @c, subcategory: @sc)
			@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @c, subcategory: @sc)
			@t3 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @c, subcategory: nil)
			@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @c, subcategory: @sc)
			@t5 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @c, subcategory: nil)
			@dr1 = FactoryGirl.create(:date_range_option, description: "Current Month", klass: "CurrentMonthDateRange", default: true)
			@dr2 = FactoryGirl.create(:date_range_option, description: "Custom Dates", klass: "CustomDateRange")
		end


		it "returns all transactions for the specfied subcategory" do
			get :subcategory, {:category_id => @c, :subcategory_id => @sc, date_range_option_id: @dr2.id, from_date: "2014-01-01", to_date: "2014-01-31" }
      expect(assigns(:transactions)).to eq([@t2, @t1])
		end

		it "returns all transactions for category and no subcategory" do
			get :subcategory, {:category_id => @c, date_range_option_id: @dr2.id, from_date: "2014-01-01", to_date: "2014-01-31" }
      expect(assigns(:transactions)).to eq([@t5, @t3])
		end

		it "returns no transactions when no category or subcategory is selected" do
			get :subcategory

			expect(assigns(:transactions)).to eq([])
		end

		it "provides a list of categories" do
			get :subcategory

			expect(assigns(:categories)).to eq([@c])
		end		

		it "provides a list of date range options and a default selected date range" do
			get :subcategory, {:category_id => @t1.category, :subcategory_id => @t1.subcategory }

      expect(assigns(:date_range_options)).to eq([@dr1, @dr2])
      expect(assigns(:date_range_option)).to eq(@dr1)
		end

	end

end
