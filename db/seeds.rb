# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.delete_all

Category.create!([
  {id: 1, name: "Transfer", category_type: "T"},
  {id: 2, name: "Wages", category_type: "I"},
  {id: 3, name: "Investments", category_type: "I"},
  {id: 4, name: "Bills", category_type: "I"},
  {id: 5, name: "Education", category_type: "E"},
  {id: 6, name: "Household", category_type: "E"},
  {id: 7, name: "Entertainment", category_type: "E"},
  {id: 8, name: "Other", category_type: "E"}
])


Subcategory.delete_all

Subcategory.create!([
  {id: 1, name: "MYOB", category_id: 2},
  {id: 2, name: "Vencorp", category_id: 2},
  {id: 3, name: "Interest Earned", category_id: 3},
  {id: 4, name: "Dividends", category_id: 3},
  {id: 5, name: "Electricity", category_id: 4},
  {id: 6, name: "Gas", category_id: 4},
  {id: 7, name: "Water", category_id: 4},
  {id: 8, name: "Phone/Internet", category_id: 4},
  {id: 9, name: "School Fees", category_id: 5},
  {id: 10, name: "Uniform", category_id: 5},
  {id: 11, name: "Extra-curricular activities", category_id: 5},
  {id: 12, name: "Groceries", category_id: 6},
  {id: 13, name: "Furniture", category_id: 6},
  {id: 14, name: "Appliances", category_id: 6},
  {id: 15, name: "Garden", category_id: 6},
  {id: 16, name: "Dining Out", category_id: 7},
  {id: 17, name: "Movies", category_id: 7},
  {id: 18, name: "Other", category_id: 7},
  {id: 19, name: "Cash", category_id: 8}
])