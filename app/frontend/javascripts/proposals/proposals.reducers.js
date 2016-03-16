//import { combineReducers } from 'redux';

//const rootReducer = combineReducers({
//  weather: WeatherReducer
//});

//export default rootReducer;

export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_TEST':
      return { test: action.payload };
  }
  return state;
}
