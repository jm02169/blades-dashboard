class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :game, optional: true
  belongs_to :faction, optional: true
  belongs_to :npc, optional: true
  belongs_to :clock, optional: true
end
