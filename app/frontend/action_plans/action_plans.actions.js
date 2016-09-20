import axios from 'axios';

export const API_BASE_URL                = '/api';
export const FETCH_ACTION_PLANS          = 'FETCH_ACTION_PLANS';
export const FETCH_ACTION_PLAN           = 'FETCH_ACTION_PLAN';
export const FETCH_ACTION_PLAN_PROPOSALS = 'FETCH_ACTION_PLAN_PROPOSALS';
export const APPEND_ACTION_PLANS_PAGE    = 'APPEND_ACTION_PLANS_PAGE';
export const DELETE_ACTION_PLAN          = 'DELETE_ACTION_PLAN';
export const UPDATE_ACTION_PLAN          = 'UPDATE_ACTION_PLAN';
export const ADD_ACTION_PLAN_PROPOSAL    = 'ADD_ACTION_PLAN_PROPOSAL';
export const REMOVE_ACTION_PLAN_PROPOSAL = 'REMOVE_ACTION_PLAN_PROPOSAL';
export const FETCH_RELATED_MEETINGS      = 'FETCH_RELATED_MEETINGS';

export function deleteActionPlan(id){
  const request = axios.delete(`${API_BASE_URL}/action_plans/${id}.json`);

  return {
    type: DELETE_ACTION_PLAN,
    payload: request
  };
}

export function changeWeight(id, weight){
  const request = axios.put(`${API_BASE_URL}/action_plans/${id}.json`, {
    action_plan: { weight }
  });

  return {
    type: UPDATE_ACTION_PLAN,
    payload: request
  };
}

export function approveActionPlan(id){
  return updateActionPlan(id, { approved: true});
}

export function updateActionPlan(id, attributes) {
  const request = axios.put(`${API_BASE_URL}/action_plans/${id}.json`, {
    action_plan: attributes
  });

  return {
    type: UPDATE_ACTION_PLAN,
    payload: request
  };
}

export const fetchActionPlans = (options) => (dispatch, getState) => {
  const { participatoryProcessId } = getState();
  options['participatoryProcessId'] = participatoryProcessId;

  const request = buildActionPlansRequest(options);

  dispatch({
    type: FETCH_ACTION_PLANS,
    payload: request
  });

  return request;
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

export function fetchRelatedMeetings(actionPlanId) {
  const request = axios.get(`${API_BASE_URL}/action_plans/${actionPlanId}/meetings.json`);

  return {
    type: FETCH_RELATED_MEETINGS,
    payload: request
  };
}

export function addActionPlanProposal(actionPlanId, proposal) {
  const request = axios.post(`${API_BASE_URL}/action_plans/${actionPlanId}/proposals.json`, {
    proposal_id: proposal.id
  });

  return {
    type: ADD_ACTION_PLAN_PROPOSAL,
    payload: request
  };
}

export function removeActionPlanProposal(actionPlanId, proposal) {
  const request = axios.delete(`${API_BASE_URL}/action_plans/${actionPlanId}/proposals/${proposal.id}.json`);

  return {
    type: REMOVE_ACTION_PLAN_PROPOSAL,
    payload: request
  };
}

export function changeActionPlansProposalLevel(actionPlan, proposal, level) {
  const request = axios.put(`${API_BASE_URL}/action_plans/${actionPlan.id}/proposals/${proposal.id}.json`, {
    level: parseInt(level)
  });

  return {
    type: REMOVE_ACTION_PLAN_PROPOSAL,
    payload: request
  };
}

export function buildActionPlansRequestParams(options = {}){
  let filterString = [], 
      filters,
      filter,
      order,
      page,
      participatoryProcessId,
      seed;

  filters                = options.filters || {};
  page                   = options.page || 1;
  order                  = options.order;
  seed                   = options.seed;
  participatoryProcessId = options.participatoryProcessId;

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

  return {
    search: filters.text,
    filter: filterString,
    page: page,
    order: order,
    random_seed: seed,
    participatory_process_id: participatoryProcessId
  };
}

function buildActionPlansRequest(options = {}) {
  let params = buildActionPlansRequestParams(options);

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
