

# steps for visiting pages
Given(/^I am on the (.+) page$/) do |page_name|
  if (page_name == "home") then visit(root_path)
  else visit(page_name) end
end

When(/^I go to the (.+) page$/) do |page_name|
  if (page_name == "home") then visit(root_path)
  else visit(page_name) end
end

# steps for following links
When(/^I click the "([^\"]*)" button$/) do |button|
  click_button(button)
end

# steps for entering data into fields
When /^I fill in "([^\"]*)" with "([^\"]*)"$/ do |field, value|
  fill_in(field, :with => value) 
end

# steps for seeing specific text

Then /^I should see "([^\"]*)"$/ do |text|
  expect(page).to have_content(text)
end

Then /^I should not see "([^\"]*)"$/ do |text|
  expect(page).not_to have_content(text)
end
