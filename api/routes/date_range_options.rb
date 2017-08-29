class MyMoney
  route('date_range_options') do |r|
    # GET date_range_options
    r.get do
      DateRangeOptionsQuery.new.execute
    end
  end
end
