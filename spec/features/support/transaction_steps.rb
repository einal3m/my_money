def visit_transactions
  within 'nav' do
    click_on 'transactions'
  end
  wait_for_ajax
  expect(page).to have_content('my transactions')
end

def visit_account_transactions(account_name)
  click_on account_name
  wait_for_ajax
  expect(page).to have_content('my transactions')
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
