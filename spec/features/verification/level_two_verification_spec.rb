require 'rails_helper'

feature 'Level two verification' do
  before do
    expect(Census).to receive(:new)
                       .with(a_hash_including(document_type: "dni",
                                              document_number: "12345678Z"))
                       .and_return double(:valid? => true)

  end

end
