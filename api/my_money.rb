require 'roda'

class MyMoney < Roda
  plugin :multi_route
  plugin :json
  Dir['./routes/*.rb'].each { |f| require f }

  route(&:multi_route)
end
