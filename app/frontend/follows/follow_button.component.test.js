import React              from 'react';
import { shallow, mount } from 'enzyme';

import { FollowButton }   from './follow_button.component';

describe("Follow button component", function () {
  it("should not appear if user is not signed in", function () {
    const wrapper = shallow(
      <FollowButton 
        session={{signed_in: false}} 
      />
    );

    expect(wrapper).to.be.empty
  });

  describe("user doesn't follow the resource", function () {
    it("should not render the unfollow button", function () {
      const wrapper = shallow(
        <FollowButton 
          session={{signed_in: true}}
          fetchFollow={() => {}}
        />
      );

      expect(wrapper).to.not.have.descendants('.unfollow');
    });

    it("should call follow action on button click", function () {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <FollowButton
          session={{signed_in: true}}
          fetchFollow={() => {}}
          followingId={1}
          followingType="Proposal"
          follow={onButtonClick}
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
          fetchFollow={() => {}}
          followId={1} 
        />
      );

      expect(wrapper).to.not.have.descendants('.follow');
    });

    it("should call unFollow action on button click", function () {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(
        <FollowButton
          session={{signed_in: true}}
          fetchFollow={() => {}}
          followId={1}
          unFollow={onButtonClick}
        />
      );

      wrapper.find('SmartButton.unfollow').simulate('click');

      expect(onButtonClick).to.have.been.calledWith(1);
    });
  });
});
