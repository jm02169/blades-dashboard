class CreateFactions < ActiveRecord::Migration[5.1]
  def change
    create_table :factions do |t|
      t.string :name, null: false
      t.text :description
      t.integer :faction_status, default: 0

      t.belongs_to :game

      t.timestamps
    end
  end
end
