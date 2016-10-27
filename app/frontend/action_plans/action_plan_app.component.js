import { Component, PropTypes } from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                               from 'redux';
import { Provider }             from 'react-redux';
import ReduxPromise             from 'redux-promise';
import ReduxThunk               from 'redux-thunk';

import { actionPlan }           from './action_plans.reducers';
import categories               from '../categories/categories.reducers';
import districts                from '../districts/districts.reducers';
import filters                  from '../filters/filters.reducers';
import order                    from '../order/order.reducers';
import pagination               from '../pagination/pagination.reducers';

import ActionPlanShow           from './action_plan_show.component';

const middlewares = [ReduxPromise, ReduxThunk];

// if (process.env.NODE_ENV === 'development') {
//   const createLogger = require('redux-logger');
//   const logger = createLogger();
//   middlewares.push(logger);
// }
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createReducers(sessionState, participatoryProcessState, stepIdState, decidimIconsUrlState) {
  let session = function (state = sessionState) {
    return state;
  };

  let participatoryProcess = function (state = participatoryProcessState) {
    return state;
  };

  let decidimIconsUrl = function (state = decidimIconsUrlState) {
    return state;
  };

  return combineReducers({
    session,
    order,
    pagination,
    participatoryProcess,
    decidimIconsUrl,
    actionPlan,
    categories,
    districts,
    filters
  });
}

export default class ActionPlanApp extends Component {
  render() {
    return (
      <Provider 
      store={createStoreWithMiddleware(createReducers(this.props.session,
                                                      this.props.participatory_process,
                                                      this.props.decidim_icons_url))}>

        <ActionPlanShow actionPlanId={this.props.actionPlanId} />
      </Provider>
    );
  }
}

ActionPlanApp.propTypes = {
  session: PropTypes.object.isRequired,
  actionPlanId: PropTypes.string.isRequired,
  participatory_process: PropTypes.object.isRequired,
  decidim_icons_url: PropTypes.string.isRequired
};
