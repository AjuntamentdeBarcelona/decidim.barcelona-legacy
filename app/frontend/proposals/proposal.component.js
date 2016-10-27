import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './proposals.actions';

import FilterMeta               from '../filters/filter_meta.component';

import ProposalStatusBadge      from './proposal_status_badge.component';
import ProposalVoteBox          from './proposal_vote_box.component';
import ProposalInfo             from './proposal_info.component';

import htmlToReact              from '../application/html_to_react';
import simpleFormat             from '../application/simple_format';

class Proposal extends Component {
  componentDidMount() {
    const { fetchAnswer, proposal } = this.props;

    fetchAnswer(proposal.id);
  }

  render() {
    const { proposal, participatoryProcess } = this.props;
    const { step } = participatoryProcess;
    const { flags } = step;

    return (
      <div id={`proposal_${proposal.id}`} className="proposal column">
        <article className="card card--proposal">
          
          <div className="card__content">
            <div className="card__header">
              <a href={proposal.url} className="card__link">
                <h5 className="card__title">{ proposal.title }</h5>
              </a>
              <ProposalInfo 
                created_at={ proposal.created_at }
                author={ proposal.author }/>
            </div>
            <ProposalStatusBadge answer={proposal.answer} />
            <p>
              {htmlToReact(simpleFormat(proposal.summary))}
            </p>
            <FilterMeta 
              scope={ proposal.scope_ }
              district={ proposal.district }
              category={ proposal.category }
              subcategory={ proposal.subcategory } 
              disableScope={ !flags.enable_proposal_scope } />
          </div>
          <div className="card__footer">
            <ProposalVoteBox 
              proposalId={ proposal.id }
              closed={ proposal.closed }
              voted={ proposal.voted } 
              votable={ proposal.votable } 
              totalVotes={ proposal.total_votes } />
          </div>
        </article>
      </div>
    );
  }
}

export default connect(
  ({ participatoryProcess }) => ({ participatoryProcess }), 
  actions
)(Proposal);

Proposal.propTypes = {
  proposal: PropTypes.object.isRequired,
  fetchAnswer: PropTypes.func.isRequired,
  participatoryProcess: PropTypes.object.isRequired
};
