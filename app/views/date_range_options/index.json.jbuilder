json.array!(@date_range_options) do |date_range_option|
  json.extract! date_range_option, :id
  json.url date_range_option_url(date_range_option, format: :json)
end
