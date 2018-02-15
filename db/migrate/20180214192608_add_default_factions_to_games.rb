class AddDefaultFactionsToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :default_factions, :integer, default: 0
  end
end
