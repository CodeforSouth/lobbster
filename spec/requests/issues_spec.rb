require 'rails_helper'

RSpec.describe "Issues", type: :request do
  describe "GET /issues" do
    let(:user) {create(:user)}
    let!(:issue) {create(:issue, user_id: user.id, principal: "Starbucks")}
    let!(:issue2) {create(:issue, user_id: user.id)}
    let!(:issue3) {create(:issue, user_id: user.id)}
    it "returns all of the issues" do
      get issues_path

      expect(response).to have_http_status(200)
      response_body = JSON.parse(response.body)
      expect(response_body.count).to eq 3
      expect(response_body[0]["principal"]).to eq "Starbucks"
      expect(response_body[0]["description"]).to eq "Approval of plans before Board of Architects"
      expect(response_body[0]["address"]).to eq "123 Street"
      expect(response_body[0]["city"]).to eq "Miami"
      expect(response_body[0]["ein_number"]).to eq 123456789
      expect(response_body[0]["non_profit"]).to eq false
      expect(response_body[0]["phone"]).to eq "305-305-3050"
      expect(response_body[0]["state"]).to eq "FL"
      expect(response_body[0]["zip"]).to eq 33317
    end
  end
end
