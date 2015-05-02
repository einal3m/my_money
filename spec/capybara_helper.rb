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
