class Game < ApplicationRecord
  # attr_accessor :add_default_factions
  validates :name, presence: true

  belongs_to :user
  has_many :comments
  has_many :factions
  has_many :npcs
  has_many :clocks

  # before_create :make_default_factions

  # protected
  # def make_default_factions
  #   if self.add_default_factions
  #     #seed default_factions
  #     DefaultFactionSeeder.new.seed_for(self)
  #   end
  # end
  # def viewable_by?(user)
  #   game.user == user
  # end
end
