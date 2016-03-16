import { Component } from 'react';
import { connect }   from 'react-redux';

import Proposal      from './proposal.component';
import Pagination    from '../application/pagination.component';

class ProposalsList extends Component {
  render() {
    return (
      <div>
        {this.props.proposals.map((proposal) => {
          return (
            <Proposal {...proposal} />
          )
        })}
        <Pagination currentPage={1} totalPages={10} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    proposals: [
      { id: 1, title: "My first proposal" },
      { id: 2, title: "My second proposal" }
    ]
  };
}

export default connect(mapStateToProps, null)(ProposalsList);
