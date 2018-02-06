class Faction < ApplicationRecord
  validates :name, presence: true
  validates :faction_status, numericality: {greater_than_or_equal_to: -3, less_than_or_equal_to: 3}

  belongs_to :game
  has_many :npcs
  has_many :clocks
  has_many :comments
end
