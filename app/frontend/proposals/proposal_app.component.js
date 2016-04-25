import { Component }     from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                        from 'redux';
import { Provider }      from 'react-redux';
import ReduxPromise      from 'redux-promise';

import { proposal }      from './proposals.reducers';
import categories        from '../categories/categories.reducers';
import districts         from '../districts/districts.reducers';
import filters           from '../filters/filters.reducers';

import ProposalShow      from './proposal_show.component';

const middlewares = [ReduxPromise];

//if (process.env.NODE_ENV === 'development') {
//  const createLogger = require('redux-logger');
//  const logger = createLogger();
//  middlewares.push(logger);
//}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createReducers(sessionState) {
  let session = function (state = sessionState, action) {
    return state;
  };

  return combineReducers({
    session,
    proposal,
    categories,
    districts,
    filters
  });
}

export default class ProposalApp extends Component {
  render() {
    return (
      <Provider 
        store={createStoreWithMiddleware(createReducers(this.props.session))}>
        <ProposalShow proposalId={this.props.proposalId} />
      </Provider>
    );
  }
}
