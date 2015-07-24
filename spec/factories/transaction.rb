FactoryGirl.define do

  factory :transaction do |f|
    f.date "2014-03-03"
    f.memo "This is a Memo"
    f.notes "This is a Note"
    f.amount 555
    f.fitid "This is a fitid"
    f.transaction_type 'bank_transaction'
    account
    category
    subcategory
    #reconciliation
  end

  factory :transaction_invalid, parent: :transaction do |f|
    f.date nil
  end

end
