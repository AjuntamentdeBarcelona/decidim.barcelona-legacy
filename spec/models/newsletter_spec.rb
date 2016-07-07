require 'rails_helper'

describe Newsletter, type: :model do
  let!(:unsent_newsletter){ create(:newsletter) }
  let!(:sent_newsletter){ create(:newsletter, :sent) }

  describe ".unsent" do
    it "includes only unsent newsletters" do
      expect(Newsletter.unsent).to_not include(sent_newsletter)
      expect(Newsletter.unsent).to include(unsent_newsletter)
    end
  end

  describe ".sent" do
    it "includes only sent newsletters" do
      expect(Newsletter.sent).to include(sent_newsletter)
      expect(Newsletter.sent).to_not include(unsent_newsletter)
    end
  end
end
