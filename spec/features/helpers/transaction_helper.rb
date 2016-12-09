module TransactionHelper
  def create_transaction(transaction_params)
    click_on 'New'

    fill_in_savings_transaction_form(transaction_params)

    click_on 'Save'
    wait_for_finished_loading
  end

  def edit_transaction(notes, transaction_params)
    click_on_row_with_text notes

    fill_in_savings_transaction_form(transaction_params)

    click_on 'Save'
    wait_for_finished_loading
  end

  def delete_transaction(text)
    click_on_row_with_text text
    click_on 'Delete'
    click_on 'Yes, Delete'
  end

  def verify_transaction(notes, content)
    within 'tr', text: notes do
      content.each do |text|
        expect(page).to have_text(text)
      end
    end
  end

  def filter_transactions(date_range_option, from_date, to_date)
    select_dropdown_option('dateRangeId', date_range_option)

    select_date_from_picker('fromDate', from_date)
    select_date_from_picker('toDate', to_date)
  end

  def select_file_to_import(file_name)
    click_on 'Import'

    page.execute_script('document.getElementById("fileChooser").className = ""')
    page.attach_file('fileChooser', File.expand_path("spec/fixtures/#{file_name}"))

    within '.modal-footer' do
      click_on 'Import'
    end

    wait_for_finished_loading
  end

  def set_import_category(text, category, subcategory)
    within 'tr', text: text do
      select_dropdown_option('categoryId', category) if category
      select_dropdown_option('subcategoryId', subcategory) if subcategory
    end
  end

  def import_transactions
    click_on 'Import'
    wait_for_finished_loading
    expect(page).to have_content('my transactions')
  end

  private

  def format_date(date)
    date.strftime('%-d-%b-%Y')
  end

  def fill_in_savings_transaction_form(transaction_params)
    fill_in 'date', with: transaction_params[:date] if transaction_params[:date]
    fill_in 'notes', with: transaction_params[:notes] if transaction_params[:notes]
    fill_in 'amount', with: transaction_params[:amount] if transaction_params[:amount]
    select_dropdown_option('categoryId', transaction_params[:category]) if transaction_params[:category]
    select_dropdown_option('subcategoryId', transaction_params[:subcategory]) if transaction_params[:subcategory]
  end
end
