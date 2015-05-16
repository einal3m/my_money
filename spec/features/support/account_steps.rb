def visit_accounts
  visit '#accounts'
  wait_for_ajax
  expect(page).to have_content('my accounts')
end

def create_account(params = {})
  account_params = {
    name: 'Default Account Name',
    bank: 'Default Bank',
    starting_date: '19-Dec-2014',
    starting_balance: '50.00'
  }.merge(params)

  click_on 'new'
  expect(page).to have_content('new account')
  select 'Savings', from: 'account_type_id'
  fill_in_account_form(account_params)
end

def show_account(name)
  within 'tr', text: name do
    click_on 'show'
  end
end

def edit_account(params)
  click_on 'edit'
  fill_in_account_form(params)
end

def fill_in_account_form(params)
  fill_in 'name', with: params[:name]
  fill_in 'bank', with: params[:bank]
  fill_in 'starting_balance', with: params[:starting_balance]
  fill_in 'starting_date', with: params[:starting_date]

  click_on 'save'
  wait_for_ajax
end

def delete_account(account_name)
  within 'tr', text: account_name do
    click_on 'show'
  end
  click_on 'edit'
  click_on 'delete'
  confirm_alert
  expect(page).to have_content('my accounts')
  expect(page).not_to have_content(account_name)
end

def verify_account(name, bank, date, balance)
  expect(page).to have_text(name)
  expect(page).to have_text(bank)
  expect(page).to have_text(balance)
  expect(page).to have_text(date)
end
