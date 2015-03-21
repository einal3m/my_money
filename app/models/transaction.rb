#
#  Transaction
#
#  id: int, primary key
#  date: date
#  fitid: string
#  memo: string
#  amount: decimal
#  account_id: int, foreign key
#  category_id: int, foreign key, ('I', 'E' or 'T')
#  subcategory_id: int foreign key
#
class Transaction < ActiveRecord::Base
  # model relationships
  belongs_to :account
  belongs_to :category
  belongs_to :subcategory
  belongs_to :reconciliation

  # validations
  validates :date, presence: true
  validates :account_id, presence: true
  validates :amount, presence: true, numericality: true

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
