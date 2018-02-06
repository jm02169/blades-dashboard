require 'rails_helper'

RSpec.describe Game, type: :model do
  user = User.new()

  it "requires a name" do
    game_1 = Game.new(name: "First game", description: "Tuesday night game at Pete's", user: user)
    expect(game_1).to be_valid
    expect(game_1.name).to eq("First game")
    expect(game_1.description).to eq("Tuesday night game at Pete's")
    expect(game_1.user).to eq(user)
    game_2 = Game.new(description: "This game shouldn't pass", user: user)
    expect(game_2).to_not be_valid
  end

  it "requires a user" do
    game_3 = Game.new(name: "Userless game", description: "Tuesday night game at Pete's")
    expect(game_3).to_not be_valid
  end
end
