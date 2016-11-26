import axios from 'axios';

export const API_BASE_URL         = '/api';
export const FETCH_MEETINGS       = 'FETCH_MEETINGS';
export const APPEND_MEETINGS_PAGE = 'APPEND_MEETINGS_PAGE';

export const fetchMeetings = (options) => (dispatch, getState) => {
  const { participatoryProcess } = getState();
  options['participatoryProcessId'] = participatoryProcess.id;
  options['stepId'] = participatoryProcess.step.id;

  const request = buildMeetingsRequest(options);

  dispatch({
    type: FETCH_MEETINGS,
    payload: request
  });

  return request;
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
      participatoryProcessId,
      stepId,
      params;

  filters = options.filters || {};

  // TODO: worst name ever
  filter                 = filters.filter;
  tags                   = filters.tags;
  participatoryProcessId = options.participatoryProcessId;
  stepId                 = options.stepId;

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
    filter: filterString,
    participatory_process_id: participatoryProcessId,
    step_id: stepId
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

    url = `${location.href.replace(/\?.*/, "")}`;

    if (queryParams.length > 0) {
      url = `${url}?${queryParams.join('&')}`;
    }

    params.turbolinks = true;

    history.pushState(params, '', url);
  }
}
