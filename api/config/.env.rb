ENV['RACK_ENV'] ||= 'development'

ENV['DATABASE_URL'] ||= "sqlite://db/#{ENV['RACK_ENV']}.sqlite3"
