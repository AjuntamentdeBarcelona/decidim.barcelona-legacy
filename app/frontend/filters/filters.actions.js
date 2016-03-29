export const SET_FILTER_TEXT  = 'SET_FILTER_TEXT';
export const SET_FILTER_GROUP = 'SET_FILTER_GROUP';
export const TOGGLE_TAG       = 'TOGGLE_TAG';
export const CLEAR_FILTERS    = 'CLEAR_FILTERS';

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

export function toggleTag (tag) {
  return {
    type: TOGGLE_TAG,
    tag
  }
}

export function clearFilters () {
  return {
    type: CLEAR_FILTERS
  }
}
