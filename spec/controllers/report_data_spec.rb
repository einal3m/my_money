require 'rails_helper'

RSpec.describe ReportData, :type => :class do

  before :all do
  		@subcat1 = Subcategory.first
		@subcat2 = Subcategory.last
		@data = [[@subcat1.category.id, @subcat1.id, 10], [@subcat2.category.id, @subcat2.id, 20], [@subcat1.category.id, nil, 30]]
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
		expect(report_data.data[@subcat1.category][@subcat1]).to eq(10)
		expect(report_data.data[@subcat1.category][nil]).to eq(30)
		expect(report_data.data[@subcat2.category][@subcat2]).to eq(20)
	end
	
	it "computes all category totals" do
		report_data = ReportData.new
		report_data.parse(@data)
		
		totals = report_data.category_totals
		expect(totals[@subcat1.category.name]).to eq(40)
		expect(totals[@subcat2.category.name]).to eq(20)
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
