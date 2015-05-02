def visit_accounts
  visit '/my_money'
end

def visit_patterns
  visit '/my_money'
  within('nav') do
    click_on 'patterns'
  end
end

def visit_categories
  visit '/my_money'
  within('nav') do
    click_on 'categories'
  end
end

def visit_report(report_name)
  visit '/my_money'
  visit '/my_money#reports'
  click_on report_name
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
