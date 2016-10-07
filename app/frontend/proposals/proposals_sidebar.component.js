import ProposalsFilters  from './proposals_filters.component';

const ProposalsSidebar = () => (
  <div className="filters-controls">
    <div className="card card--secondary show-for-mediumlarge">
      <div className="filters">
        <ProposalsFilters />
      </div>
    </div>
  </div>
);

export default ProposalsSidebar;
