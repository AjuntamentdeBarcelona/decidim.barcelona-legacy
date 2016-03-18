import { combineReducers }                from 'redux';

import districts                          from '../districts/districts.reducers';
import categories                         from '../categories/categories.reducers';
import filters                            from '../filters/filters.reducers';

import { FETCH_PROPOSALS, VOTE_PROPOSAL } from './proposals.actions';

const pagination = function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return action.payload.meta
  }
  return state;
}

const proposals = function (state = [], action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return action.payload.proposals
    case VOTE_PROPOSAL:
      return state.map(p => proposal(p, action));
  }
  return state;
}

const proposal = function (state = {}, action) {
  switch (action.type) {
    case VOTE_PROPOSAL:
      let vote = action.payload.vote;

      if (state.id === vote.votable.id) {
        return {
          ...state,
          total_votes: state.total_votes + 1,
          voted: true
        };
      } else {
        return state;
      }
  }
  return state;
}

export default combineReducers({
  districts,
  categories,
  proposals,
  filters,
  pagination
});
