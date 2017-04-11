class CategoryType
  def self.to_hash
    [transfer, income, expense]
  end

  def self.transfer
    {
      id: 1,
      name: 'Transfer',
      code: 'transfer',
      editable?: false
    }
  end

  def self.income
    {
      id: 2,
      name: 'Income',
      code: 'income',
      editable?: true
    }
  end

  def self.expense
    {
      id: 3,
      name: 'Expense',
      code: 'expense',
      editable?: true
    }
  end
end
