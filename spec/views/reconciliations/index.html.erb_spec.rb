require 'rails_helper'

RSpec.describe "reconciliations/index", :type => :view do
  before(:each) do
    assign(:reconciliations, [
      Reconciliation.create!(
        :account_id => 1,
        :statement_date => "2014-07-01",
        :statement_balance => "9.99",
        :reconciled => false
      ),
      Reconciliation.create!(
        :account_id => 1,
        :statement_date => "2014-07-01",
        :statement_balance => "9.99",
        :reconciled => false
      )
    ])
  end

  it "renders a list of reconciliations" do
    render
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "2014-07-01".to_s, :count => 2
    assert_select "tr>td", :text => "9.99".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
