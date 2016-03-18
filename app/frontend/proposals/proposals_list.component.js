import Proposal   from './proposal.component';
import Pagination from '../application/pagination.component';

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
    <Pagination currentPage={1} totalPages={10} />
  </div>
);
