import { Component }                                 from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                                                    from 'redux';
import { Provider }                                  from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer }       from 'react-router-redux'
import ReduxPromise                                  from 'redux-promise';

const middlewares = [ReduxPromise];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

import ActionPlans       from './action_plans.component';
import ActionPlansIndex  from './action_plans_index.component';
import ActionPlanShow    from './action_plan_show.component';

import {
  FETCH_ACTION_PLANS,
  APPEND_ACTION_PLANS_PAGE,
}                        from './action_plans.actions';
import { actionPlans }   from './action_plans.reducers';
import { actionPlan }    from './action_plans.reducers';
import districts         from '../districts/districts.reducers';
import categories        from '../categories/categories.reducers';
import filters           from '../filters/filters.reducers';
import order             from '../order/order.reducers';
import pagination        from '../pagination/pagination.reducers';

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const seed = function (state = getInitialSeedState(), action) {
  switch (action.type) {
    case FETCH_ACTION_PLANS:
    case APPEND_ACTION_PLANS_PAGE:
      return action.payload.data.meta.seed;
  }
  return state;
}

const count = function (state = 0, action) {
  switch (action.type) {
  case FETCH_ACTION_PLANS:
    return action.payload.data.meta.total_count;
  }
  return state;
}

function getInitialSeedState() {
  let seed = null, 
      matchData;

  matchData = location.search.match(/random_seed=([^&]*)/);

  if (matchData) {
    seed = matchData[1];
  }

  return seed;
}

function createReducers(sessionState) {
  let session = function (state = sessionState, action) {
    return state;
  };

  return combineReducers({
    session,
    districts,
    categories,
    actionPlans,
    actionPlan,
    filters,
    order,
    pagination,
    seed,
    count,
    routing: routerReducer
  });
}

export default class ActionPlansApp extends Component {
  render() {
    const store = createStoreWithMiddleware(createReducers(this.props.session));
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Provider 
        store={store}>
        <Router history={history}>
          <Route path="/action_plans" component={ActionPlans}>
            <IndexRoute path="" component={ActionPlansIndex}/>
            <Route path=":id" component={ActionPlanShow}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
