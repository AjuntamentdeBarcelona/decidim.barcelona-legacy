import { SET_FILTER_TEXT, SET_FILTER_GROUP } from './filters.actions';

export default function (state = {
  filter: {}
}, action) {
  switch(action.type) {
    case SET_FILTER_TEXT:
      return {
        ...state,
        text: action.text
      };
    case SET_FILTER_GROUP:
      let filter = state.filter;

      filter[action.name] = action.value;

      if (action.name === 'category_id') {
        filter["subcategory_id"] = []
      }

      return {
        ...state,
        filter
      };
  }
  return state;
}
