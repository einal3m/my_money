Sequel.migration do
  change do
    create_table(:account_types) do
      primary_key :id
      String :name, :size=>255
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:accounts) do
      primary_key :id
      String :name, :size=>255
      String :bank, :size=>255
      Integer :starting_balance
      DateTime :created_at
      DateTime :updated_at
      Date :starting_date
      Integer :reconciliation_id
      String :ticker, :size=>255
      String :account_type, :size=>255
      Integer :limit
      Integer :term
      BigDecimal :interest_rate
    end
    
    create_table(:bank_statements) do
      primary_key :id
      Integer :account_id
      Date :date
      Integer :transaction_count
      String :file_name, :size=>255
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:budgets) do
      primary_key :id
      Integer :account_id
      String :description, :size=>255
      Integer :day_of_month
      Integer :amount
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:categories) do
      primary_key :id
      String :name, :size=>255
      DateTime :created_at
      DateTime :updated_at
      Integer :category_type_id
    end
    
    create_table(:category_types) do
      primary_key :id
      String :name, :size=>255
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:data_files) do
      primary_key :id
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:patterns) do
      primary_key :id
      Integer :account_id
      String :match_text, :size=>255
      DateTime :created_at
      DateTime :updated_at
      Integer :category_id
      Integer :subcategory_id
      String :notes, :size=>255
    end
    
    create_table(:reconciliations) do
      primary_key :id
      Integer :account_id
      Date :statement_date
      Integer :statement_balance
      TrueClass :reconciled
      DateTime :created_at
      DateTime :updated_at
      Date :last_reconciled_date
      BigDecimal :last_reconciled_balance
    end
    
    create_table(:schema_migrations, :ignore_index_errors=>true) do
      String :version, :size=>255, :null=>false
      
      index [:version], :name=>:unique_schema_migrations, :unique=>true
    end
    
    create_table(:subcategories) do
      primary_key :id
      String :name, :size=>255
      Integer :category_id
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:transaction_types) do
      primary_key :id
      Integer :account_type_id
      String :name, :size=>255
      DateTime :created_at
      DateTime :updated_at
    end
    
    create_table(:transactions) do
      primary_key :id
      String :transaction_type, :size=>255
      Date :date
      Integer :amount
      String :fitid, :size=>255
      String :memo, :size=>255
      Integer :account_id
      Integer :category_id
      Integer :subcategory_id
      DateTime :created_at
      DateTime :updated_at
      String :notes, :size=>255
      Integer :reconciliation_id
      Integer :balance
      Integer :unit_price
      Integer :quantity
      Integer :bank_statement_id
      Integer :matching_transaction_id
    end
  end
end
