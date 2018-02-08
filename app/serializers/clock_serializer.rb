class ClockSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :segments, :ticks, :faction_name, :npc_name, :faction_id, :npc_id

  def faction_name
    if object.faction
    "#{object.faction.name}"
    else
      nil
    end
  end

  def npc_name
    if object.npc
    "#{object.npc.name}"
    else
      nil
    end
  end

end
