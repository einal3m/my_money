require 'rails_helper'

RSpec.describe "reconciliations/edit", :type => :view do
  before(:each) do
    @reconciliation = assign(:reconciliation, Reconciliation.create!(
      :account_id => 1,
      :statement_date => "2014-07-01",
      :statement_balance => "9.99",
      :reconciled => false
    ))
    @accounts = Account.all

  end

  it "renders the edit reconciliation form" do
    render

    assert_select "form[action=?][method=?]", reconciliation_path(@reconciliation), "post" do

      assert_select "select#reconciliation_account_id[name=?]", "reconciliation[account_id]"

      assert_select "input#reconciliation_statement_balance[name=?]", "reconciliation[statement_balance]"

      assert_select "input#reconciliation_reconciled", false

    end
  end
end
