CategoryType.create!([
  {id: 1, name: "Transfer"},
  {id: 2, name: "Income"},
  {id: 3, name: "Expense"}
])

Category.create!([
  {id: 1, name: "Transfer", category_type_id: 1},
])
