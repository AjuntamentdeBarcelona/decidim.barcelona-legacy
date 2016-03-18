import { createStore, applyMiddleware } from 'redux';
import { Component }                    from 'react';
import { Provider }                     from 'react-redux';
import ReduxPromise                     from 'redux-promise';

import reducers                         from './proposals.reducers';
import Proposals                        from './proposals.component';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default class ProposalsApp extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Proposals />
      </Provider>
    );
  }
}
