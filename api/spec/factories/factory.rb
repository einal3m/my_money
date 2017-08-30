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

  def self.create_budget(attrs = {})
    default_attrs = {
      description: 'My description',
      day_of_month: 1,
      amount: 100
    }

    attrs[:account] = create_account unless attrs[:account]

    Budget.create(default_attrs.merge(attrs))
  end

  def self.create_pattern(attrs = {})
    default_attrs = {
      match_text: 'match text',
      notes: 'notes'
    }

    attrs[:account] = create_account unless attrs[:account]
    attrs[:category] = create_category unless attrs[:category]
    attrs[:subcategory] = create_subcategory(category: attrs[:category]) unless attrs[:subcategory]

    Pattern.create(default_attrs.merge(attrs))
  end
end
