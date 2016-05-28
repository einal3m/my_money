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
      ((amount.gsub(/\s+/, '').to_f) * 100).round
    end
  end
end