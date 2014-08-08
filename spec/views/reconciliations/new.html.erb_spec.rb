require 'rails_helper'

RSpec.describe "reconciliations/new", :type => :view do
  before(:each) do
    assign(:reconciliation, Reconciliation.new(
      :account_id => 1,
      :statement_date => "2014-07-01",
      :statement_balance => "9.99",
      :reconciled => false
    ))
    @accounts = Account.all
  end

  it "renders new reconciliation form" do
    render

    assert_select "form[action=?][method=?]", reconciliations_path, "post" do

      assert_select "select#reconciliation_account_id[name=?]", "reconciliation[account_id]"

      assert_select "input#reconciliation_statement_balance[name=?]", "reconciliation[statement_balance]"

      assert_select "input#reconciliation_reconciled", false

    end
  end
end
