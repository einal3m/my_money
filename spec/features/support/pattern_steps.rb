def visit_patterns
  within '.header' do
    click_on 'patterns'
  end
  wait_for_ajax
end

def edit_pattern(text, params)
  click_on_row_with_text text
  fill_pattern_form(params)
end

def create_pattern(params)
  click_on 'new'
  fill_pattern_form(params)
end

def fill_pattern_form(params)
  fill_in 'match_text', with: params[:match_text]
  fill_in 'notes', with: params[:notes]
  select params[:category], from: 'category_id'
  select params[:subcategory], from: 'subcategory_id'

  click_on 'save'  
end

def delete_pattern(text)
    click_on_row_with_text text
    click_on 'delete'
    confirm_alert
    wait_for_ajax
    expect(page).not_to have_text(text)
end

def verify_pattern(params)
  within 'tr', text: params[:match_text] do
    expect(page).to have_text(params[:notes])
    expect(page).to have_text(params[:category])
    expect(page).to have_text(params[:subcategory])
  end
end
