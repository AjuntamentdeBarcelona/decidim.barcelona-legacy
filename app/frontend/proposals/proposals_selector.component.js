import { Component }                     from 'react';

import ProposalsAutocompleteInput from './proposals_autocomplete_input.component';
import ProposalsTable             from './proposals_table.component';

export default class ProposalsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: Immutable.Set(this.props.proposals)
    };
  }
  render() {
    return (
      <div className="proposals_selector">
        <input type="hidden" name={`${this.props.resource_name}[proposal_ids][]`} value="" />
        {
          this.state.proposals.map((proposal) => {
            return (
              <input key={proposal.id} type="hidden" name={`${this.props.resource_name}[proposal_ids][]`} value={proposal.id} />
            )
          })
        }
        <ProposalsAutocompleteInput 
          proposalsApiUrl={this.props.proposals_api_url}
          excludeIds={this.state.proposals.map((proposal) => proposal.id).toArray()}
          onAddProposal={(proposal) => this.addProposal(proposal)} />
        <ProposalsTable 
          proposals={this.state.proposals} 
          onRemoveProposal={(proposal) => this.removeProposal(proposal)} />
      </div>
    );
  }

  addProposal(proposal) {
    let proposals = this.state.proposals.add(proposal);
    this.setState({ proposals })
  }

  removeProposal(proposal) {
    let proposals = this.state.proposals.delete(proposal);
    this.setState({ proposals })
  }
}
