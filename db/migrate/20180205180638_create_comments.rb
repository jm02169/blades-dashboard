class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body, null: false

      t.belongs_to :game
      t.belongs_to :clock
      t.belongs_to :npc
      t.belongs_to :faction

      t.timestamps
    end
  end
end
