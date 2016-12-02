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
    within 'div[name=dateRangeId]' do
      first('button').click
      click_on date_range_option
    end

    page.all('.input-group-addon')[0].click
    click_on from_date.day

    page.all('.input-group-addon')[1].click
    click_on to_date.day
  end

  private

  def format_date(date)
    date.strftime('%-d-%b-%Y')
  end

  def fill_in_savings_transaction_form(transaction_params)
    fill_in 'date', with: transaction_params[:date] if transaction_params[:date]
    fill_in 'notes', with: transaction_params[:notes] if transaction_params[:notes]
    fill_in 'amount', with: transaction_params[:amount] if transaction_params[:amount]
    if transaction_params[:category]
      within 'div[name=categoryId]' do
        first('button').click
        click_on transaction_params[:category]
      end
    end
    if transaction_params[:subcategory]
      within 'div[name=subcategoryId]' do
        first('button').click
        click_on transaction_params[:subcategory]
      end
    end
  end
end
