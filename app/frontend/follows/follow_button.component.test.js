import React              from 'react';
import { shallow }        from 'enzyme';

import { FollowButton }   from './follow_button.component';

describe("Follow button component", function () {
  it("should not appear if user is not signed in", function () {
    const wrapper = shallow(
      <FollowButton 
        session={{signed_in: false}} 
        followingId={1}
        followingType="Proposal"
        fetchFollow={() => {}}
        follow={() => {}}
        unFollow={() => {}}
      />
    );

    expect(wrapper).to.be.empty
  });

  describe("user doesn't follow the resource", function () {
    it("should not render the unfollow button", function () {
      const wrapper = shallow(
        <FollowButton 
          session={{signed_in: true}}
          followingId={1}
          followingType="Proposal"
          fetchFollow={() => {}}
          follow={() => {}}
          unFollow={() => {}}
        />
      );

      expect(wrapper).to.not.have.descendants('.unfollow');
    });

    it("should call follow action on button click", function () {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <FollowButton
          session={{signed_in: true}}
          followingId={1}
          followingType="Proposal"
          fetchFollow={() => {}}
          follow={onButtonClick}
          unFollow={() => {}}
        />
      );

      wrapper.find('SmartButton.follow').simulate('click');

      expect(onButtonClick).to.have.been.calledWith({ 
        followingId: 1, 
        followingType: "Proposal"
      });
    });
  });

  describe("user follows the resource", function () {
    it("should not render the follow button", function () {
      const wrapper = shallow(
        <FollowButton 
          session={{signed_in: true}}
          followingId={1}
          followingType="Proposal"
          fetchFollow={() => {}}
          followId={1}
          follow={() => {}}
          unFollow={() => {}}
        />
      );

      expect(wrapper).to.not.have.descendants('.follow');
    });

    it("should call unFollow action on button click", function () {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <FollowButton
          session={{signed_in: true}}
          followingId={1}
          followingType="Proposal"
          fetchFollow={() => {}}
          followId={1}
          follow={() => {}}
          unFollow={onButtonClick}
        />
      );

      wrapper.find('SmartButton.unfollow').simulate('click');

      expect(onButtonClick).to.have.been.calledWith(1);
    });
  });
});
