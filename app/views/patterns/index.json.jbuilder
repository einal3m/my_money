json.array!(@patterns) do |pattern|
  json.extract! pattern, :id, :account_id, :match_text
  json.url pattern_url(pattern, format: :json)
end
