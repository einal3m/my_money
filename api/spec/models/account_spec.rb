require_relative '../../models/account'

RSpec.describe Account, type: :model do
  let(:name) { 'My Account' }
  let(:bank) { 'My Bank' }
  let(:account_type) { AccountType::SAVINGS }
  let(:starting_balance) { 2 }
  let(:starting_date) { '2016-12-19' }
  let(:ticker) { 'MMM' }
  let(:limit) { 3 }
  let(:term) { 4 }
  let(:interest_rate) { 1.11 }

  let(:account) do
    Account.new(
      name: name,
      bank: bank,
      account_type: account_type,
      starting_balance: starting_balance,
      starting_date: starting_date,
      ticker: ticker,
      limit: limit,
      term: term,
      interest_rate: interest_rate
    )
  end

  # xit 'has a valid factory' do
  #   a = FactoryGirl.create(:account)
  #
  #   expect(a).to be_valid
  #   expect(a).to be_a(Account)
  # end
  #
  # xdescribe 'defaults' do
  #   it 'to zero starting balance' do
  #     expect(Account.new.starting_balance).to eq(0)
  #   end
  # end

  describe 'validate' do
    context 'is invalid without a name' do
      let(:name) { nil }
      it('should have error') do
        expect(account.valid?).to eq(false)
        expect(account.errors).to eq(name: ['is not present'])
      end
    end

    context 'is invalid without an account_type' do
      let(:account_type) { nil }
      it('should have error') do
        expect(account.valid?).to eq(false)
        expect(account.errors).to eq(account_type: ['is not present'])
      end
    end

    context 'is valid without a bank' do
      let(:bank) { nil }
      it('should not have error') do
        expect(account.valid?).to eq(true)
      end
    end

    describe 'savings account' do
      let(:account_type) { AccountType::SAVINGS }
      context 'is invalid without a starting balance' do
        let(:starting_balance) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(starting_balance: ['is not present'])
        end
      end

      context 'is invalid without a starting date' do
        let(:starting_date) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(starting_date: ['is not present'])
        end
      end

      context 'is invalid if starting balance is not a number' do
        let(:starting_balance) { 'hello' }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(starting_balance: ['is not a number'])
        end
      end

      context 'is valid without a ticker, interest_rate, term, limit' do
        let(:ticker) { nil }
        let(:limit) { nil }
        let(:term) { nil }
        let(:interest_rate) { nil }
        it('should not have error') do
          expect(account.valid?).to eq(true)
        end
      end
    end

    describe 'share account' do
      let(:account_type) { AccountType::SHARE }
      context 'is invalid without a ticker' do
        let(:ticker) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(ticker: ['is not present'])
        end
      end

      context 'is valid without a starting_balance, starting_date, interest_rate, term, limit' do
        let(:starting_balance) { nil }
        let(:starting_date) { nil }
        let(:limit) { nil }
        let(:term) { nil }
        let(:interest_rate) { nil }
        it('should not have error') do
          expect(account.valid?).to eq(true)
        end
      end
    end

    describe 'loan account' do
      let(:account_type) { AccountType::LOAN }
      context 'is invalid without a limit' do
        let(:limit) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(limit: ['is not present'])
        end
      end

      context 'is invalid if limit is not a number' do
        let(:limit) { 'hello' }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(limit: ['is not a number'])
        end
      end

      context 'is invalid without a term' do
        let(:term) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(term: ['is not present'])
        end
      end

      context 'is invalid if term is not a number' do
        let(:term) { 'hello' }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(term: ['is not a number'])
        end
      end

      context 'is invalid without an interest_rate' do
        let(:interest_rate) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(interest_rate: ['is not present'])
        end
      end

      context 'is invalid if interest_rate is not a number' do
        let(:interest_rate) { 'hello' }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(interest_rate: ['is not a number'])
        end
      end

      context 'is invalid without an starting_date' do
        let(:starting_date) { nil }
        it('should have error') do
          expect(account.valid?).to eq(false)
          expect(account.errors).to eq(starting_date: ['is not present'])
        end
      end

      context 'is valid without a ticker, interest_rate, term, limit' do
        let(:ticker) { nil }
        let(:starting_balance) { nil }
        it('should not have error') do
          expect(account.valid?).to eq(true)
        end
      end
    end
  end
end
