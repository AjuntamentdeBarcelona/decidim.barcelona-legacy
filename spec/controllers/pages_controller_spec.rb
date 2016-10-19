require 'rails_helper'

describe PagesController do

  before :each do
    @participatory_process = create(:participatory_process)
  end

  describe 'Static pages' do
    it 'should include a conditions page' do
      get :show, id: :conditions, participatory_process_id: @participatory_process
      expect(response).to be_ok
    end

    it 'should include a terms page' do
      get :show, id: :census_terms, participatory_process_id: @participatory_process
      expect(response).to be_ok
    end
  end

  describe 'Info pages' do
    it 'should include a more_information page' do
      get :show, id: :more_information, participatory_process_id: @participatory_process
      expect(response).to be_ok
    end
  end

  describe 'Not found pages' do
    it 'should return a 404 message' do
      expect{
        get :show, id: "nonExistentPage", participatory_process_id: @participatory_process
      }.to raise_error(ActionController::RoutingError)
    end
  end

end
