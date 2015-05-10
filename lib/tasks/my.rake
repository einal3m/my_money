require 'rubocop/rake_task'
RuboCop::RakeTask.new

task :myjs => [:jslint, :'jasmine:ci']
task :myruby => [:'rubocop', :'spec:models', :'spec:controllers', :'spec:lib']
task :mycapy => [:'spec:features']

Rake::Task["default"].clear if Rake::Task.tasks.collect(&:name).include?("default")
task :default => [:myjs, :myruby, :mycapy]
