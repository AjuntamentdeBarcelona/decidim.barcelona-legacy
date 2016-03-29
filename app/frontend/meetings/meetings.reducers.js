import { 
  FETCH_MEETINGS, 
} from './meetings.actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_MEETINGS:
      return action.payload.data.meetings
  }
  return state;
}
