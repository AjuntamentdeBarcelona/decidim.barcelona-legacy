import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import ProposalsHeader        from './proposals_header.component';
import ProposalsFilterTabs    from './proposals_filter_tabs.component';
import ProposalsSidebar       from './proposals_sidebar.component';
import ProposalsOrderSelector from './proposals_order_selector.component';
import NewProposalButton      from './new_proposal_button.component';
import ProposalsList          from './proposals_list.component';

import { fetchProposals }     from './proposals.actions';

class Proposals extends Component {
  componentDidMount() {
    this.props.fetchProposals();
  }

  componentWillReceiveProps({ filters }) {
    if (this.props.filters !== filters) {
      // TODO: update url and stuff
      this.props.fetchProposals({ filters });
    }
  }

  render() {
    return (
      <div>
        <ProposalsHeader />

        <div className="wrap row">
          <ProposalsFilterTabs />
        </div>

        <div className="wrap row">
          <div className="small-12 medium-3 column">
            <ProposalsSidebar />
          </div>

          <div className="small-12 medium-9 column">
            <ProposalsOrderSelector />
            <div className="show-for-small-only">
              <NewProposalButton />
            </div>
            <ProposalsList proposals={this.props.proposals} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ proposals, filters }) {
  return { proposals, filters };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProposals }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
