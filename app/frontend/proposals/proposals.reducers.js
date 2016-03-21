import { combineReducers }                from 'redux';

import districts                          from '../districts/districts.reducers';
import categories                         from '../categories/categories.reducers';
import filters                            from '../filters/filters.reducers';

import { 
  FETCH_PROPOSALS, 
  APPEND_PROPOSALS_PAGE, 
  VOTE_PROPOSAL,
  SET_ORDER
} from './proposals.actions';

const pagination = function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
    case APPEND_PROPOSALS_PAGE:
      return action.payload.data.meta
  }
  return state;
}

const proposals = function (state = [], action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return action.payload.data.proposals
    case APPEND_PROPOSALS_PAGE:
      return [
        ...state,
        ...action.payload.data.proposals
      ];
    case VOTE_PROPOSAL:
      return state.map(p => proposal(p, action));
  }
  return state;
}

const proposal = function (state = {}, action) {
  switch (action.type) {
    case VOTE_PROPOSAL:
      let vote = action.payload.data.vote;

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

const order = function (state = getInitialOrderState(), action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
  }
  return state;
}

export default combineReducers({
  districts,
  categories,
  proposals,
  filters,
  order,
  pagination
});

function getInitialOrderState() {
  let order = "random",
      matchData;

  matchData = location.search.match(/order=([^&]*)/)

  if (matchData) {
    order = matchData[1];
  }

  return order;
}
