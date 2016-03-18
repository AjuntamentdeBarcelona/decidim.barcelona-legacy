import { FETCH_CATEGORIES } from './categories.actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload.categories
  }
  return state;
}
