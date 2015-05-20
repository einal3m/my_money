require 'rubocop/rake_task'
RuboCop::RakeTask.new

RSpec::Core::RakeTask.new(:myrspec) do |t|
  t.pattern = FileList['./spec/**/*_spec.rb'].exclude('./spec/features/**/*_spec.rb')
end

task myjs: [:jslint, :'jasmine:ci']
task myruby: [:rubocop, :myrspec]
task mycapy: [:'spec:features']

Rake::Task['default'].clear if Rake::Task.tasks.collect(&:name).include?('default')
task default: [:myjs, :myruby, :mycapy]
