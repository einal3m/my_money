#
#  Account
#
#  id: int, primary key
#  account_type_id: int, foreign key
#  name: string
#  bank: string
#  starting_balance: decimal
#  starting_date: date
#
class Account < ActiveRecord::Base
  # model relationships
  belongs_to :account_type
  has_many :transactions
  has_many :patterns
  has_many :reconciliations

  # validations
  validates :account_type_id, presence: true
  validates :name, presence: true
  validates :starting_balance, presence: true, numericality: true, if: :savings?
  validates :starting_date, presence: true, if: :savings?
  validates :ticker, presence: true, if: :share?

  def savings?
    account_type_id == 1
  end

  def share?
    account_type_id == 2
  end

  # defaults
  after_initialize :init

  def init
    self.starting_balance ||= 0.0
  end

  # current_balance gets the balance of the last transaction, or if none
  # exist, then the starting balance of the account
  def current_balance
    # if there are no transactions, return starting balance of account
    return starting_balance if transactions.length == 0

    # otherwise return balance of last transaction
    transactions.order(date: :asc, id: :asc).last.balance
  end

  # eod_balance gets the end of day balance for this account for the given date
  def eod_balance(date)
    last_transaction = transactions.where('date <= ?', date).date_order.last
    last_transaction.nil? ? starting_balance : last_transaction.balance
  end
end
