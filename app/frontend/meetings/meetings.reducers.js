import { 
  FETCH_MEETINGS, 
  APPEND_MEETINGS_PAGE
} from './meetings.actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_MEETINGS:
      return action.payload.data.meetings
    case APPEND_MEETINGS_PAGE:
      return [
        ...state,
        ...action.payload.data.meetings
      ];
  }
  return state;
}
