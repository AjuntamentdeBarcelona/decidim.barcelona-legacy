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

// if (process.env.NODE_ENV === 'development') {
//   const createLogger = require('redux-logger');
//   const logger = createLogger();
//   middlewares.push(logger);
// }

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

function createReducers(sessionState, participatoryProcessState, decidimIconsUrlState) {
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
    participatoryProcess,
    decidimIconsUrl,
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
      store={createStoreWithMiddleware(createReducers(this.props.session,
                                                      this.props.participatory_process,
                                                      this.props.decidim_icons_url))}>
        <Proposals />
      </Provider>
    );
  }
}

ProposalsApp.propTypes = {
  session: PropTypes.object.isRequired,
  participatory_process: PropTypes.object.isRequired,
  decidim_icons_url: PropTypes.string.isRequired
};
