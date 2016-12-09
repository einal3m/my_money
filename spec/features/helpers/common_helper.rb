module CommonHelper
  def wait_for_finished_loading
    expect(page).not_to have_text('Loading...')
  end

  def click_on_row_with_text(text)
    page.find('tr', text: text).click
  end

  def select_dropdown_option(name, value)
    within "div[name=#{name}]" do
      first('button').click
      click_on value
    end
  end

  def select_date_from_picker(id, date)
    current_date = Date.parse(find("##{id}").value)
    find(:xpath, "//input[@id='#{id}']/following-sibling::div").click

    if (current_date.month == date.month && current_date.year == date.year)
      click_on_day(date)
      return
    end

    click_on "#{current_date.strftime('%B %Y')}"

    if (current_date.year == date.year)
      click_on date.strftime('%b') # month
      click_on_day(date)
      return
    end

    click_on current_date.year
    click_on date.strftime('%Y') # year
    click_on date.strftime('%b') # month
    click_on_day(date) # day
  end

  private

  def click_on_day(date)
    day_of_month = date.strftime('%e').strip
    page.all('table button:not(.text-muted)',:text => day_of_month).first.click
  end
end
