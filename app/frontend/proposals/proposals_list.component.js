import { PropTypes } from 'react';

import Proposal      from './proposal.component';

const ProposalsList = ({
  proposals
}) => (
    <div id="proposals" className="proposals-list row small-up-1 medium-up-2 mediumlarge-up-1 large-up-2 card-grid">
    {
      proposals.map((proposal) => {
        return (
          <Proposal key={proposal.id} proposal={proposal} />
        )
      })
    }
  </div>
);

ProposalsList.propTypes = {
  proposals: PropTypes.array.isRequired
};

export default ProposalsList;
