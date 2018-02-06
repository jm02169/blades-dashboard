require 'rails_helper'

require 'rails_helper'

RSpec.describe Faction, type: :model do
  user = User.new()
  game = Game.new(name: "Test game please ignore", user: user)
  faction = Faction.new(name: "Lord Scurlock", description: "He is his own faction", game: game)
  npc = Npc.new(name: "Lord Scurlock", description: "Centuries-old Vampire", game: game)
  clock = Clock.new(name: "Lord Scurlock pays debt to Setarra", description: "He fulfills his debt", segments: 8, ticks: 1, game: game)

  it "requires a body" do
    comment = Comment.new(body: "Don't mess with Lord Scurlock")
    expect(comment).to be_valid
    comment = Comment.new()
    expect(comment).to_not be_valid
  end

  it "can be assigned to a game" do
    comment = Comment.create!(body: "Don't mess with Lord Scurlock", game: game)
    expect(comment).to be_valid
    expect(comment.game.name).to eq("Test game please ignore")
    expect(game.comments.first).to eq(comment)
  end

  it "can be assigned to a faction" do
    comment = Comment.create!(body: "Don't mess with Lord Scurlock", faction: faction)
    expect(comment).to be_valid
    expect(comment.faction.name).to eq("Lord Scurlock")
    expect(faction.comments.first).to eq(comment)

  end

  it "can be assigned to an npc" do
    comment = Comment.create!(body: "Don't mess with Lord Scurlock", npc: npc)
    expect(comment).to be_valid
    expect(comment.npc.name).to eq("Lord Scurlock")
    expect(npc.comments.first).to eq(comment)

  end

  it "can be assigned to a clock" do
    comment = Comment.create!(body: "Don't mess with Lord Scurlock", clock: clock)
    expect(comment).to be_valid
    expect(comment.clock.name).to eq("Lord Scurlock pays debt to Setarra")
    expect(clock.comments.first).to eq(comment)
  end

end
