class Faction < ApplicationRecord
  validates :name, presence: true

  belongs_to :game
  has_many :npcs
  has_many :clocks
  has_many :comments
end
