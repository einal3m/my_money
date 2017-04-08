require_relative 'config/db'
require 'roda'

class MyMoney < Roda
  plugin :multi_route
  plugin :json
  plugin :halt
  plugin :error_handler

  Unreloader.require('routes') {} if defined?(Unreloader)
  Unreloader.require('queries') {} if defined?(Unreloader)
  Unreloader.require('models') {} if defined?(Unreloader)

  route(&:multi_route)

  error do |error|
    if error.class == Sequel::ValidationFailed
      request.halt(422, errors: build_validation_error(error.errors))
    end

    request.halt(500, type: error.class.to_s, message: error.to_s, stack: error.backtrace)
  end

  def build_validation_error(errors)
    errors.map do |key, value|
      "#{key} #{value.join(',')}"
    end
  end
end
