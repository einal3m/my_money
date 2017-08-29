class Pattern < Sequel::Model
  plugin :validation_helpers

  many_to_one :account
  many_to_one :category
  many_to_one :subcategory

  def validate
    super
    validates_presence [:match_text, :account, :category]
  end
end
