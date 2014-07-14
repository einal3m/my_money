require 'test_helper'

class ReportControllerTest < ActionController::TestCase
  test "should get income_vs_expense" do
    get :income_vs_expense
    assert_response :success
  end

end
