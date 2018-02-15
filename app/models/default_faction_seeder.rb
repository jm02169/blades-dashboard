class DefaultFactionSeeder
  DEFAULT_FACTIONS = [
    {
      name: 'The Billhooks',
      description: 'A tough gang of thugs who prefer hatchets, meat hooks, and pole arms.'
    },
    {
      name: 'Bluecoats',
      description: 'The City Watch of Duskwall. Known as the meanest gang in the city. Corrupt, violent, and cruel.'
    },
    {
      name: 'The Church of Ecstasy',
      description: 'The “state religion” honors the life of the body and abhors the corrupted spirit world. Essentially a secret society.'
    },
    {
      name: 'The Circle of Flame',
      description: 'A refined secret society of antiquarians and scholars; cover for extortion, graft, vice, and murder.'
    },
    {
      name: 'City Council',
      description: 'The elite nobility who run the city government, its treasury, magistrates, and public works.'
    },
    {
      name: 'The Crows',
      description: 'An old gang with new leadership. Known for running illegal games of chance and extortion rackets.'
    },
    {
      name: 'Deathlands Scavengers',
      description: 'Convicts from Ironhook and desperate freelancers who roam the wasteland beyond the lightning barriers.'
    },
    {
      name: 'The Dimmer Sisters',
      description: 'House-bound recluses with an occult reputation.'
    },
    {
      name: 'The Fog Hounds',
      description: 'A crew of rough smugglers looking for a patron.'
    },
    {
      name: 'Gondoliers',
      description: 'The canal boat operators. Venerated by ancient tradition. Said to know occult secrets (many things are submerged in the Dusk).'
    },
    {
      name: 'The Gray Cloaks',
      description: 'A crew of former Bluecoats turned to crime after being framed and expelled from the City Watch.'
    },
    {
      name: 'The Grinders',
      description: 'A vicious gang of former dockers and leviathan blood refinery workers.'
    },
    {
      name: 'The Hive',
      description: 'A guild of legitimate merchants who secretly trade in contraband. Named for their symbol, a golden bee.'
    },
    {
      name: 'The Lampblacks',
      description: 'The former lamp-lighter guild, turned to crime when their services were replaced by electric lights.'
    },
    {
      name: 'Leviathan Hunters',
      description: 'The captains and crews that grapple with titanic demons of the Void Sea to drain their blood for processing into electroplasm.'
    },
    {
      name: 'The Lost',
      description: 'A group of street-toughs and ex-soldiers dedicated to protecting the downtrodden and the hopeless.'
    },
    {
      name: 'Ministry of Preservation',
      description: 'Oversees transportation between cities and the disbursement of food and other vital resources.'
    },
    {
      name: 'The Reconciled',
      description: 'An association of ancient spirits who have not gone feral with the passage of time.'
    },
    {
      name: 'The Red Sashes',
      description: 'Originally a school of ancient Iruvian sword arts, since expanded into criminal endeavors.'
    },
    {
      name: 'Lord Scurlock',
      description: 'An ancient noble, said to be immortal, like the Emperor. Possibly a vampire or sorcerer. Obsessed with the occult.'
    },
    {
      name: 'The Silver Nails',
      description: 'A company of Severosi mercenaries who fought for the Empire in the Unity War. Renowned ghost killers.'
    },
    {
      name: 'Sparkwrights',
      description: 'The engineers who maintain the lightning barriers. Also pioneers of spark-craft technology, indulging in dangerous research.'
    },
    {
      name: 'Spirit Wardens',
      description: 'The bronze-masked hunters who destroy rogue spirits. Also run Bellweather Crematorium to properly dispose of corpses.'
    },
    {
      name: 'Ulf Ironborn',
      description: 'A brutal Skovlander, newly arrived in the Dusk, fighting everyone for turf.'
    },
    {
      name: 'The Unseen',
      description: 'An insidious criminal enterprise with secret membership. Thought to pull the strings of the entire underworld.'
    },
    {
      name: 'The Wraiths',
      description: 'A mysterious crew of masked thieves and spies.'
    }
  ]
  def seed_for(model)
    DEFAULT_FACTIONS.each do |faction_hash|
      model.factions << Faction.new(faction_hash)
    end
  end
end
