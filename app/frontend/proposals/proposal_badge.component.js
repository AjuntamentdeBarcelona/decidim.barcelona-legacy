import { PropTypes } from 'react';

const ProposalBadge = ({ proposal }) => (
  <span className={`proposal-badge ${proposal.source}-badge`}></span>
);

ProposalBadge.propTypes = {
  proposal: PropTypes.object.isRequired
};

export default ProposalBadge;
