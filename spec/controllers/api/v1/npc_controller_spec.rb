require 'rails_helper'

RSpec.describe Api::V1::NpcsController, type: :controller do
  let!(:user) { User.create!(email: 'test@test.com', password: "qwerty", sign_in_count: 1) }
  let!(:game) { Game.create!(name: 'Game One', description: "Test game", user: user)}
  let!(:faction) { Faction.create!(name: "The Bloodletters", description: "Gang of leviathan blood sellers", game: game)}
  let!(:npc) { Npc.create!(name: 'Arcy', description: "Used to work on a Leviathan ship", game: game, faction: faction)}

  before :each do
    login_with user
  end

  describe "GET#index" do
    it "should return a list of npcs for a specific game" do
      get :index, params: {game_id: game.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json[0]["id"]).to eq npc.id
      expect(returned_json[0]["name"]).to eq npc.name
      expect(returned_json[0]["description"]).to eq npc.description
      expect(returned_json[0]["game"]).to eq nil
      expect(returned_json[0]["faction_name"]).to eq npc.faction.name
      expect(returned_json[0]["faction_id"]).to eq npc.faction.id
    end
  end
  describe "GET#show" do
    it "should return a the details of a specific npc" do
      get :show, params: { id: npc.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["id"]).to eq npc.id
      expect(returned_json["name"]).to eq npc.name
      expect(returned_json["description"]).to eq npc.description
      expect(returned_json["game"]).to eq nil
      expect(returned_json["faction_name"]).to eq npc.faction.name
      expect(returned_json["faction_id"]).to eq npc.faction.id
    end
  end
end
