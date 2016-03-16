import { FETCH_DISTRICTS } from './proposals.actions';

export default function (state = {
  districts: []
}, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_DISTRICTS:
      return {
        ...state,
        districts: action.payload.districts
      };
  }
  return state;
}
