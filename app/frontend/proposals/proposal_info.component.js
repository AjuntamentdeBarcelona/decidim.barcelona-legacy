import { PropTypes }  from 'react';
import ProposalAuthor from './proposal_author.component';

const ProposalInfoComponent = ({
  code,
  created_at,
  official,
  from_meeting,
  author,
  status
}) => (
  <p className="proposal-info">
    <strong>{ code }</strong>
    {(() => {
      if (status) {
        return (
            <span className="proposal-status badge">
            <span className="bullet">&nbsp;&bull;&nbsp;</span>
            <span className={status}>{I18n.t(`proposals.status.${status}`)}</span>
            </span>
        );
      } else {
        return null;
      }
    })()}
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
  status: PropTypes.string,
  official: PropTypes.bool,
  from_meeting: PropTypes.bool
};

export default ProposalInfoComponent;
