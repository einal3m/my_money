module PatternHelper
  def visit_patterns
    visit '/react#/patterns'
    wait_for_finished_loading

    expect(page).to have_text('my patterns')
  end

  def create_pattern(pattern_params)
    click_on 'New'

    fill_in_pattern_form(pattern_params)

    click_on 'Save'
    wait_for_finished_loading
  end

  def edit_pattern(text, pattern_params)
    click_on_row_with_text text

    fill_in_pattern_form(pattern_params)

    click_on 'Save'
    wait_for_finished_loading
  end

  def delete_pattern(text)
    click_on_row_with_text text
    click_on 'Delete'
    click_on 'Yes, Delete'
    wait_for_finished_loading
  end

  def fill_in_pattern_form(pattern_params)
    fill_in 'matchText', with: pattern_params[:match_text] if pattern_params[:match_text]
    fill_in 'notes', with: pattern_params[:notes] if pattern_params[:notes]
    if pattern_params[:category]
      within 'div[name=categoryId]' do
        first('button').click
        click_on pattern_params[:category]
      end
    end
    if pattern_params[:subcategory]
      within 'div[name=subcategoryId]' do
        first('button').click
        click_on pattern_params[:subcategory]
      end
    end
  end

  def verify_pattern(pattern_params)
    within 'tr', text: pattern_params[:match_text] do
      expect(page).to have_text(pattern_params[:notes])
      expect(page).to have_text(pattern_params[:category])
      expect(page).to have_text(pattern_params[:subcategory])
    end
  end

  def verify_pattern_deleted(match_text)
    expect(page).not_to have_text(match_text)
  end
end
