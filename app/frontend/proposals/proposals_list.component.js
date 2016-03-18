import Proposal   from './proposal.component';

export default ({
  proposals
}) => (
  <div>
    <div className="proposals-list">
      {
        proposals.map((proposal) => {
          return (
            <Proposal key={proposal.id} {...proposal} />
          )
        })
      }
    </div>
  </div>
);
