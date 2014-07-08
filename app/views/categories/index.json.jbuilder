json.array!(@categories) do |category|
  json.extract! category, :id, :name, :category_type
  json.url category_url(category, format: :json)
end
