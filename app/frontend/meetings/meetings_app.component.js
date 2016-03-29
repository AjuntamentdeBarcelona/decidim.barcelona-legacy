import { Component }       from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers
}                          from 'redux';
import { Provider }        from 'react-redux';
import ReduxPromise        from 'redux-promise';

import Meetings            from './meetings.component';

import { FETCH_MEETINGS }  from './meetings.actions';

import meetings            from './meetings.reducers';
import districts           from '../districts/districts.reducers';
import categories          from '../categories/categories.reducers';
import filters             from '../filters/filters.reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const pagination = function (state = {}, action) {
  switch (action.type) {
    case FETCH_MEETINGS:
      return action.payload.data.meta
  }
  return state;
}

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
    pagination
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
