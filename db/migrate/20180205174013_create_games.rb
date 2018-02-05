class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.text :description

      t.belongs_to :user

      t.timestamps
    end
  end
end
