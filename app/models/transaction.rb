#
#  Transaction
#
#  id: int, primary key
#  date: date
#  fitid: string
#  memo: string
#  notes: string
#  amount: int (cents)
#  account_id: int, foreign key
#  category_id: int, foreign key
#  subcategory_id: int foreign key
#  transaction_type: string
#  matching_transaction_id: integer foreign key
#
class Transaction < ActiveRecord::Base
  include ClassyEnum::ActiveRecord
  classy_enum_attr :transaction_type

  # model relationships
  belongs_to :account
  belongs_to :category
  belongs_to :subcategory
  belongs_to :reconciliation
  belongs_to :bank_statement

  belongs_to :matching_transaction, class_name: 'Transaction', foreign_key: 'matching_transaction_id'

  # validations
  validates :date, presence: true
  validates :account_id, presence: true
  validates :amount, presence: true, numericality: true
  validates :transaction_type, presence: true
  validate :matching_transaction_must_match

  # common lookups
  scope :unreconciled, ->(account) {
    where(account: account, reconciliation: nil)
  }
  scope :date_order, -> { order(date: :asc, id: :asc) }
  scope :reverse_date_order, -> { order(date: :desc, id: :desc) }
  scope :find_by_date, ->(date_range) {
    where('date >= ? and date <= ?', date_range.from_date, date_range.to_date)
  }
  scope :find_by_dates, ->(from_date, to_date) {
    where('date >= ? and date <= ?', from_date, to_date)
  }
  scope :for_account_type, ->(account_type) {
    joins(:account).where(accounts: { account_type: account_type.new.to_s })
  }
  scope :for_banking_accounts, -> {
    joins(:account).where(accounts: { account_type: [AccountType::Savings.new.to_s, AccountType::Loan.new.to_s] })
  }
  scope :find_by_description, ->(description) {
    where('memo like ? or notes like ?', '%' + description + '%', '%' + description + '%')
  }

  # non-persistant attributes
  attr_accessor :add_to_reconciliation

  # set defaults for extra attributes
  after_initialize :defaults
  before_create :calculate_balance_on_create
  after_update :calculate_balance_on_update
  after_destroy :calculate_balance_on_destroy

  protected

  def defaults
    self.add_to_reconciliation = false
  end

  def matching_transaction_must_match
    return if matching_transaction_id.nil?
    matching_transaction_must_be_from_different_account
    matching_transaction_must_have_same_date
    matching_transaction_must_have_opposite_amount
  end

  def matching_transaction_must_have_opposite_amount
    errors.add(:matching_transaction_id, 'must have the opposite amount') if amount != -matching_transaction.amount
  end

  def matching_transaction_must_have_same_date
    errors.add(:matching_transaction_id, 'must have the same date') if date != matching_transaction.date
  end

  def matching_transaction_must_be_from_different_account
    errors.add(:matching_transaction_id, 'must be in a different account') if account_id == matching_transaction.account_id
  end

  # when a new transaction is created, calculate the running balance for the
  # new transaction, and all those that follow
  def calculate_balance_on_create
    new_balance = get_new_balance(date)

    # set the balance of the new transaction
    new_balance += amount
    self.balance = new_balance

    update_balance_for_following(date + 1.day, new_balance)
  end

  # after a transaction is deleted, recalculate all later transactions
  def calculate_balance_on_destroy
    new_balance = get_new_balance(date - 1.day)
    update_balance_for_following(date, new_balance)
  end

  # when a transaction is updated, re-calculate the balance for this transaction
  # and all those that follow, only when either date or amount is changed
  def calculate_balance_on_update
    # only update balance if either date or amount is changed
    return unless changes.key?(:date) || changes.key?(:amount)

    # determine the earliest date that has changed
    from_date = date
    from_date = changes[:date].min if changes.key?(:date)

    new_balance = get_new_balance(from_date - 1.day)
    update_balance_for_following(from_date, new_balance)
  end

  # update balance for all transactions from the given date
  def update_balance_for_following(from_date, new_balance)
    account.transactions.where('date >= ?', from_date).date_order.each do |t|
      new_balance += t.amount
      t.update_column(:balance, new_balance)
    end
  end

  # get balance of last transaction that is not affected by change
  def get_new_balance(search_date)
    txn = account.transactions.where('date <= ?', search_date).date_order.last
    txn.nil? ? account.starting_balance : txn.balance
  end
end
