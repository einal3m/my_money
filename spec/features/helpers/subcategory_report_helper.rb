module SubcategoryReportHelper
  def subcategory_report_spec
    visit_subcategory_report
    run_category_one_unassigned_report
    run_category_one_subcategory_one_report
  end

  def run_category_one_unassigned_report
    select_dropdown_option('categoryId', 'Category One')
    select_dropdown_option('subcategoryId', 'Un-assigned')
    filter_transactions('Custom Dates', Date.yesterday, Date.tomorrow)

    view_table_report

    expect(page).not_to have_text('Second Transaction')
    expect(page).not_to have_text('Third Transaction')
    verify_transaction('Fourth Transaction', ['40.00', 'Account One', 'Category One'])
    expect(page).not_to have_text('Fifth Transaction')

    view_chart_report
    verify_chart
  end

  def run_category_one_subcategory_one_report
    select_dropdown_option('categoryId', 'Category One')
    select_dropdown_option('subcategoryId', 'Subcategory One')
    filter_transactions('Custom Dates', Date.yesterday, Date.tomorrow)

    view_table_report

    verify_transaction('Second Transaction', ['20.00', 'Account One', 'Category One/Subcategory One'])
    expect(page).not_to have_text('Third Transaction')
    expect(page).not_to have_text('Fourth Transaction')
    expect(page).not_to have_text('Fifth Transaction')

    view_chart_report
    verify_chart
  end
end
