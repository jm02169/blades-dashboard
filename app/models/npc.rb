class Npc < ApplicationRecord
  validates :name, presence: true

  belongs_to :game
  belongs_to :faction, optional: true

  has_many :comments
  has_many :clocks
end
