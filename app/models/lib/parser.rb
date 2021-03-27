# frozen_string_literal: true

module Lib
  class Parser
    private

    def parse_iso_date(date)
      Date.iso8601(date)
    end

    def parse_date(date)
      Date.parse(date)
    end

    def parse_amount(amount)
      (amount.tr('$,', '').gsub(/\s+/, '').to_f * 100).round
    end

    def parse_debit(amount)
      -parse_amount(amount).abs if amount
    end

    def parse_credit(amount)
      parse_amount(amount).abs if amount
    end
  end
end
