require 'rails_helper'

RSpec.describe "reconciliations/show", :type => :view do
  before(:each) do
    @reconciliation = assign(:reconciliation, Reconciliation.create!(
      :account_id => 1,
      :statement_date => "2014-07-01",
      :statement_balance => "9.99",
      :reconciled => false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/1/)
    expect(rendered).to match(/9.99/)
    expect(rendered).to match(/2014-07-01/)
    expect(rendered).to match(/false/)
  end
end
