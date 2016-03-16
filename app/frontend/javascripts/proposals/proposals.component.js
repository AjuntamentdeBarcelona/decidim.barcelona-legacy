import ProposalsHeader        from './proposals_header.component';
import ProposalsFilterTabs    from './proposals_filter_tabs.component';
import ProposalsSidebar       from './proposals_sidebar.component';
import ProposalsOrderSelector from './proposals_order_selector.component';
import NewProposalButton      from './new_proposal_button.component';
import ProposalsList          from './proposals_list.component';

export default function () {
  return (
    <div>
      <ProposalsHeader />

      <div className="wrap row">
        <ProposalsFilterTabs />
      </div>

      <div className="wrap row">
        <div className="small-12 medium-3 column">
          <ProposalsSidebar />
        </div>

        <div className="small-12 medium-9 column">
          <ProposalsOrderSelector />
          <div className="show-for-small-only">
            <NewProposalButton />
          </div>
          <ProposalsList />
        </div>
      </div>
    </div>
  );
}
