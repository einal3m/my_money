env = ENV['RACK_ENV'] || 'development'
dev = (env == 'development')

require 'rack/cors'

use Rack::Cors do
  allow do
    origins 'localhost:8090', '127.0.0.1:8090'
    resource('*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options])
  end
end

require 'rack/unreloader'
Unreloader = Rack::Unreloader.new(subclasses: %w(Roda Sequel::Model), reload: dev) { MyMoney }
Unreloader.require './my_money.rb'
run(dev ? Unreloader : MyMoney.freeze.app)
