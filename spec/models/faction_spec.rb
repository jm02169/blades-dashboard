require 'rails_helper'

RSpec.describe Faction, type: :model do
  user = User.new()
  game = Game.new(name: "Test game please ignore", user: user)

  it "Requires a name" do
    faction_1 = Faction.new(name: "The Bloodletters", description: "Gang of Leviathan Blood sellers", faction_status: '-1', game: game)
    expect(faction_1).to be_valid
    expect(faction_1.name).to eq("The Bloodletters")
    expect(faction_1.description).to eq("Gang of Leviathan Blood sellers")
    expect(faction_1.faction_status).to eq(-1)
    faction_2 = Faction.new(description: "Gang of Leviathan Blood sellers", faction_status: '-1', game: game)
    expect(faction_2).to_not be_valid
  end

  it "Defaults to a faction status of 0" do
    faction_3 = Faction.new(name: "The Bloodletters", description: "Gang of Leviathan Blood sellers", game: game)
    expect(faction_3).to be_valid
    expect(faction_3.faction_status).to eq(0)
  end

  it "Doesn't require a description" do
    faction_4 = Faction.new(name: "The Bloodletters", faction_status: '-1', game: game)
    expect(faction_4).to be_valid
  end
end
