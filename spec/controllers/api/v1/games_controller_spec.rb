require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do

  let!(:user) { User.create!(email: 'test@test.com', password: "qwerty", sign_in_count: 1) }
  let!(:game) { Game.create!(name: 'Game One', description: "Test game", user: user)}

  describe "GET#index" do
    it "should return a list of games" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json[0]["name"]).to eq "Game One"
      expect(returned_json[0]["description"]).to eq "Test game"

    end
  end
end
