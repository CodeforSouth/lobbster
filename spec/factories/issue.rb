FactoryBot.define do
  factory :issue do
    sequence(:principal) {|n| "Principal #{n}"}
    address '123 Street'
    city 'Miami'
    description 'Approval of plans before Board of Architects'
    ein_number 123456789
    non_profit false
    phone '305-305-3050'
    state 'FL'
    zip '33317'
  end
end