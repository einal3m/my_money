require_relative '../factories/factory'

RSpec.describe Budget, type: :model do
  let(:account) { Factory.create_account }
  let(:description) { 'budget description' }
  let(:day_of_month) { 10 }
  let(:amount) { 3000 }

  let(:budget) do
    Budget.new(
      account: account,
      description: description,
      day_of_month: day_of_month,
      amount: amount
    )
  end

  describe 'validations' do
    context 'is invalid without an account' do
      let(:account) { nil }
      it('should have error') do
        expect(budget.valid?).to eq(false)
        expect(budget.errors).to eq(account: ['is not present'])
      end
    end

    context 'is invalid without a day of month' do
      let(:day_of_month) { nil }
      it('should have error') do
        expect(budget.valid?).to eq(false)
        expect(budget.errors).to eq(day_of_month: ['is not present'])
      end
    end

    context 'is valid when day of month between 1 and 31' do
      [0, 32].each do |date|
        context "when day_of_month is #{date}" do
          let(:day_of_month) { date }
          it('should have error') do
            expect(budget.valid?).to eq(false)
            expect(budget.errors).to eq(day_of_month: ['must be between 1 and 31'])
          end
        end
      end

      [1, 31].each do |date|
        context "when day_of_month is #{date}" do
          let(:day_of_month) { date }
          it("should not have error when day of month is #{date}") do
            expect(budget.valid?).to eq(true)
          end
        end
      end
    end

    context 'is valid without a description' do
      let(:description) { nil }
      it('should not have error') do
        expect(budget.valid?).to eq(true)
      end
    end

    context 'is invalid without an amount' do
      let(:amount) { nil }
      it('should have error') do
        expect(budget.valid?).to eq(false)
        expect(budget.errors).to eq(amount: ['is not present'])
      end
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      expect(budget.account).to eq(account)
    end
  end
end
