require 'ruby-enum'

class AccountType
  include Ruby::Enum

  define :SAVINGS, 'savings'
  define :SHARE, 'share'
  define :LOAN, 'loan'
end
