def start_my_money
  visit ''
  wait_for_ajax
end

def confirm_alert
  page.driver.browser.switch_to.alert.accept
end


