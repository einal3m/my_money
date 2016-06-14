def start_my_money
  visit ''
  wait_for_ajax
end

def click_on_row_with_text(text)
  page.find('tr', text: text).click
end

def confirm_alert
  page.driver.browser.switch_to.alert.accept
end

def format_date(date)
  date.strftime('%-d-%b-%Y')
end
