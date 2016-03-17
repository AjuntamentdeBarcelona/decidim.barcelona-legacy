export const SET_FILTER_TEXT  = 'SET_FILTER_TEXT';
export const SET_FILTER_GROUP = 'SET_FILTER_GROUP';

export function setFilterText (text) {
  return {
    type: SET_FILTER_TEXT,
    text
  }
}

export function setFilterGroup (name, value) {
  return {
    type: SET_FILTER_GROUP,
    name,
    value
  }
}
