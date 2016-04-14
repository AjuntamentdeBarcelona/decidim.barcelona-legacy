import ProposalVoteBox from './proposal_vote_box.component';
import ProposalBadge   from './proposal_badge.component';
import ProposalInfo    from './proposal_info.component';
import ProposalMeta    from './proposal_meta.component';

export default ({
  id,
  code,
  title,
  url,
  summary,
  created_at,
  category,
  subcategory,
  scope_,
  district,
  source,
  total_votes,
  total_comments,
  voted,
  closed,
  votable,
  official,
  from_meeting,
  author
}) => (
  <div id={`proposal_${id}`} className="proposal clear">
    <div className="row">
      <div className="small-12 medium-9 column">
        <div className="proposal-content">
          <ProposalBadge source={source} />
          <span className="label-proposal">{ I18n.t('proposals.proposal.proposal') }</span>
          <h3><a href={url}>{ title }</a></h3>
          <ProposalInfo 
            code={ code }
            created_at={ created_at }
            official={ official }
            from_meeting={ from_meeting }
            author={ author }/>
          <div className="proposal-description">
            <p>{ summary }</p>
            <div className="truncate"></div>
          </div>
          <div className="bottom-bar">
            <ProposalMeta 
              scope={ scope_ }
              district={ district }
              category={ category }
              subcategory={ subcategory } />
          </div>
        </div>
      </div>
      <aside id={`proposal_${id}_votes`} className="small-12 medium-3 column">
        <ProposalVoteBox 
          hideButton={ closed }
          proposalId={ id } 
          proposalTitle={ title } 
          proposalUrl={ url } 
          voted={ voted } 
          votable={ votable } 
          totalVotes={ total_votes } 
          totalComments={ total_comments } />
      </aside>
    </div>
  </div>
);
