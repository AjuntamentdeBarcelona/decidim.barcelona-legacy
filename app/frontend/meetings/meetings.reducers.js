import { 
  FETCH_MEETINGS, 
  APPEND_MEETINGS_PAGE
} from './meetings.actions';

export const PER_PAGE = 15;

export const defaultDateFilter = (state = "", action) => {
  switch (action.type) {
    case FETCH_MEETINGS:
      return action.payload.data.meta.default_date_filter;
  }
  return state;
};

export const meetings = (state = [], action) => {
  switch (action.type) {
    case FETCH_MEETINGS:
      return action.payload.data.meetings
  }
  return state;
}

export const visibleMeetings = (state = [], action) => {
  let meetings, page;

  switch (action.type) {
    case FETCH_MEETINGS:
      return action.payload.data.meetings.slice(0, PER_PAGE);
    case APPEND_MEETINGS_PAGE:
      meetings = action.meetings;
      page = action.page;

      return [
        ...state,
        ...meetings.slice((page - 1) * PER_PAGE, page * PER_PAGE)
      ];
    default:
      return state;
  }
}
