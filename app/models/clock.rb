class Clock < ApplicationRecord
  validates :name, presence: true
  validates :segments, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 12}
  validates :ticks, allow_nil: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  belongs_to :game
  belongs_to :faction, optional: true
  belongs_to :npc, optional: true

  has_many :comments
end
