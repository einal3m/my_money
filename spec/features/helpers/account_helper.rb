module AccountHelper
  def account_spec
    visit_accounts

    create_savings_account
    create_and_delete_share_account
    create_loan_account
  end

  def create_savings_account
    create_account('Savings', {
      name: 'My Account One',
      bank: 'My Bank One',
      starting_date: Date.parse('2014-09-12'),
      starting_balance: '2.00'
    })

    verify_account('Savings', 'My Account One', ['My Bank One', '$2.00'])

    edit_account('My Account One', {
      name: 'Account One',
      bank: 'Bank One',
      starting_balance: '10.00'
    })

    verify_account('Savings', 'Account One', ['Bank One', '$10.00'])
  end

  def create_and_delete_share_account
    create_account('Share', {
      name: 'Account Two',
      ticker: 'TCK'
    })

    verify_account('Share', 'Account Two', ['$0.00'])

    delete_account('Account Two')
    verify_account_deleted('Account Two')
  end

  def create_loan_account
    create_account('Loan', {
      name: 'Account Three',
      bank: 'Bank Three',
      limit: '10000.00',
      term: '20',
      interest_rate: '3.59',
      starting_date: Date.parse('2014-09-12'),
    })

    verify_account('Loan', 'Account Three', ['Bank Three', '$0.00'])
  end

  def visit_accounts
    visit '/react#/accounts'
    wait_for_finished_loading

    expect(page).to have_text('my accounts')
  end

  def visit_account_transactions(account_name)
    visit_accounts
    select_account_action(account_name, 'View Transactions')
    wait_for_finished_loading
    expect(page).to have_content('my transactions')
    expect(page).to have_content("Transactions for #{account_name}")
  end

  def select_account_action(account_name, action)
    within '.slat-item', text: account_name do
      click_on '...'
      click_on action
    end
  end

  def create_account(account_type, account)
    click_on 'New'
    click_on "New #{account_type} Account"

    case account_type
      when 'Savings'
        fill_in_savings_account_form(account)
      when 'Share'
        fill_in_share_account_form(account)
      when 'Loan'
        fill_in_loan_account_form(account)
    end

    click_on 'Save'
    wait_for_finished_loading
  end

  def edit_account(account_name, account)
    select_account_action(account_name, 'Edit Account')

    fill_in_savings_account_form(account)

    click_on 'Save'
    wait_for_finished_loading
  end

  def fill_in_savings_account_form(account_params)
    fill_in 'name', with: account_params[:name] if account_params[:name]
    fill_in 'bank', with: account_params[:bank] if account_params[:bank]
    fill_in 'openingBalance', with: account_params[:starting_balance] if account_params[:starting_balance]
    select_date_from_picker('openingBalanceDate', account_params[:starting_date]) if account_params[:starting_date]
  end

  def fill_in_share_account_form(account_params)
    fill_in 'name', with: account_params[:name] if account_params[:name]
    fill_in 'ticker', with: account_params[:ticker] if account_params[:ticker]
  end

  def fill_in_loan_account_form(account_params)
    fill_in 'name', with: account_params[:name] if account_params[:name]
    fill_in 'bank', with: account_params[:bank] if account_params[:bank]
    fill_in 'limit', with: account_params[:limit] if account_params[:limit]
    fill_in 'term', with: account_params[:term] if account_params[:term]
    fill_in 'interestRate', with: account_params[:interest_rate] if account_params[:interest_rate]
    select_date_from_picker('openingBalanceDate', account_params[:starting_date]) if account_params[:starting_date]
  end

  def delete_account(account_name)
    select_account_action(account_name, 'Edit Account')
    click_on 'Delete'
    click_on 'Yes, Delete'
    wait_for_finished_loading
  end

  def verify_account(account_type, account_name, account_params)
    within '.account-group', text: account_type do
      within '.slat-item', text: account_name do
        account_params.each do |text|
          expect(page).to have_text(text)
        end
      end
    end
  end

  def verify_account_deleted(account_name)
    expect(page).not_to have_text(account_name)
  end
end
