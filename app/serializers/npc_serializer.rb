class NpcSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :faction_name, :faction_id, :game_id

  belongs_to :game
  belongs_to :faction, optional: true

  def faction_name
    if object.faction
    "#{object.faction.name}"
    else
      nil
    end
  end
end
