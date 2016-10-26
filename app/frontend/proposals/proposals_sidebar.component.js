import ProposalsFilters  from './proposals_filters.component';

const ProposalsSidebar = () => (
  <div className="card card--secondary show-for-mediumlarge">
    <div className="filters">
      <ProposalsFilters />
    </div>
  </div>
);

export default ProposalsSidebar;
