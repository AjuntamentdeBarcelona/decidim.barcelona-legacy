import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Loading                from '../application/loading.component';
import InfinitePagination     from '../pagination/infinite_pagination.component';

import ActionPlansSidebar     from './action_plans_sidebar.component';
import ActionPlansList        from './action_plans_list.component';

import { fetchActionPlans, appendActionPlansPage } from './action_plans.actions';

class ActionPlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.fetchActionPlans({
      filters: this.props.filters,
      order: this.props.order,
      seed: this.props.seed
    });
  }

  componentWillReceiveProps({ filters, order }) {
    if (this.props.filters !== filters || this.props.order !== order) {
      this.setState({ loading: true });
      this.props.fetchActionPlans({ 
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
        <div className="wrap row">
          <div className="wrap row">
            <div className="small-12 medium-3 column">
              <ActionPlansSidebar />
            </div>

            <div className="small-12 medium-9 column">
              <Loading show={this.state.loading} />
              <h3 className="proposals-count">
                { I18n.t('components.action_plans.count', { count: this.props.count }) }
              </h3>
              <ActionPlansList actionPlans={this.props.actionPlans} />
              {this.renderInfinitePagination()}
            </div>
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
          onVisible={() => this.props.appendActionPlansPage({ 
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

function mapStateToProps({ actionPlans, filters, order, pagination, seed, count }) {
  return { actionPlans, filters, order, pagination, seed, count };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchActionPlans, appendActionPlansPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlans);
