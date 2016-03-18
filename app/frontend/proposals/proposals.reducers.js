import { combineReducers } from 'redux';

import districts           from '../districts/districts.reducers';
import categories          from '../categories/categories.reducers';
import filters             from '../filters/filters.reducers';

import { FETCH_PROPOSALS } from './proposals.actions';

const proposals = function (state = [], action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return action.payload.proposals
  }
  return state;
}

export default combineReducers({
  districts,
  categories,
  proposals,
  filters
});
