# frozen_string_literal: true

class User < ApplicationRecord

  VALID_EMAIL_REGEX = /\A[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}\z/i

  validates :email, presence: true
  validates_format_of :email, with: VALID_EMAIL_REGEX, message: 'Please provide a valid email.'
  validates_uniqueness_of :email, message: 'Email is already registered'

  validates_length_of :password, minimum: 6, maximum: 16, :message => "Password Must Be Longer Than 6 Characters."
  validates :password, presence: true


end
