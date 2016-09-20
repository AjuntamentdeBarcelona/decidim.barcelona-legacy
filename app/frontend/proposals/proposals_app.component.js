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

import Proposals                                from './proposals.component';

import {
  FETCH_PROPOSALS,
  APPEND_PROPOSALS_PAGE
}                                               from './proposals.actions';
import { proposals }                            from './proposals.reducers';

import districts                                from '../districts/districts.reducers';
import categories                               from '../categories/categories.reducers';
import filters                                  from '../filters/filters.reducers';
import order                                    from '../order/order.reducers';
import pagination                               from '../pagination/pagination.reducers';

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const seed = function (state = getInitialSeedState(), action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
    case APPEND_PROPOSALS_PAGE:
      return action.payload.data.meta.seed;
  }
  return state;
}


const count = function (state = 0, action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
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

function createReducers(sessionState, participatoryProcessIdState) {
  let session = function (state = sessionState) {
    return state;
  };

  let participatoryProcessId = function (state = participatoryProcessIdState) {
    return state;
  };

  return combineReducers({
    session,
    participatoryProcessId,
    districts,
    categories,
    proposals,
    filters,
    order,
    pagination,
    seed,
    count
  });
}

export default class ProposalsApp extends Component {
  render() {
    return (
      <Provider 
        store={createStoreWithMiddleware(createReducers(this.props.session, this.props.participatory_process_id))}>
        <Proposals />
      </Provider>
    );
  }
}

ProposalsApp.propTypes = {
  session: PropTypes.object.isRequired,
  participatory_process_id: PropTypes.string.isRequired
};
