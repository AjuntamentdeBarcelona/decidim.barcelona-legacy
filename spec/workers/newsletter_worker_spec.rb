# coding: utf-8
require 'rails_helper'

describe NewsletterWorker do
  describe 'perform' do
    let!(:newsletter) { create(:newsletter, title: title, body: body) }

    let(:title) do
      { 'ca' => 'Títol en català.', 'es' => 'Título en castellano.' }
    end

    let(:body) do
      { 'ca' => '<p>Cos en català.</p>', 'es' => '<p>Cuerpo en castellano.</p>' }
    end

    let!(:user1) { create(:user, newsletter: true, locale: 'es') }
    let!(:user2) { create(:user, newsletter: true, locale: 'ca') }
    let!(:user3) { create(:user, newsletter: false) }

    before do
      NewsletterWorker.perform_async(newsletter.id)
      @deliveries = ActionMailer::Base.deliveries
    end

    it 'sends a newsletter to each user that has newsletters enabled' do
      expect(@deliveries.length).to eq(2)

      email1 = deliveries.find { |d| d.to.include?(user1.email) }
      expect(email1.subject).to eq('Título en castellano.')
      expect(mail_content(email1)).to match(%r{<p.*>Cuerpo en castellano.</p>})

      email2 = deliveries.find { |d| d.to.include?(user2.email) }
      expect(email2.subject).to eq('Títol en català.')
      expect(mail_content(email2)).to match(%r{<p.*>Cos en català.</p>})
    end

    it 'sets the newsletter as sent' do
      expect(newsletter.reload.sent_at).to_not be_nil
    end

    it "doesn't sent a newsletter twice" do
      NewsletterWorker.perform_async(newsletter.id)
      expect(@deliveries.length).to eq(2)
    end
  end
end
