module CategoryHelper
  def visit_categories
    visit '/react#/categories'
    wait_for_finished_loading

    expect(page).to have_text('my categories')
    expect(page).to have_text('Income')
    expect(page).to have_text('Expense')
  end

  def create_category(category)
    click_on 'New'
    click_on 'New Category'

    click_on 'Please select...'
    click_on category[:category_type]
    fill_in 'name', with: category[:name]
    click_on 'Save'
  end

  def create_subcategory(subcategory)
    click_on 'New'
    click_on 'New Subcategory'

    select subcategory[:category], from: 'categoryId'
    fill_in 'name', with: subcategory[:name]
    click_on 'Save'
  end

  def edit_category(old_name, new_name)
    page.find('tr.category', text: old_name).click
    fill_in 'name', with: new_name
    click_on 'Save'
  end

  def edit_subcategory(old_name, new_name)
    page.find('tr.subcategory', text: old_name).click
    fill_in 'name', with: new_name
    click_on 'Save'
  end

  def delete_category(category)
    page.find('tr.category', text: category[:name]).click
    click_on 'Delete'
    click_on 'Yes, Delete'
  end

  def delete_subcategory(subcategory)
    page.find('tr.subcategory', text: subcategory[:name]).click
    click_on 'Delete'
    click_on 'Yes, Delete'
  end

  def verify_category(category)
    within 'div.category-group', text: category[:category_type] do
      expect(page).to have_text(category[:name])
    end
  end

  def verify_subcategory(subcategory)
    within 'div.category-group', text: subcategory[:category_type] do
      expect(page).to have_text(subcategory[:name])
    end
  end

  def verify_category_deleted(category)
    within 'div.category-group', text: category[:category_type] do
      expect(page).not_to have_text(category[:name])
    end
  end

  def verify_subcategory_deleted(subcategory)
    within 'div.category-group', text: subcategory[:category_type] do
      expect(page).not_to have_text(subcategory[:name])
    end
  end

  def wait_for_finished_loading
    expect(page).not_to have_text('Loading...')
  end
end
