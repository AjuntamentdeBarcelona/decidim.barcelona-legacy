import { Component }            from 'react';
import { connect }              from 'react-redux';

import { fetchReferences }      from './proposals.actions';

class ProposalReferences extends Component {
  componentDidMount() {
    const { proposal } = this.props;

    this.props.fetchReferences(proposal.id);
  }

  render() {
    const { proposal } = this.props;
    const references = proposal.references || [];

    if (references.length > 0) {
      return (
        <div className="references">
          <p>{ I18n.t('shared.references.description') }</p>
          <ul className="references-list">
            {
              references.map(reference => 
                <li key={reference.id}><a href={reference.url}>{reference.title}</a></li>
              )
            }
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  ({ proposal }) => ({ proposal }),
  { fetchReferences }
)(ProposalReferences);
