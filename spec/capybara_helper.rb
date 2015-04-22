def visit_patterns
  visit '/my_money'
  within('nav') do
    click_on 'patterns'
  end
end
