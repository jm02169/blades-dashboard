require 'rails_helper'

RSpec.describe Api::V1::FactionsController, type: :controller do
  let!(:user) { User.create!(email: 'test@test.com', password: "qwerty", sign_in_count: 1) }
  let!(:game) { Game.create!(name: 'Game One', description: "Test game", user: user)}
  let!(:faction) { Faction.create!(name: "The Bloodletters", description: "Gang of leviathan blood sellers", faction_status: -2, game: game)}

  before :each do
    login_with user
  end

  describe "GET#index" do
    it "should return a list of factions for a specific game" do
      get :index, params: {game_id: game.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json[0]["id"]).to eq faction.id
      expect(returned_json[0]["name"]).to eq faction.name
      expect(returned_json[0]["description"]).to eq faction.description
      expect(returned_json[0]["faction_status"]).to eq faction.faction_status
      expect(returned_json[0]["game"]).to eq nil
    end
  end
  describe "GET#show" do
    it "should return the details of a specific faction" do
      get :show, params: { id: faction.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["id"]).to eq faction.id
      expect(returned_json["name"]).to eq faction.name
      expect(returned_json["description"]).to eq faction.description
      expect(returned_json["faction_status"]).to eq faction.faction_status
      expect(returned_json["game"]).to eq nil
    end
  end
end
