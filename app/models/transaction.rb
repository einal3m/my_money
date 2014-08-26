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
	scope :unreconciled, ->(reconciliation) { where(account: reconciliation.account, reconciliation: nil).order(date: :asc) }

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

    	# find the last transaction before this one
    	# if none exist, use the account starting balance
    	prev_transaction = Transaction.where(account: self.account).where("date <= ?", self.date).order(date: :asc, id: :asc).last
    	balance = prev_transaction.nil? ? self.account.starting_balance : prev_transaction.balance

    	# set the balance of the new transaction
   		balance = balance + self.amount
   		self.balance = balance

   		# find the transactions following and update their balances
   		Transaction.where(account: self.account).where("date > ?", self.date).order(date: :asc).each do |t|
   		  balance = balance + t.amount
   		  t.update_column(:balance,  balance)
   		end

    end

    # after a transaction is deleted, recalculate all later transactions
    def calculate_balance_on_destroy
    	# find the last transaction before this one
    	# if none exist, use the account starting balance
    	prev_transaction = Transaction.where(account: self.account).where("date < ?", self.date).order(date: :asc, id: :asc).last
    	balance = prev_transaction.nil? ? self.account.starting_balance : prev_transaction.balance

   		# find the transactions following and update their balances
   		Transaction.where(account: self.account).where("date >= ?", self.date).order(date: :asc, id: :asc).each do |t|
   		  balance = balance + t.amount
   		  t.update_column(:balance,  balance)
   		end

    end

    # when a transaction is updated, re-calculate the balance for this transaction
    # and all those that follow, only when either date or amount is changed
    def calculate_balance_on_update

      # only update balance if either date or amount is changed
      if self.changes.has_key?(:date) or self.changes.has_key?(:amount) then

      	# determine the earliest date that has changed
      	from_date = self.date
      	if self.changes.has_key?(:date) then
      	  from_date = self.changes[:date].min
      	end

    	# find the last transaction before the changes
    	# if none exist, use the account starting balance
    	prev_transaction = Transaction.where(account: self.account).where("date < ?", from_date).order(date: :asc, id: :asc).last
    	balance = prev_transaction.nil? ? self.account.starting_balance : prev_transaction.balance

   		# find the transactions following and update their balances
   		Transaction.where(account: self.account).where("date >= ?", from_date).order(date: :asc, id: :asc).each do |t|
   		  balance = balance + t.amount
   		  t.update_column(:balance,  balance)
   		end

      end
    end


end
