import axios from 'axios';

export const API_BASE_URL                = '/api';
export const FETCH_ACTION_PLANS          = 'FETCH_ACTION_PLANS';
export const FETCH_ACTION_PLAN           = 'FETCH_ACTION_PLAN';
export const FETCH_ACTION_PLAN_PROPOSALS = 'FETCH_ACTION_PLAN_PROPOSALS';
export const APPEND_ACTION_PLANS_PAGE    = 'APPEND_ACTION_PLANS_PAGE';

export function fetchActionPlans(options) {
  return {
    type: FETCH_ACTION_PLANS,
    payload: buildActionPlansRequest(options)
  };
}

export function fetchActionPlan(actionPlanId) {
  const request = axios.get(`${API_BASE_URL}/action_plans/${actionPlanId}.json`);

  return {
    type: FETCH_ACTION_PLAN,
    payload: request
  };
}

export function appendActionPlansPage(options) {
  return {
    type: APPEND_ACTION_PLANS_PAGE,
    payload: buildActionPlansRequest(options)
  };
}

export function fetchActionPlanProposals(actionPlanId) {
  const request = axios.get(`${API_BASE_URL}/action_plans/${actionPlanId}/proposals.json`);

  return {
    type: FETCH_ACTION_PLAN_PROPOSALS,
    payload: request
  };
}

function buildActionPlansRequest(options = {}) {
  let filterString = [], 
      filters,
      filter,
      order,
      page,
      seed,
      params;

  filters = options.filters || {};
  page    = options.page || 1;
  order   = options.order;
  seed    = options.seed;

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
    filter: filterString,
    page: page,
    order: order,
    random_seed: seed
  };

  replaceUrl(params);

  return axios.get(`${API_BASE_URL}/action_plans.json`, { params });
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

    if (params.order) {
      queryParams.push(`order=${params.order}`);
    }

    if (params.random_seed) {
      queryParams.push(`random_seed=${params.random_seed}`);
    }

    if (queryParams.length > 0) {
      url = `${location.href.replace(/\?.*/, "")}?${queryParams.join('&')}`;
    }

    params.turbolinks = true;

    history.pushState(params, '', url);
  }
}
