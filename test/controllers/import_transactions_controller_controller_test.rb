require 'test_helper'

class ImportTransactionsControllerControllerTest < ActionController::TestCase
  test "should get file_chooser" do
    get :file_chooser
    assert_response :success
  end

  test "should get import" do
    get :import
    assert_response :success
  end

end
