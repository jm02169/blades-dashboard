require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:user) { User.create!(email: 'test@test.com', password: "qwerty", sign_in_count: 1) }
  let!(:game) { Game.create!(name: 'Game One', description: "Test game", user: user)}
  let!(:faction) { Faction.create!(name: "The Bloodletters", description: "Gang of leviathan blood sellers", game: game)}
  let!(:clock) { Clock.create!(name: 'Clock One', description: "This describes clock one", segments: 6, ticks: 2, game: game, faction: faction)}
  let!(:comment1) {Comment.create!(body: "game comment", game_id: game.id)}
  let!(:comment2) {Comment.create!(body: "second game comment", game_id: game.id)}

  before :each do
    login_with user
  end

  describe "GET#index" do
    it "should return a list of comments for a specific game" do
      get :index, params: {game_id: game.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json[0]["body"]).to eq comment1.body
      expect(returned_json[1]["body"]).to eq comment2.body
      expect(returned_json[0]["game_id"]).to eq comment1.game_id
      expect(returned_json[1]["game_id"]).to eq comment1.game_id
    end
  end
end
