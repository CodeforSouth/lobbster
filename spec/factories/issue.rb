# frozen_string_literal: true

FactoryBot.define do
  factory :issue do
    principal { Faker::Simpsons.character }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    description { Faker::Simpsons.quote }
    ein_number { Faker::Number.number(9) }
    non_profit false
    phone { Faker::PhoneNumber.phone_number }
    state { Faker::Address.state_abbr }
    zip { Faker::Address.zip_code }
  end
end
