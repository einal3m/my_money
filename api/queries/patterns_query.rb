class PatternsQuery
  def initialize(account)
    @account = account
  end

  def execute
    { patterns: PatternSerializer.new(@account.patterns).serialize }
  end
end
