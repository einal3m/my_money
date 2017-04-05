require_relative 'config/db'
require 'roda'

class MyMoney < Roda
  plugin :multi_route
  plugin :json

  Unreloader.require('routes') {} if defined?(Unreloader)
  Unreloader.require('queries') {} if defined?(Unreloader)
  Unreloader.require('models') {} if defined?(Unreloader)

  route(&:multi_route)
end
