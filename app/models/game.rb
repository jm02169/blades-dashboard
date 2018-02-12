class Game < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :comments
  has_many :factions
  has_many :npcs
  has_many :clocks

  # def viewable_by?(user)
  #   game.user == user
  # end
end
