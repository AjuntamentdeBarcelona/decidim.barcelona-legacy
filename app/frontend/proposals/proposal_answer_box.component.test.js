import React              from 'react';
import { shallow, mount } from 'enzyme';

import ProposalAnswerBox  from './proposal_answer_box.component';
import RichEditor         from '../application/rich_editor.component';

describe("Proposal answer box component", function () {
  it("should render a rich editor for the message", function () {
    const wrapper = shallow(
      <ProposalAnswerBox 
        onButtonClick={}
        answer={{message: "Just a simple message", status: ""}} />
    );
    expect(wrapper).to.have.descendants(RichEditor);
  });

  describe("clicking on the accept button", function () {
    it("should call updateAnswer function with status accepted", function () {
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <ProposalAnswerBox 
          onButtonClick={onButtonClick}
          answer={{message: "I accept this proposal because it looks great", status: ""}} /> 
      );

      wrapper.find('button.accept').simulate('click');

      expect(onButtonClick).to.have.been.calledWith({ 
        message: "I accept this proposal because it looks great",
        official: false,
        status: "accepted"
      });
    });
  });

  describe("clicking on the reject button", function () {
    it("should call updateAnswer function with status rejected", function () {
      const onButtonClick = sinon.spy();
      const wrapper = mount(
        <ProposalAnswerBox 
          onButtonClick={onButtonClick}
          answer={{message: "This is unacceptable!" , status: ""}} />
      );

      wrapper.find('button.reject').simulate('click');

      expect(onButtonClick).to.have.been.calledWith({ 
        message: "This is unacceptable!",
        official: false,
        status: "rejected"
      });
    });
  });
});
