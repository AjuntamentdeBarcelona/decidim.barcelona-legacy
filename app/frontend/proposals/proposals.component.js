import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Loading                  from '../application/loading.component';
import InfinitePagination       from '../pagination/infinite_pagination.component';
import OrderSelector            from '../order/order_selector.component';

import ProposalsSidebar         from './proposals_sidebar.component';
import NewProposalButton        from './new_proposal_button.component';
import ProposalsList            from './proposals_list.component';

import * as actions             from './proposals.actions';
import { setOrder }             from '../order/order.actions';
import { getOrderByUrl }        from '../order/order.reducers';

class Proposals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    // Set random as default order triggering a fetch proposals action
    this.props.setOrder(getOrderByUrl() || 'random');
  }

  componentWillReceiveProps({ filters, order }) {
    if (this.props.filters !== filters || this.props.order !== order) {
      this.setState({ loading: true });
      this.props.fetchProposals({ 
        filters: filters || this.props.filters, 
        order: order || this.props.order, 
        seed: this.props.seed 
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        <div className="row column">
          <div className="title-action">
            <h2 className="title-action__title section-heading">
              { I18n.t('components.proposals.count', { count: this.props.count }) }
            </h2>
            <NewProposalButton />
          </div>
        </div>

        <div className="row">
          <div className="columns mediumlarge-4 large-3">
            <ProposalsSidebar />
          </div>

          <div style={{ position: 'relative' }} className="columns mediumlarge-8 large-9">
            <OrderSelector
              orderLinks={["random", "hot_score", "confidence_score", "created_at"]} />
            <Loading show={this.state.loading} list={true} />
            <ProposalsList proposals={this.props.proposals} />
            {this.renderInfinitePagination()}
          </div>
        </div>
      </div>
    );
  }

  renderInfinitePagination() {
    let infinitePaginationActive = !this.state.loading && 
      this.props.pagination.current_page < this.props.pagination.total_pages;

    if (infinitePaginationActive) {
      return (
        <InfinitePagination 
          onVisible={() => this.props.appendProposalsPage({ 
            filters: this.props.filters, 
            order: this.props.order,
            page: this.props.pagination.current_page + 1,
            seed: this.props.seed
          })} /> 
      );
    }

    return null;
  }
}

export default connect(
  ({ proposals, filters, order, pagination, seed, count }) => ({
    proposals, filters, order, pagination, seed, count
  }),
  {
    ...actions,
    setOrder
  }
)(Proposals);

Proposals.propTypes = {
  filters: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  proposals: PropTypes.array.isRequired,
  order: PropTypes.string,
  seed: PropTypes.any,
  count: PropTypes.number,
  setOrder: PropTypes.func.isRequired,
  fetchProposals: PropTypes.func.isRequired,
  appendProposalsPage: PropTypes.func.isRequired
};
