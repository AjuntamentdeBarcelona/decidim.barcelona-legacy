import FilterMeta      from '../filters/filter_meta.component';

import ProposalVoteBox from './proposal_vote_box.component';
import ProposalInfo    from './proposal_info.component';

import htmlToReact from '../application/html_to_react';
import simpleFormat from '../application/simple_format';

const Proposal = (proposal) => (
  <div id={`proposal_${proposal.id}`} className="proposal column">
    <article className="card card--proposal">
      <div className="card__content">
        <div className="proposal-content">
          <a href={proposal.url} className="card__link">
            <h5 className="card__title">{ proposal.title }</h5>
          </a>
          <ProposalInfo 
            code={ proposal.code }
            created_at={ proposal.created_at }
            status={ proposal.status }
            official={ proposal.official }
            from_meeting={ proposal.from_meeting }
            author={ proposal.author }/>
          <p className="proposal-description">
            {(() => {
              if (proposal.status) {
                return (
                    <span className="proposal-status badge">
                    <span className="bullet">&nbsp;&bull;&nbsp;</span>
                    <span className={proposal.status}>{I18n.t(`proposals.status.${proposal.status}`)}</span>
                    </span>
                );
              } else {
                return null;
              }
            })()}
            {htmlToReact(simpleFormat(proposal.summary))}
          </p>
          <div className="bottom-bar">
            <FilterMeta 
              scope={ proposal.scope_ }
              district={ proposal.district }
              category={ proposal.category }
              subcategory={ proposal.subcategory } />
          </div>
        </div>
      </div>
      <aside id={`proposal_${proposal.id}_votes`} className="card__footer">
        <ProposalVoteBox 
          hideButton={ proposal.closed }
          proposalId={ proposal.id } 
          proposalTitle={ proposal.title } 
          proposalUrl={ proposal.url } 
          voted={ proposal.voted } 
          votable={ proposal.votable } 
          totalVotes={ proposal.total_votes } 
          totalComments={ proposal.total_comments } />
      </aside>
    </article>
  </div>
);

export default Proposal;
