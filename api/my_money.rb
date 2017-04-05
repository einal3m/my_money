require_relative 'config/db'
require 'roda'

class MyMoney < Roda
  plugin :multi_route
  plugin :json
  Unreloader.require('routes'){}
  Unreloader.require('queries'){}
  Unreloader.require('models'){}

  # Dir['./routes/*.rb'].each { |f| require f }

  route(&:multi_route)
end
