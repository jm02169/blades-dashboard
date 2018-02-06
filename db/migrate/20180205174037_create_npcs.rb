class CreateNpcs < ActiveRecord::Migration[5.1]
  def change
    create_table :npcs do |t|
      t.string :name, null: false
      t.string :description
      t.string :picture

      t.belongs_to :game
      t.belongs_to :faction

      t.timestamps
    end
  end
end
