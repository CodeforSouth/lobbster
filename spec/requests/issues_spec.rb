# frozen_string_literal: true

RSpec.describe 'Issue Requests', type: :request do
  describe 'GET /issues' do
    context 'it returns all of the issues' do
      let(:user) { create(:user) }
      let!(:issues) { create_list(:issue, rand(1..10), user_id: user.id) }
      let!(:issue) { issues[0] }

      before :each do
        get '/issues'
      end

      it 'it responds with a :success status' do
        expect(response).to have_http_status(200)
      end

      it 'it responds with the expected amount of issues' do
        response_body = JSON.parse(response.body)
        expect(response_body.count).to eq issues.count
      end

      it 'returns the expected issues' do
        response_body = JSON.parse(response.body)
        expect(response_body[0]['principal']).to eq issue.principal
        expect(response_body[0]['description']).to eq issue.description
        expect(response_body[0]['address']).to eq issue.address
        expect(response_body[0]['city']).to eq issue.city
        expect(response_body[0]['ein_number']).to eq issue.ein_number
        expect(response_body[0]['non_profit']).to eq false
        expect(response_body[0]['phone']).to eq issue.phone
        expect(response_body[0]['state']).to eq issue.state
        expect(response_body[0]['zip']).to eq issue.zip
      end
    end
  end

  describe 'GET /issues/:id' do
    let(:user) { create(:user) }
    let!(:issue) { create(:issue, user_id: user.id) }
    context 'returns an issue' do
      it 'responds with a :success status' do
        get issues_path(issue.id)

        expect(response).to have_http_status(200)
      end

      it 'responds with the expected amount of issues' do
        get issues_path

        response_body = JSON.parse(response.body)
        expect(response_body.count).to eq 1
      end

      it 'returns the expected issue' do
        get issues_path(issue.id)

        response_body = JSON.parse(response.body)
        expect(response_body[0]['principal']).to eq issue.principal
        expect(response_body[0]['description']).to eq issue.description
        expect(response_body[0]['address']).to eq issue.address
        expect(response_body[0]['city']).to eq issue.city
        expect(response_body[0]['ein_number']).to eq issue.ein_number
        expect(response_body[0]['non_profit']).to eq false
        expect(response_body[0]['phone']).to eq issue.phone
        expect(response_body[0]['state']).to eq issue.state
        expect(response_body[0]['zip']).to eq issue.zip
      end
    end
  end

  describe 'POST /issues/' do
    let(:user) { create(:user) }
    let(:valid_issue_params) do
      {
        user_id: user.id,
        principal: 'Principal',
        address: '123 Street',
        city: 'Miami',
        description: 'Approval of plans before Board of Architects',
        ein_number: 123_456_789,
        non_profit: false,
        phone: '305-305-3050',
        state: 'FL',
        zip: 33_317
      }
    end

    context 'creates an issue' do
      it 'responds with a :created status' do
        post issues_path, params: { issue: valid_issue_params }

        expect(response).to have_http_status(201)
      end

      it 'responds with created issue' do
        post issues_path, params: { issue: valid_issue_params }

        response_body = JSON.parse(response.body)
        expect(response_body['principal']).to eq 'Principal'
        expect(response_body['description']).to eq 'Approval of plans before Board of Architects'
        expect(response_body['address']).to eq '123 Street'
        expect(response_body['city']).to eq 'Miami'
        expect(response_body['ein_number']).to eq 123_456_789
        expect(response_body['non_profit']).to eq false
        expect(response_body['phone']).to eq '305-305-3050'
        expect(response_body['state']).to eq 'FL'
        expect(response_body['zip']).to eq 33_317
      end
    end
  end
end
