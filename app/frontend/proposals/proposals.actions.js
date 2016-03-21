import axios from 'axios';

export const API_BASE_URL    = '/api';
export const FETCH_PROPOSALS = 'FETCH_PROPOSALS';
export const VOTE_PROPOSAL   = 'VOTE_PROPOSAL';

export function fetchProposals(options = {}) {
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

  const request = axios.get(`${API_BASE_URL}/proposals.json`, { params });

  return {
    type: FETCH_PROPOSALS,
    payload: request
  };
}

export function voteProposal(proposalId) {
  const request = axios.post(`${API_BASE_URL}/proposals/${proposalId}/votes.json`);

  return {
    type: VOTE_PROPOSAL,
    payload: request
  }
}
