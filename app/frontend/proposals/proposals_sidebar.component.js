import NewProposalButton from './new_proposal_button.component';
import ProposalsFilters  from './proposals_filters.component';

export default function () {
  return (
    <aside className="sidebar" role="complementary">
      <a className="new-proposal button radius expand">Create proposal</a>
      <div className="sidebar-section proposal-filter-menu collapsed">
        <h2 className="title">Filter <span className="toggle-menu"></span></h2>
        <div className="sidebar-section-content">
          <ProposalsFilters />
        </div>
      </div>
    </aside>
  )
}
