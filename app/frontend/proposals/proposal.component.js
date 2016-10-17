import FilterMeta      from '../filters/filter_meta.component';

import ProposalVoteBox from './proposal_vote_box.component';
import ProposalInfo    from './proposal_info.component';

import htmlToReact from '../application/html_to_react';
import simpleFormat from '../application/simple_format';

const Proposal = (proposal) => (
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
        <p>
          {htmlToReact(simpleFormat(proposal.summary))}
        </p>
        <FilterMeta 
          scope={ proposal.scope_ }
          district={ proposal.district }
          category={ proposal.category }
          subcategory={ proposal.subcategory } />
      </div>
      <div className="card__footer">
        <ProposalVoteBox 
          hideButton={ proposal.closed }
          proposalId={ proposal.id } 
          proposalTitle={ proposal.title } 
          proposalUrl={ proposal.url } 
          voted={ proposal.voted } 
          votable={ proposal.votable } 
          totalVotes={ proposal.total_votes } 
          totalComments={ proposal.total_comments } />
      </div>
    </article>
  </div>
);

export default Proposal;
