import React                    from 'react';
import { shallow, mount }       from 'enzyme';

import { ProposalFollowButton } from './proposal_follow_button.component';

describe("Proposal follow button component", function () {
  describe("user doesn't follow the proposal", function () {
    it("should not render the unfollow button", function () {
      const proposal = { id: 1, followed: false };
      const wrapper = mount(
        <ProposalFollowButton proposal={proposal} />
      );

      expect(wrapper).to.not.have.descendants('.unfollow');
    });

    it("should call followProposal action on button click", function () {
      const proposal = { id: 1, followed: false };
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <ProposalFollowButton
          proposal={proposal}
          followProposal={onButtonClick}
        />
      );

      wrapper.find('button.follow').simulate('click');

      expect(onButtonClick).to.have.been.calledWith(proposal.id);
    });
  });

  describe("user follows the proposal", function () {
    it("should not render the follow button", function () {
      const proposal = { id: 1, followed: true };
      const wrapper = mount(
        <ProposalFollowButton proposal={proposal} />
      );

      expect(wrapper).to.not.have.descendants('.follow');
    });

    it("should call unFollowProposal action on button click", function () {
      const proposal = { id: 1, followed: true };
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <ProposalFollowButton
          proposal={proposal}
          unFollowProposal={onButtonClick}
        />
      );

      wrapper.find('button.unfollow').simulate('click');

      expect(onButtonClick).to.have.been.calledWith(proposal.id);
    });
  });
});
