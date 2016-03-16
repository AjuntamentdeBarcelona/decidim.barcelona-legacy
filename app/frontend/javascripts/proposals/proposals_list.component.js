import { Component } from 'react';
import { connect }   from 'react-redux';

import Proposal      from './proposal.component';
import Pagination    from '../application/pagination.component';

class ProposalsList extends Component {
  render() {
    return (
      <div>
        <div className="proposals-list">
          {
            this.props.proposals.map((proposal) => {
              return (
                <Proposal key={proposal.id} {...proposal} />
              )
            })
          }
        </div>
        <Pagination currentPage={1} totalPages={10} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    proposals: [
      { id: 1, title: "My proposal #1" },
      { id: 2, title: "My proposal #2" },
      { id: 3, title: "My proposal #3" },
      { id: 4, title: "My proposal #4" },
      { id: 5, title: "My proposal #5" },
      { id: 6, title: "My proposal #6" },
      { id: 7, title: "My proposal #7" },
      { id: 8, title: "My proposal #8" },
      { id: 9, title: "My proposal #9" }
    ]
  };
}

export default connect(mapStateToProps, null)(ProposalsList);
