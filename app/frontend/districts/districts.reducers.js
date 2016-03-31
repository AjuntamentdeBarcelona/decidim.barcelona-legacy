import { FETCH_DISTRICTS } from './districts.actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DISTRICTS:
      return action.payload.data.districts
  }
  return state;
}
