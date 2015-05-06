def build_attributes(*args)
  FactoryGirl.build(*args).attributes.delete_if do |k, _v|
    ['id', 'created_at', 'updated_at'].member?(k)
  end
end
