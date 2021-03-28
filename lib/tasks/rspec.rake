
begin
  require 'rspec/core/rake_task'

  namespace(:rspec) do
    RSpec::Core::RakeTask.new(:models) do |t|
      t.rspec_opts = "--tag type:model"
    end
    RSpec::Core::RakeTask.new(:features) do |t|
      t.rspec_opts = "--tag type:feature"
    end
    RSpec::Core::RakeTask.new(:controllers) do |t|
      t.rspec_opts = "--tag type:controller"
    end
    RSpec::Core::RakeTask.new(:lib) do |t|
      t.pattern = "spec/lib/**/*_spec.rb"
    end

    task :unit => [:models, :controllers, :lib]
  end
rescue LoadError
  # no rspec available
end