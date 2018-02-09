require 'rails_helper'

RSpec.describe Api::V1::ClocksController, type: :controller do
  let!(:user) { User.create!(email: 'test@test.com', password: "qwerty", sign_in_count: 1) }
  let!(:game) { Game.create!(name: 'Game One', description: "Test game", user: user)}
  let!(:faction) { Faction.create!(name: "The Bloodletters", description: "Gang of leviathan blood sellers", game: game)}
  let!(:clock) { Clock.create!(name: 'Clock One', description: "This describes clock one", segments: 6, ticks: 2, game: game, faction: faction)}

  describe "GET#index" do
    it "should return a list of clocks for a specific game" do
      get :index, params: {game_id: game.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json[0]["id"]).to eq clock.id
      expect(returned_json[0]["name"]).to eq clock.name
      expect(returned_json[0]["description"]).to eq clock.description
      expect(returned_json[0]["segments"]).to eq clock.segments
      expect(returned_json[0]["ticks"]).to eq clock.ticks
      expect(returned_json[0]["game"]).to eq nil
      expect(returned_json[0]["faction_name"]).to eq clock.faction.name
      expect(returned_json[0]["faction_id"]).to eq clock.faction.id
      expect(returned_json[0]["npc_name"]).to eq nil


    end
  end
end
