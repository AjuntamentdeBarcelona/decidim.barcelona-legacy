import { SET_FILTER_TEXT } from './filters.actions';

export default function (state = {}, action) {
  switch(action.type) {
    case SET_FILTER_TEXT:
      return {
        ...state,
        text: action.text
      };
  }
  return state;
}
