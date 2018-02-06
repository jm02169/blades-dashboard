require 'rails_helper'

require 'rails_helper'

RSpec.describe Faction, type: :model do
  user = User.new()
  game = Game.new(name: "Test game please ignore", user: user)
  faction = Faction.new(name: "Lord Scurlock", description: "He is his own faction", game: game)

  it "requires a name" do
    npc = Npc.new(name:"Lord Scurlock", description: "Centuries-old Vampire", picture: "http://placebear.com/200/200/", game: game, faction: faction)
    expect(npc).to be_valid
    expect(npc.name).to eq("Lord Scurlock")
    expect(npc.description).to eq("Centuries-old Vampire")
    expect(npc.picture).to eq("http://placebear.com/200/200/")
    expect(npc.faction.description).to eq("He is his own faction")

    npc_2 = npc = Npc.new(description: "Centuries-old Vampire", picture: "http://placebear.com/200/200/", game: game, faction: faction)

    expect(npc).to_not be_valid
  end

  it "does not require a description" do
    npc = Npc.new(name:"Lord Scurlock", picture: "http://placebear.com/200/200/", game: game, faction: faction)
    expect(npc).to be_valid
  end

  it "does not require a picture" do
    npc = Npc.new(name:"Lord Scurlock", description: "Centuries-old Vampire", game: game, faction: faction)
    expect(npc).to be_valid
  end

  it "does not require a faction" do
    npc = Npc.new(name:"Lord Scurlock", description: "Centuries-old Vampire", picture: "http://placebear.com/200/200/", game: game)
    expect(npc).to be_valid
  end
end
