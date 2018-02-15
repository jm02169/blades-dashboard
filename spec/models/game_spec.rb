require 'rails_helper'

RSpec.describe Game, type: :model do
  user = User.new()

  it "requires a name" do
    game_1 = Game.new(name: "First game", description: "Tuesday night game at Pete's", user: user)
    expect(game_1).to be_valid
    expect(game_1.name).to eq("First game")
    expect(game_1.description).to eq("Tuesday night game at Pete's")
    expect(game_1.user).to eq(user)
    expect(game_1.factions).to_not be_nil
    game_2 = Game.new(description: "This game shouldn't pass", user: user)
    expect(game_2).to_not be_valid
  end

  it "requires a user" do
    game_3 = Game.new(name: "Userless game", description: "Tuesday night game at Pete's")
    expect(game_3).to_not be_valid
  end

  it "can create default factions" do
    game_1 = Game.create!(name: "First game", description: "Tuesday night game at Pete's", user: user, default_factions: 1)
    expect(game_1).to be_valid
    expect(game_1.factions[0].name).to eq('The Billhooks')
    game_2 = Game.create!(name: "First game", description: "Tuesday night game at Pete's", user: user, default_factions: 0)
    expect(game_2.factions[0]).to be(nil)

  end
end
