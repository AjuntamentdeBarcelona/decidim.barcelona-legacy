require 'rails_helper'
require 'cancan/matchers'

describe "Abilities::Reviewer" do
  subject(:ability) { Ability.new(user) }
  let(:user) { create(:user, roles: [:reviewer]) }

  it { should be_able_to(:manage, Action) }
end
