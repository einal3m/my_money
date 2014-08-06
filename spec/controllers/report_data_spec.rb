require 'rails_helper'

RSpec.describe ReportData, :type => :class do

  before :all do
  
    	@ct = CategoryType.create(name: "Test")
  		@c1 = Category.create(name: "Test Category1", category_type: @ct)
  		@c2 = Category.create(name: "Test Category2", category_type: @ct)
  		@s1 = Subcategory.create(name: "Test Subcategory1", category: @c1)
		@s2 = Subcategory.create(name: "Test Subcategory2", category: @c2)
		@data = [[@c1.id, @s1.id, 10], [@c2.id, @s2.id, 20], [@c1.id, nil, 30]]
  end

	it "has a category type" do
		data = ReportData.new(category_type_name: "income")
		expect(data.category_type_name).to eq("income")
	end
	
	it "starts with zero total" do
		data = ReportData.new
		expect(data.total).to eq(0)
	end
	
	it "takes grouped data and creates a hash" do
		report_data = ReportData.new
		
		report_data.parse(@data)
		expect(report_data.data).to be_a(Hash)
		expect(report_data.data[@c1][@s1]).to eq(10)
		expect(report_data.data[@c1][nil]).to eq(30)
		expect(report_data.data[@c2][@s2]).to eq(20)
	end
	
	it "computes all category totals" do
		report_data = ReportData.new
		report_data.parse(@data)
		
		totals = report_data.category_totals
		expect(totals[@c1.name]).to eq(40)
		expect(totals[@c2.name]).to eq(20)
	end
	
	it "computes total" do
		report_data = ReportData.new
		report_data.parse(@data)
		
		total = report_data.total
		expect(total).to eq(60)
	end

	it "adds unassigned category total to overall total" do
		report_data = ReportData.new
		report_data.unassigned_total = 20
		report_data.parse(@data)
		
		expect(report_data.unassigned_total).to eq(20)
		expect(report_data.total).to eq(80)
		expect(report_data.category_totals["Un-assigned"]).to eq(20)
	end

end
