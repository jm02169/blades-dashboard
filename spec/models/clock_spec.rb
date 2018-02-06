require 'rails_helper'

RSpec.describe Clock, type: :model do
  user = User.new()
  game = Game.new(name: "Test game please ignore", user: user)

  it "requires a name" do
    clock_1 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 4, ticks: 1)
    expect(clock_1).to be_valid
    expect(clock_1.name).to eq("Testing Clocks")
    expect(clock_1.description).to eq("A clock to test clocks")
    expect(clock_1.segments).to eq(4)
    expect(clock_1.ticks).to eq(1)
    clock_2 = Clock.new(description: "This clock should fail", game: game, segments: 4, ticks: 1)
    expect(clock_2).to_not be_valid
  end
  it "requires segments" do
    clock_3 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, ticks: 1)
    expect(clock_3).to_not be_valid
  end

  it "defaults ticks to 0" do
    clock_4 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 4)
    expect(clock_4.ticks).to eq(0)
  end

  it "requires ticks and segments to be valid integers" do
    clock_5 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 4.4, ticks: 1)
    expect(clock_5).to_not be_valid
    clock_6 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 4, ticks: 1.2)
    expect(clock_6).to_not be_valid
    clock_7 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 'a', ticks: 1)
    expect(clock_7).to_not be_valid
    clock_8 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 4, ticks: 'a')
    expect(clock_8).to_not be_valid
    clock_9 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 0, ticks: 1)
    expect(clock_9).to_not be_valid
    clock_10 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 4, ticks: -1)
    expect(clock_10).to_not be_valid
    clock_11 = Clock.new(name: "Testing Clocks", description: "A clock to test clocks", game: game, segments: 13, ticks: 1)
    expect(clock_11).to_not be_valid
  end

end
