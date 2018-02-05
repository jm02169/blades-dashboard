class CreateClocks < ActiveRecord::Migration[5.1]
  def change
    create_table :clocks do |t|
      t.string :name, null:false
      t.text :description
      t.integer :segments, null: false
      t.integer :ticks, null: false

      t.belongs_to :faction
      t.belongs_to :npc
      t.belongs_to :game

      t.timestamps
    end
  end
end
