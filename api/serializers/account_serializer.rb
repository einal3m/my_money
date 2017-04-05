class AccountSerializer
  ATTRIBUTES = [
    :id, :name, :bank, :starting_balance, :starting_date,
    :ticker, :account_type, :limit, :term, :interest_rate
  ].freeze

  def initialize(accounts)
    @accounts = accounts
  end

  def serialize
    @accounts.map do |account|
      account.values.select do |key, _val|
        ATTRIBUTES.include? key
      end
    end
  end
end
