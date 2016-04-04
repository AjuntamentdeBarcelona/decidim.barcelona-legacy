import { Component }     from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                        from 'redux';
import { Provider }      from 'react-redux';
import ReduxPromise      from 'redux-promise';

const middlewares = [ReduxPromise];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

import Proposals         from './proposals.component';

import {
  FETCH_PROPOSALS,
  APPEND_PROPOSALS_PAGE,
  SET_ORDER
}                        from './proposals.actions';
import { proposals }     from './proposals.reducers';
import districts         from '../districts/districts.reducers';
import categories        from '../categories/categories.reducers';
import filters           from '../filters/filters.reducers';

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const order = function (state = getInitialOrderState(), action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
  }
  return state;
}

function getInitialOrderState() {
  let order = "random",
      matchData;

  matchData = location.search.match(/order=([^&]*)/)

  if (matchData) {
    order = matchData[1];
  }

  return order;
}

const pagination = function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
    case APPEND_PROPOSALS_PAGE:
      let { 
        current_page, 
        next_page, 
        prev_page, 
        total_pages, 
        total_count 
      } = action.payload.data.meta;

      return {
        current_page,
        next_page,
        prev_page,
        total_pages,
        total_count
      };
  }
  return state;
}

const seed = function (state = getInitialSeedState(), action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
    case APPEND_PROPOSALS_PAGE:
      return action.payload.data.meta.seed;
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
    proposals,
    filters,
    order,
    pagination,
    seed
  });
}

export default class ProposalsApp extends Component {
  render() {
    return (
      <Provider 
        store={createStoreWithMiddleware(createReducers(this.props.session))}>
        <Proposals />
      </Provider>
    );
  }
}
