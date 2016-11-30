module CommonHelper
  def wait_for_finished_loading
    expect(page).not_to have_text('Loading...')
  end

  def click_on_row_with_text(text)
    page.find('tr', text: text).click
  end
end
