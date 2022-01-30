# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2017_02_28_082523) do

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "bank"
    t.integer "starting_balance"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "starting_date"
    t.integer "reconciliation_id"
    t.string "ticker"
    t.string "account_type"
    t.integer "limit"
    t.integer "term"
    t.decimal "interest_rate"
  end

  create_table "bank_statements", force: :cascade do |t|
    t.integer "account_id"
    t.date "date"
    t.integer "transaction_count"
    t.string "file_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "budgets", force: :cascade do |t|
    t.integer "account_id"
    t.string "description"
    t.integer "day_of_month"
    t.integer "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "category_type_id"
  end

  create_table "category_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "patterns", force: :cascade do |t|
    t.integer "account_id"
    t.string "match_text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "category_id"
    t.integer "subcategory_id"
    t.string "notes"
  end

  create_table "reconciliations", force: :cascade do |t|
    t.integer "account_id"
    t.date "statement_date"
    t.integer "statement_balance"
    t.boolean "reconciled"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "last_reconciled_date"
    t.decimal "last_reconciled_balance"
  end

  create_table "subcategories", force: :cascade do |t|
    t.string "name"
    t.integer "category_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.string "transaction_type"
    t.date "date"
    t.integer "amount"
    t.string "fitid"
    t.string "memo"
    t.integer "account_id"
    t.integer "category_id"
    t.integer "subcategory_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "notes"
    t.integer "reconciliation_id"
    t.integer "balance"
    t.integer "unit_price"
    t.integer "quantity"
    t.integer "bank_statement_id"
    t.integer "matching_transaction_id"
  end

end
