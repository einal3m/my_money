def visit_transactions
  within 'nav' do
    click_on 'transactions'
  end
  wait_for_ajax
  expect(page).to have_content('my transactions')
end

def visit_account_transactions(account_name)
  click_on_row_with_text account_name
  wait_for_ajax
  expect(page).to have_content('my transactions')
end

def create_transaction(params)
  txn_params = {
    date: '1-Jan-2015',
    amount: '10.00'
  }.merge(params)

  click_on 'new'
  fill_in_savings_transaction_form(txn_params)
end

def fill_in_savings_transaction_form(params)
  fill_in 'date', with: params[:date]
  fill_in 'notes', with: params[:notes]
  fill_in 'amount', with: params[:amount]

  click_on 'save'
  wait_for_ajax
end

def delete_transaction(text)
  click_on_row_with_text text
  click_on 'delete'
  confirm_alert
end

def import_test_ofx
  click_on 'import'
  expect(page).to have_content('import transactions')
  expect(page).to have_content('Step 1 of 2')

  page.execute_script('$("[type=file]").removeClass("hidden")')
  page.attach_file('file_name', File.expand_path('spec/fixtures/test.ofx'))
  click_on 'uploadOFX'
  wait_for_ajax

  expect(page).to have_content('Step 2 of 2')
  within 'tr', text: 'MCDONALDS' do
    fill_in 'notes', with: 'Import Notes'
    select 'Category1', from: 'category_id'
    select 'Subcategory1', from: 'subcategory_id'
  end
  click_on 'upload'
  wait_for_ajax

  expect(page).to have_content('my transactions')
end
