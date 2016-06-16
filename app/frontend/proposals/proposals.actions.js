import axios from 'axios';

export const API_BASE_URL           = '/api';
export const FETCH_PROPOSALS        = 'FETCH_PROPOSALS';
export const FETCH_PROPOSAL         = 'FETCH_PROPOSAL';
export const UPDATE_PROPOSAL        = 'UPDATE_PROPOSAL';
export const APPEND_PROPOSALS_PAGE  = 'APPEND_PROPOSALS_PAGE';
export const VOTE_PROPOSAL          = 'VOTE_PROPOSAL';
export const FETCH_ANSWER           = 'FETCH_ANSWER';
export const UPDATE_ANSWER          = 'UPDATE_ANSWER';
export const FETCH_RELATED_MEETINGS = 'FETCH_RELATED_MEETINGS';
export const FETCH_REFERENCES       = 'FETCH_REFERENCES';
export const FETCH_ACTION_PLANS     = 'FETCH_ACTION_PLANS';
export const HIDE_PROPOSAL          = 'HIDE_PROPOSAL';
export const HIDE_PROPOSAL_AUTHOR   = 'HIDE_PROPOSAL_AUTHOR';
export const FLAG_PROPOSAL          = 'FLAG_PROPOSAL';
export const UNFLAG_PROPOSAL        = 'UNFLAG_PROPOSAL';

export const fetchProposals = (options) => (dispatch, getState) => {
  const { participatoryProcessId } = getState();
  options['participatoryProcessId'] = participatoryProcessId;

  const request = buildProposalsRequest(options);

  dispatch({
    type: FETCH_PROPOSALS,
    payload: request
  });

  return request;
}

export function fetchProposal(proposalId) {
  const request = axios.get(`${API_BASE_URL}/proposals/${proposalId}.json`);

  return {
    type: FETCH_PROPOSAL,
    payload: request
  };
}

export function updateProposal(proposalId, proposalParams) {
  const request = axios.patch(`${API_BASE_URL}/proposals/${proposalId}.json`, { proposal: proposalParams });

  return {
    type: UPDATE_PROPOSAL,
    payload: request
  };
}

export function appendProposalsPage(options) {
  return {
    type: APPEND_PROPOSALS_PAGE,
    payload: buildProposalsRequest(options)
  };
}

export function voteProposal(proposalId) {
  const request = axios.post(`${API_BASE_URL}/proposals/${proposalId}/votes.json`);

  return {
    type: VOTE_PROPOSAL,
    payload: request
  };
}

export function fetchAnswer(proposalId) {
  const request = axios.get(`${API_BASE_URL}/proposals/${proposalId}/answers.json`);

  return {
    type: FETCH_ANSWER,
    payload: request
  };
}

export function updateAnswer(proposalId, answer, answerParams) {
  const method  = answer ? 'patch' : 'post';
  const request = axios[method](`${API_BASE_URL}/proposals/${proposalId}/answers.json`, {
    answer: answerParams
  });

  return {
    type: UPDATE_ANSWER,
    payload: request
  };
}

export function fetchRelatedMeetings(proposalId) {
  const request = axios.get(`${API_BASE_URL}/proposals/${proposalId}/meetings.json`);

  return {
    type: FETCH_RELATED_MEETINGS,
    payload: request
  };
}

export function fetchReferences(proposalId) {
  const request = axios.get(`${API_BASE_URL}/proposals/${proposalId}/references.json`);

  return {
    type: FETCH_REFERENCES,
    payload: request
  };
}

export function fetchActionPlans(proposalId) {
  const request = axios.get(`${API_BASE_URL}/proposals/${proposalId}/action_plans.json`);

  return {
    type: FETCH_ACTION_PLANS,
    payload: request
  };
}

export function hideProposal(proposalId) {
  const request = axios.patch(`${API_BASE_URL}/proposals/${proposalId}/hide.json`);

  return {
    type: HIDE_PROPOSAL,
    payload: request
  };
}

export function hideProposalAuthor(proposalId) {
  const request = axios.patch(`${API_BASE_URL}/proposals/${proposalId}/author/hide.json`);

  return {
    type: HIDE_PROPOSAL_AUTHOR,
    payload: request
  };
}

export function flagProposal(proposalId) {
  const request = axios.patch(`${API_BASE_URL}/proposals/${proposalId}/flag.json`);

  return {
    type: FLAG_PROPOSAL,
    payload: request
  };
}

export function unFlagProposal(proposalId) {
  const request = axios.patch(`${API_BASE_URL}/proposals/${proposalId}/unflag.json`);

  return {
    type: UNFLAG_PROPOSAL,
    payload: request
  };
}

function buildProposalsRequest(options = {}) {
  let filterString = [], 
      filters,
      filter,
      order,
      page,
      seed,
      participatoryProcessId,
      params;

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

  params = {
    search: filters.text,
    filter: filterString,
    page: page,
    order: order,
    random_seed: seed,
    participatory_process_id: participatoryProcessId
  };

  replaceUrl(params);

  return axios.get(`${API_BASE_URL}/proposals.json`, { params });
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
