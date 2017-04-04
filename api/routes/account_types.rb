class MyMoney
  route('account_types') do |r|
    r.get do
      'GET account_types'
      # r.halt(200, 'GET account_types')
    end
  end
end
