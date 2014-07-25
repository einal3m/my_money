#
# ReportData - contains summary data for reports and charts
#
class ReportData


  attr_accessor :category_type_name, :total, :data, :unassigned_total
 
  def initialize(options={})
    self.category_type_name = options[:category_type_name]
    self.total, self.unassigned_total = 0, 0
  end
      
  # parse - input_data is a hash of the form {[category_id, subcategory_id] => amount}
  # sets the data attribute in the form {category => {subcategory => amount}}
  def parse(input_data)
  	self.data = {}
  	self.total = self.unassigned_total
  	
  	input_data.each do |values|
  		category = nil
  		subcategory = nil
  		
  		if !values[0].nil? then category = Category.find(values[0]) end
  		if !values[1].nil? then subcategory = Subcategory.find(values[1]) end
  		
  		if self.data.has_key?(category) then
  			self.data[category][subcategory] = values[2]
  		else
  			self.data[category] = {subcategory => values[2]}
  		end
  		
  		self.total += values[2]
  		
  	end

  end
  
  # category_totals returns a sorted hash of the form {category_name => total}
  def category_totals
  
  	totals = {}
  	self.data.each do |cat, values|
  		totals[cat.name] = 0
  		
  		values.each do |subcat, amount|
  			totals[cat.name] += amount
  		end
  	end
	
	if self.unassigned_total != 0 then totals["Un-assigned"] = self.unassigned_total end
	
  	return totals
  end
    
end

