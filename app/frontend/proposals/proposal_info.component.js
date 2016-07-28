import { PropTypes }  from 'react';
import ProposalAuthor from './proposal_author.component';

const ProposalInfoComponent = ({
  code,
  created_at,
  official,
  from_meeting,
  author
}) => (
  <p className="proposal-info">
    <span>{ code }</span>
    <span className="bullet">&nbsp;&bull;&nbsp;</span>
    <span>{ created_at }</span>
    <span className="bullet">&nbsp;&bull;&nbsp;</span>
    <ProposalAuthor 
      official={ official }
      fromMeeting={ from_meeting }
      author={ author } />
  </p>
);

ProposalInfoComponent.propTypes = {
  code: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  author: PropTypes.object,
  official: PropTypes.bool,
  from_meeting: PropTypes.bool
};

export default ProposalInfoComponent;
