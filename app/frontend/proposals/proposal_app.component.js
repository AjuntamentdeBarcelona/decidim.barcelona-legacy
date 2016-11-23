import { Component, PropTypes } from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                               from 'redux';
import { Provider }             from 'react-redux';
import ReduxPromise             from 'redux-promise';
import ReduxThunk               from 'redux-thunk';

import { 
  VOTE_PROPOSAL,
  UNVOTE_PROPOSAL
} from './proposals.actions';

import { proposal }             from './proposals.reducers';
import categories               from '../categories/categories.reducers';
import districts                from '../districts/districts.reducers';
import filters                  from '../filters/filters.reducers';
import order                    from '../order/order.reducers';

import ProposalShow             from './proposal_show.component';

import pagination               from '../pagination/pagination.reducers';

const middlewares = [ReduxPromise, ReduxThunk];

// if (process.env.NODE_ENV === 'development') {
//   const createLogger = require('redux-logger');
//   const logger = createLogger();
//   middlewares.push(logger);
// }
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

function createReducers(sessionState, participatoryProcessState, decidimIconsUrlState) {
  let session = function (state = sessionState, action) {
    switch (action.type) {
      case VOTE_PROPOSAL:
        return {
          ...state,
          proposal_votes_count: state.proposal_votes_count + 1
        }
      case UNVOTE_PROPOSAL:
        return {
          ...state,
          proposal_votes_count: state.proposal_votes_count - 1
        };
    }
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
    proposal,
    categories,
    districts,
    pagination,
    filters,
    order
  });
}

export default class ProposalApp extends Component {
  render() {
    return (
      <Provider 
      store={createStoreWithMiddleware(createReducers(this.props.session,
                                                      this.props.participatory_process,
                                                      this.props.decidim_icons_url))}>
        <ProposalShow proposalId={this.props.proposalId} />
      </Provider>
    );
  }
}

ProposalApp.propTypes = {
  session: PropTypes.object.isRequired,
  proposalId: PropTypes.string.isRequired,
  participatory_process: PropTypes.object.isRequired,
  decidim_icons_url: PropTypes.string.isRequired
};
