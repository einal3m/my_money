env = ENV['RACK_ENV'] || 'development'
dev = (env == 'development')

require 'rack/unreloader'
Unreloader = Rack::Unreloader.new(:subclasses=>%w'Roda Sequel::Model', :reload=>dev){MyMoney}
Unreloader.require './my_money.rb'
run(dev ? Unreloader : MyMoney.freeze.app)