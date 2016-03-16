import { FETCH_DISTRICTS, FETCH_CATEGORIES } from './proposals.actions';

export default function (state = {
  districts: [],
  categories: []
}, action) {
  switch (action.type) {
    case FETCH_DISTRICTS:
      return {
        ...state,
        districts: action.payload.districts
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      };
  }
  return state;
}
