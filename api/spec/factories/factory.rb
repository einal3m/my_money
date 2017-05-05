class Factory
  def self.create_account(attrs = {})
    default_attrs = {
      name: 'My Account',
      bank: 'My Bank',
      account_type: AccountType::SAVINGS,
      starting_balance: 2,
      starting_date: '2016-12-19',
      ticker: 'MMM',
      limit: 3,
      term: 4,
      interest_rate: 1.11
    }

    Account.create(default_attrs.merge(attrs))
  end

  def self.create_category(attrs = {})
    default_attrs = {
      category_type_id: 2,
      name: 'My Category'
    }

    Category.create(default_attrs.merge(attrs))
  end

  def self.create_subcategory(attrs = {})
    default_attrs = {
      name: 'My Subcategory'
    }

    attrs[:category] = create_category unless attrs[:category]

    Subcategory.create(default_attrs.merge(attrs))
  end
end
