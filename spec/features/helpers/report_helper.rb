module ReportHelper
  def visit_category_report
    visit '/react#/reports/categoryReport'
    wait_for_finished_loading

    expect(page).to have_text('category report')
  end

  def visit_subcategory_report
    visit '/react#/reports/subcategoryReport'
    wait_for_finished_loading

    expect(page).to have_text('subcategory report')
  end

  def view_table_report
    return if page.all('#tableButton.active').length > 0
    click_on 'tableButton'
  end

  def view_chart_report
    return if page.all('#chartButton.active').length > 0
    click_on 'chartButton'
  end

  def verify_chart
    expect(page.all('svg').length).to eq(1)
    expect(page.all('.x-axis').length).to eq(1)
    expect(page.all('.y-axis').length).to eq(1)
    expect(page.all('.series0').length).to eq(1)
  end
end
