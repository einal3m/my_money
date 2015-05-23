def start_my_money
  visit ''
  wait_for_ajax
end

def visit_categories
  start_my_money
  within('nav') do
    click_on 'categories'
  end
end

def visit_date_range_options
  visit '/date_range_options'
end

def click_on_row_with_text(text)
  page.find('tr', text: text).click
end

def confirm_alert
  page.driver.browser.switch_to.alert.accept
end
