# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
CategoryType.delete_all

CategoryType.create!([
  {id: 1, name: "Transfer"},
  {id: 2, name: "Income"},
  {id: 3, name: "Expense"}
])


Category.delete_all

Category.create!([
  {id: 1, name: "Transfer", category_type_id: 1},
  {id: 2, name: "Wages", category_type_id: 2},
  {id: 3, name: "Investments", category_type_id: 2},
  {id: 4, name: "Bills", category_type_id: 3},
  {id: 5, name: "Education", category_type_id: 3},
  {id: 6, name: "Household", category_type_id: 3},
  {id: 7, name: "Entertainment", category_type_id: 3},
  {id: 8, name: "Other", category_type_id: 3},
  {id: 13, name: "Bank", category_type_id: 3},
  {id: 14, name: "Health", category_type_id: 3},
  {id: 15, name: "Car", category_type_id: 3}
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
  {id: 19, name: "Cash", category_id: 8},
  {id: 20, name: "Interest Paid", category_id: 13},
  {id: 21, name: "Fees", category_id: 13},
  {id: 22, name: "Doctor", category_id: 14},
  {id: 23, name: "Chemist", category_id: 14},
  {id: 24, name: "Petrol", category_id: 15}
])