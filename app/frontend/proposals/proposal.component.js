import FilterMeta      from '../filters/filter_meta.component';

import ProposalVoteBox from './proposal_vote_box.component';
import ProposalBadge   from './proposal_badge.component';
import ProposalInfo    from './proposal_info.component';

export default (proposal) => (
  <div id={`proposal_${proposal.id}`} className="proposal clear">
    <div className="row">
      <div className="small-12 medium-9 column">
        <div className="proposal-content">
          <ProposalBadge proposal={proposal} />
          <span className="label-proposal">{ I18n.t('proposals.proposal.proposal') }</span>
          <h3><a href={proposal.url}>{ proposal.title }</a></h3>
          <ProposalInfo 
            code={ proposal.code }
            created_at={ proposal.created_at }
            official={ proposal.official }
            from_meeting={ proposal.from_meeting }
            author={ proposal.author }/>
          <div className="proposal-description">
            <p>{ proposal.summary }</p>
            <div className="truncate"></div>
          </div>
          <div className="bottom-bar">
            <FilterMeta 
              scope={ proposal.scope_ }
              district={ proposal.district }
              category={ proposal.category }
              subcategory={ proposal.subcategory } />
          </div>
        </div>
      </div>
      <aside id={`proposal_${proposal.id}_votes`} className="small-12 medium-3 column">
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
    </div>
  </div>
);
