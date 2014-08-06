require "rails_helper"

RSpec.describe ReconciliationsController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/reconciliations").to route_to("reconciliations#index")
    end

    it "routes to #new" do
      expect(:get => "/reconciliations/new").to route_to("reconciliations#new")
    end

    it "routes to #show" do
      expect(:get => "/reconciliations/1").to route_to("reconciliations#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/reconciliations/1/edit").to route_to("reconciliations#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/reconciliations").to route_to("reconciliations#create")
    end

    it "routes to #update" do
      expect(:put => "/reconciliations/1").to route_to("reconciliations#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/reconciliations/1").to route_to("reconciliations#destroy", :id => "1")
    end

    it "routes to #transactions" do
      expect(:get => "/reconciliations/1/transactions").to route_to("reconciliations#transactions", :id => "1")
    end
    
  end
end
