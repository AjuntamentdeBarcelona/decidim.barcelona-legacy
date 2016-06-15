import axios from 'axios';

export const API_BASE_URL         = '/api';
export const FETCH_MEETINGS       = 'FETCH_MEETINGS';
export const APPEND_MEETINGS_PAGE = 'APPEND_MEETINGS_PAGE';

export function fetchMeetings(options) {
  return {
    type: FETCH_MEETINGS,
    payload: buildMeetingsRequest(options)
  };
}

export const appendMeetingsPage = ({ page }) => (dispatch, getState) => {
  let { meetings } = getState();

  dispatch({
    type: APPEND_MEETINGS_PAGE,
    meetings,
    page
  });
}


function buildMeetingsRequest(options = {}) {
  let filterString = [], 
      filters,
      filter,
      tags,
      params;

  filters = options.filters || {};

  // TODO: worst name ever
  filter = filters.filter;
  tags = filters.tags;

  for (let name in filter) {
    if(filter[name].length > 0) {
      filterString.push(`${name}=${filter[name].join(',')}`);
    }
  }

  if (filterString.length > 0) {
    filterString = filterString.join(':');
  }

  params = {
    search: filters.text,
    tag: tags,
    filter: filterString
  }

  replaceUrl(params);

  return axios.get(`${API_BASE_URL}/meetings.json`, { params });
}

function replaceUrl(params) {
  if (window.history) {
    let queryParams = [],
        url;

    if (params.search) {
      queryParams.push(`search=${params.search}`);
    }

    if (params.tag && params.tag.length > 0) {
      queryParams.push(`tag=${params.tag}`);
    }

    if (params.filter.length > 0) {
      queryParams.push(`filter=${params.filter}`);
    }

    if (queryParams.length > 0) {
      url = `${location.href.replace(/\?.*/, "")}?${queryParams.join('&')}`;
    }

    params.turbolinks = true;

    history.pushState(params, '', url);
  }
}
