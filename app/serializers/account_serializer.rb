class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :bank, :starting_balance, :starting_date, :current_balance

    def starting_balance
    	(object.starting_balance*100).to_i
    end

    def current_balance
    	(object.current_balance*100).to_i
    end
end
