import { Component, PropTypes }                 from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                                               from 'redux';
import { Provider }                             from 'react-redux';
import ReduxPromise                             from 'redux-promise';
import ReduxThunk                               from 'redux-thunk';

const middlewares = [ReduxPromise, ReduxThunk];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

import ActionPlans                              from '../action_plans/action_plans.component';

import {
  FETCH_ACTION_PLANS,
  APPEND_ACTION_PLANS_PAGE
}                                               from '../action_plans/action_plans.actions';
import { actionPlans }                          from '../action_plans/action_plans.reducers';
import districts                                from '../districts/districts.reducers';
import categories                               from '../categories/categories.reducers';
import filters                                  from '../filters/filters.reducers';
import order                                    from '../order/order.reducers';
import pagination                               from '../pagination/pagination.reducers';

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
  let session = function (state = sessionState) {
    return state;
  };

  return combineReducers({
    session,
    districts,
    categories,
    actionPlans,
    filters,
    order,
    pagination,
    seed,
    count
  });
}

export default class ActionPlansApp extends Component {
  render() {
    return (
      <Provider 
        store={createStoreWithMiddleware(createReducers(this.props.session))}>
        <ActionPlans />
      </Provider>
    );
  }
}

ActionPlansApp.propTypes = {
  session: PropTypes.object.isRequired
};
