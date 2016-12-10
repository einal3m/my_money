module CategoryHelper
  def category_spec
    visit_categories

    create_categories
    edit_categories
    delete_categories
  end

  def c1
    { name: 'Category One', category_type: 'Income' }
  end

  def c2
    { name: 'Category Two', category_type: 'Expense' }
  end

  def c3
    { name: 'Category Three', category_type: 'Expense' }
  end

  def s1
    { name: 'Subcategory One', category_type: 'Income', category: 'Category One' }
  end

  def s2
    { name: 'Subcategory Two', category_type: 'Expense', category: 'Category Two' }
  end

  def s3
    { name: 'Subcategory Three', category_type: 'Expense', category: 'Category Three' }
  end

  def create_categories
    create_category(c1)
    verify_category(c1)
    create_category(c2)
    verify_category(c2)
    create_category(c3)
    verify_category(c3)
    create_subcategory(s1)
    verify_subcategory(s1)
    create_subcategory(s2)
    verify_subcategory(s2)
    create_subcategory(s3)
    verify_subcategory(s3)
  end

  def edit_categories
    edit_category(c3[:name], 'New Category Name')
    verify_category({name: 'New Category Name', category_type: 'Expense'})

    edit_subcategory(s3[:name], 'New Subcategory Name')
    verify_subcategory({name: 'New Subcategory Name', category: s2[:category], category_type: 'Expense'})
  end

  def delete_categories
    delete_subcategory('New Subcategory Name')
    verify_subcategory_deleted('Expense', 'New Subcategory Name')
    delete_category('New Category Name')
    verify_category_deleted('Expense', 'New Category Name')
  end

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

    click_on 'Please select...'
    click_on subcategory[:category]
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

  def delete_category(category_name)
    page.find('tr.category', text: category_name).click
    click_on 'Delete'
    click_on 'Yes, Delete'
  end

  def delete_subcategory(subcategory_name)
    page.find('tr.subcategory', text: subcategory_name).click
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

  def verify_category_deleted(category_type, category_name)
    within 'div.category-group', text: category_type do
      expect(page).not_to have_text(category_name)
    end
  end

  def verify_subcategory_deleted(category_type, subcategory_name)
    within 'div.category-group', text: category_type do
      expect(page).not_to have_text(subcategory_name)
    end
  end
end
