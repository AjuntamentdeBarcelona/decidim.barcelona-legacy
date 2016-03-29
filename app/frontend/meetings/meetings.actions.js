import axios from 'axios';

export const API_BASE_URL   = '/api';
export const FETCH_MEETINGS = 'FETCH_MEETINGS';

export function fetchMeetings(options) {
  return {
    type: FETCH_MEETINGS,
    payload: buildMeetingsRequest(options)
  };
}

function buildMeetingsRequest(options = {}) {
  let filterString = [], 
      filters,
      filter,
      page,
      params;

  filters = options.filters || {};
  page    = options.page || 1;

  // TODO: worst name ever
  filter = filters.filter;

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
    //tag: tags,
    filter: filterString,
    page: page
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
