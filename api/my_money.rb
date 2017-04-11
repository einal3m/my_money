require_relative 'config/db'
require 'roda'

class MyMoney < Roda
  plugin :multi_route
  plugin :json
  plugin :halt
  plugin :error_handler
  plugin :all_verbs
  plugin :drop_body

  ['routes', 'models', 'queries', 'commands', 'serializers'].each do |paths|
    Unreloader.require(paths) {}
  end if defined?(Unreloader)

  route(&:multi_route)

  error do |error|
    if error.class == Sequel::ValidationFailed
      request.halt(422, errors: build_validation_error(error.errors))
    elsif error.class == Sequel::NoMatchingRow
      request.halt(404, '')
    end
    request.halt(500, type: error.class.to_s, message: error.to_s, stack: error.backtrace)
  end

  def build_validation_error(errors)
    errors.map do |key, value|
      "#{key} #{value.join(',')}"
    end
  end

  def request_body(request)
    body_string = request.body.read || ''

    @body_hash = body_string.empty? ? {} : JSON.parse(body_string, symbolize_names: true)
  end
end
