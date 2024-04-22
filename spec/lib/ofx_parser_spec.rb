# frozen_string_literal: true

require 'rails_helper'

describe 'OfxParser' do
  it 'returns the transactions from the OFX file' do
    file = Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/test.ofx'))

    parser = Lib::OfxParser.new file
    transactions = parser.transactions

    expect(transactions.length).to eq(5)

    expect(transactions[0].memo).to eq('VILLAGE CINEMA')
    expect(transactions[0].date).to eq(Date.parse('2014-07-05'))
    expect(transactions[0].amount).to eq(-5500)

    expect(transactions[1].memo).to eq('COLES SUPERMARKETS')
    expect(transactions[1].date).to eq(Date.parse('2014-07-04'))
    expect(transactions[1].amount).to eq(-7476)

    expect(transactions[2].memo).to eq('MCDONALDS')
    expect(transactions[2].date).to eq(Date.parse('2014-07-03'))
    expect(transactions[2].amount).to eq(-1920)

    expect(transactions[3].memo).to eq('PAYMENT RECEIVED')
    expect(transactions[3].date).to eq(Date.parse('2014-07-03'))
    expect(transactions[3].amount).to eq(326_610)

    expect(transactions[4].memo).to eq('TARGET')
    expect(transactions[4].date).to eq(Date.parse('2014-07-03'))
    expect(transactions[4].amount).to eq(-1699)
  end
end
