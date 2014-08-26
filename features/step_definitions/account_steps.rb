
# steps specfic to account testing

# create accounts given a list of names
Given(/^I have accounts titled (.+)$/) do |titles|
  titles.split(', ').each do |title|
    FactoryGirl.create(:account, :name => title)
  end
end

# Ensure no accounts exist
Given /^I have no accounts$/ do
  Account.delete_all
end


# check how many accounts should exist
Then /^I should have ([0-9]+) accounts?$/ do |count|
  expect(Account.count).to eq(count.to_i)
end

# click +New button
When(/^I click the new account button$/) do
  find('.btn').click
end