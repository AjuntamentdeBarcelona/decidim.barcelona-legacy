import ProposalVoteBox from './proposal_vote_box.component';

export default function ({
  id,
  title
}) {
  return (
    <div className="proposal clear">
      <div className="row">
        <div className="small-12 medium-9 column">
          <div className="proposal-content">
            <span className="proposal-badge official-badge"></span>
            <span className="label-proposal">LabelProposal</span>
            <h3>Proposal</h3>
            <p className="proposal-info">
              <span>01/01/2017</span>
              <span className="bullet">&nbsp;&bull;&nbsp;</span>
              <span className="author">Author</span>
              <span className="bullet">&nbsp;&bull;&nbsp;</span>
              <span className="label round level-2">Level</span>
              <span className="bullet">&nbsp;&bull;&nbsp;</span>
              <span className="label round is-association">Collectiu</span>
            </p>
            <div className="proposal-description">
              <p>Summary</p>
              <div className="truncate"></div>
            </div>
            <div className="bottom-bar">
              <div className="item-meta">
                <a>Meta1</a>
                <a>Meta2</a>
                <a>Meta3</a>
              </div>
            </div>
          </div>
        </div>
        <aside className="small-12 medium-3 column">
          <ProposalVoteBox />
        </aside>
      </div>
    </div>
  );
}
