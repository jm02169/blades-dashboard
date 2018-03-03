require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:user) { User.create!(email: 'test@test.com', password: "qwerty", sign_in_count: 1) }
  let!(:game) { Game.create!(name: 'Game One', description: "Test game", user: user)}
  let!(:faction) { Faction.create!(name: "The Bloodletters", description: "Gang of leviathan blood sellers", game: game)}
  let!(:clock) { Clock.create!(name: 'Clock One', description: "This describes clock one", segments: 6, ticks: 2, game: game, faction: faction)}

  before :each do
    login_with user
  end

  describe "GET#index" do

  end
end
