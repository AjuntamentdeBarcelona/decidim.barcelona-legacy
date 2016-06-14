import { PropTypes } from 'react';

import Proposal      from './proposal.component';

const ProposalsList = ({
  proposals
}) => (
  <div id="proposals" className="proposals-list">
    {
      proposals.map((proposal) => {
        return (
          <Proposal key={proposal.id} {...proposal} />
        )
      })
    }
  </div>
);

ProposalsList.propTypes = {
  proposals: PropTypes.array.isRequired
};

export default ProposalsList;
