if !User.first
  User.create!(email:"admin@blades-dashboard.com", password: "qwerty")
end

if !Game.first
  Game.create!(name: "First Game", description: "My first Blades in the Dark game", user: User.first)
  Game.create!(name: "Second Game", description: "My second Blades in the Dark game", user: User.first)
end

if !Faction.first
  10.times do
    Faction.create!(name: "The " + Faker::Hipster.word + ' gang', description: Faker::Hipster.sentences(3).join(' '), faction_status: Faker::Number.between(-3,3), game: Game.first)
    Faction.create!(name: Faker::Hipster.word + ' gang', description: Faker::Hipster.sentences(3).join(' '), faction_status: Faker::Number.between(-3,3), game: Game.second)
  end
end

if !Npc.first
  50.times do
    game = Game.order("RANDOM()").first
    npc = Npc.create!(name: Faker::LeagueOfLegends.champion, game: game, faction: game.factions.order("RANDOM()").first)
  end
end

if !Clock.first
  5.times do
    faction = Faction.order("RANDOM()").first
    npc = Npc.order("RANDOM()").first
    Clock.create!(name: faction.name + " has a clock for something", description: faction.name + 'is planning to do stuff and this clock measures the progress', faction: faction, game: faction.game, segments: Faker::Number.between(8,12), ticks: Faker::Number.between(0,7))
    Clock.create!(name: npc.name + " has a clock for something", description: npc.name + " has a clock that measure the progress of something", game: npc.game, npc: npc, segments: Faker::Number.between(8,12), ticks: Faker::Number.between(0,7))
    Clock.create!(name: "General clock", description: "This is a general clock not attached to an NPC or faction", game: faction.game, segments: Faker::Number.between(8,12), ticks: Faker::Number.between(0,7))

  end
end
