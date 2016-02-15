require 'rails_helper'
require_dependency 'style_validator'

describe StyleValidator do
  let(:subject) do
    Class.new do
      include ActiveModel::Model
      attr_accessor :title

      validates :title, style: true
    end
  end

  describe "valid?" do
    context "caps" do
      it "returns true if title has a moderate amount of capital letters" do
        expect(subject.new(title: "This has a moderate amount of CAPS.")).to be_valid
      end

      it "returns false if the title has an inadequate amount of caps" do
        expect(subject.new(title: "OMG I AM SO RUDE, damn.")).to_not be_valid
      end
    end

    context "symbols and exclamation marks" do
      it "returns true if title doesn't have any exclamation marks" do
        expect(subject.new(title: "I am reasonable!")).to be_valid
      end

      it "returns false if the title has too many exclamation marks" do
        expect(subject.new(title: "Hey, are you here? Listen to me!!")).to_not be_valid
      end
    end
  end
end
