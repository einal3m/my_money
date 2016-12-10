module CategoryReportHelper
  def category_report_spec
    visit_category_report
    run_unassigned_report
    run_category_one_report
  end

  def visit_category_report
    visit '/react#/reports/categoryReport'
    wait_for_finished_loading

    expect(page).to have_text('category report')
  end

  def run_unassigned_report
    select_dropdown_option('categoryId', 'Un-assigned')
    filter_transactions('Custom Dates', Date.yesterday, Date.tomorrow)

    view_table_report

    expect(page).not_to have_text('Second Transaction')
    expect(page).not_to have_text('Third Transaction')
    expect(page).not_to have_text('Fourth Transaction')
    verify_transaction('Fifth Transaction', ['50.00', 'Account One'])

    view_chart_report
    verify_chart
  end

  def run_category_one_report
    select_dropdown_option('categoryId', 'Category One')
    filter_transactions('Custom Dates', Date.yesterday, Date.tomorrow)

    view_table_report

    verify_transaction('Second Transaction', ['20.00', 'Account One', 'Category One/Subcategory One'])
    expect(page).not_to have_text('Third Transaction')
    verify_transaction('Fourth Transaction', ['40.00', 'Account One', 'Category One'])
    expect(page).not_to have_text('Fifth Transaction')

    view_chart_report
    verify_chart
  end
end
