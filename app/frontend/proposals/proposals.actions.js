import axios from 'axios';

export const API_BASE_URL          = '/api';
export const FETCH_PROPOSALS       = 'FETCH_PROPOSALS';
export const APPEND_PROPOSALS_PAGE = 'APPEND_PROPOSALS_PAGE';
export const VOTE_PROPOSAL         = 'VOTE_PROPOSAL';
export const SET_ORDER             = 'SET_ORDER';

export function fetchProposals(options) {
  return {
    type: FETCH_PROPOSALS,
    payload: buildProposalsRequest(options)
  };
}

export function appendProposalsPage(options) {
  return {
    type: APPEND_PROPOSALS_PAGE,
    payload: buildProposalsRequest(options)
  }
}

export function voteProposal(proposalId) {
  const request = axios.post(`${API_BASE_URL}/proposals/${proposalId}/votes.json`);

  return {
    type: VOTE_PROPOSAL,
    payload: request
  }
}

export function setOrder(order) {
  return {
    type: SET_ORDER,
    order
  }
}

function buildProposalsRequest(options = {}) {
  let filterString = [], 
      filters,
      filter,
      order,
      page,
      params;

  filters = options.filters || {};
  page    = options.page || 1;
  order   = options.order;

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
    page: page,
    order: order
  }

  return axios.get(`${API_BASE_URL}/proposals.json`, { params });
}
