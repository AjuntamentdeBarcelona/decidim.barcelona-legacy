import { Component }     from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                        from 'redux';
import { Provider }      from 'react-redux';
import ReduxPromise      from 'redux-promise';

import Meetings          from './meetings.component';

//import {
//  FETCH_PROPOSALS,
//  APPEND_PROPOSALS_PAGE,
//  SET_ORDER
//}                        from './proposals.actions';
import meetings         from './meetings.reducers';
import districts         from '../districts/districts.reducers';
import categories        from '../categories/categories.reducers';
import filters           from '../filters/filters.reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//const order = function (state = getInitialOrderState(), action) {
//  switch (action.type) {
//    case SET_ORDER:
//      return action.order;
//  }
//  return state;
//}
//
//function getInitialOrderState() {
//  let order = "random",
//      matchData;
//
//  matchData = location.search.match(/order=([^&]*)/)
//
//  if (matchData) {
//    order = matchData[1];
//  }
//
//  return order;
//}
//
//const pagination = function (state = {}, action) {
//  switch (action.type) {
//    case FETCH_PROPOSALS:
//    case APPEND_PROPOSALS_PAGE:
//      return action.payload.data.meta
//  }
//  return state;
//}

function createReducers(sessionState) {
  let session = function (state = sessionState, action) {
    return state;
  };

  return combineReducers({
    session, 
    districts,
    categories,
    meetings,
    filters,
  //  order,
  //  pagination
  });
}

export default class MeetingsApp extends Component {
  render() {
    return (
      <Provider 
        store={createStoreWithMiddleware(createReducers(this.props.session))}>
        <Meetings />
      </Provider>
    );
  }
}
