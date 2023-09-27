# frozen_string_literal: true

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
class Transaction < ApplicationRecord
  include ClassyEnum::ActiveRecord
  classy_enum_attr :transaction_type

  # model relationships
  belongs_to :account
  belongs_to :category, optional: true
  belongs_to :subcategory, optional: true
  belongs_to :reconciliation, optional: true
  belongs_to :bank_statement, optional: true

  belongs_to :matching_transaction, class_name: 'Transaction', optional: true

  # validations
  validates :date, presence: true
  validates :amount, presence: true, numericality: true
  validates :transaction_type, presence: true
  validate :matching_transaction_must_match
  validates :category_id, presence: true, if: :subcategory_id?
  validates :matching_transaction_id, absence: true, if: :category_id?

  # common lookups
  scope :unreconciled, lambda { |account|
    where(account:, reconciliation: nil)
  }
  scope :date_order, -> { order(date: :asc, id: :asc) }
  scope :reverse_date_order, -> { order(date: :desc, id: :desc) }
  scope :search_by_date, lambda { |date_range|
    where('date >= ? and date <= ?', date_range.from_date, date_range.to_date)
  }
  scope :search_by_dates, lambda { |from_date, to_date|
    where('date >= ? and date <= ?', from_date, to_date)
  }
  scope :for_account_type, lambda { |account_type|
    joins(:account).where(accounts: { account_type: account_type.new.to_s })
  }
  scope :for_banking_accounts, lambda {
    joins(:account).where(accounts: { account_type: [AccountType::Savings.new.to_s, AccountType::Loan.new.to_s] })
  }
  scope :search_by_description, lambda { |description|
    where('memo like ? or notes like ?', "%#{description}%", "%#{description}%")
  }
  scope :find_matching, lambda { |date, amount, account|
    where(
      amount: -amount,
      date:,
      matching_transaction_id: nil
    ).where.not(account:)
  }

  # non-persistant attributes
  attr_accessor :add_to_reconciliation

  # set defaults for extra attributes
  after_initialize :defaults

  before_create :calculate_balance_on_create
  after_create :match_transaction
  before_update :unmatch_transactions

  after_update :calculate_balance_on_update, :match_transaction
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
    matching_transaction_must_not_be_already_matched
  end

  def matching_transaction_must_not_be_already_matched
    return if matching_transaction_id == matching_transaction.id && matching_transaction.matching_transaction_id == id
    return if matching_transaction.matching_transaction_id.nil?

    errors.add(:matching_transaction_id, 'must not already be matched')
  end

  def matching_transaction_must_have_opposite_amount
    errors.add(:matching_transaction_id, 'must have the opposite amount') if amount != -matching_transaction.amount
  end

  def matching_transaction_must_have_same_date
    errors.add(:matching_transaction_id, 'must have the same date') if date != matching_transaction.date
  end

  def matching_transaction_must_be_from_different_account
    return unless account_id == matching_transaction.account_id

    errors.add(:matching_transaction_id, 'must be in a different account')
  end

  def match_transaction
    return if matching_transaction_id.nil?

    matching_transaction.update_column(:matching_transaction_id, id)
  end

  def unmatch_transactions
    return unless changes.key?(:matching_transaction_id)
    return if changes[:matching_transaction_id][0].nil?

    old_matching_transaction = Transaction.find(changes[:matching_transaction_id][0])
    old_matching_transaction.update_column(:matching_transaction_id, nil)
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
    return unless saved_changes.key?(:date) || saved_changes.key?(:amount)

    # determine the earliest date that has changed
    from_date = date
    from_date = saved_changes[:date].min if saved_changes.key?(:date)

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
