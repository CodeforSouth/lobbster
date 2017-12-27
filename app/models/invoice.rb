# frozen_string_literal: true

class Invoice < ApplicationRecord
  belongs_to :user
end
