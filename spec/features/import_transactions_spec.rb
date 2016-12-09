require 'rails_helper'

feature 'Import Transactions', type: :feature do
  let(:c1) { { name: 'First Category', category_type: 'Income' } }
  let(:s1) { { name: 'First Subcategory', category_type: 'Income', category: 'First Category' } }

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User imports transactions from OFX file', js: true  do
    visit_categories
    create_category(c1)
    create_subcategory(s1)

    visit_accounts
    create_account 'Savings', {
      name: 'My New Account',
      bank: 'My Bank',
      starting_balance: '10',
      starting_date: '01-Jul-2014'
    }
    visit_account_transactions 'My New Account'

    select_file_to_import('test.ofx')
    set_import_category('MCDONALDS', 'First Category', 'First Subcategory')
    import_transactions

    filter_transactions('Custom Dates', Date.parse('2014-07-01'), Date.parse('2014-07-31'))

    verify_transaction('VILLAGE CINEMA', ['5-Jul-2014', '55.00', '$3,110.15'])
    verify_transaction('COLES SUPERMARKETS', ['4-Jul-2014', '74.76', '$3,165.15'])
    verify_transaction('TARGET', ['3-Jul-2014', '16.99', '$3,239.91'])
    verify_transaction('PAYMENT RECEIVED', ['3-Jul-2014', '3,266.10', '$3,256.90'])
    verify_transaction('MCDONALDS', ['3-Jul-2014', '19.20', '$(9.20)', 'First Category/First Subcategory'])
  end
end
