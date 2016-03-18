export const API_BASE_URL    = '/api';
export const FETCH_PROPOSALS = 'FETCH_PROPOSALS';
export const VOTE_PROPOSAL   = 'VOTE_PROPOSAL';

export function fetchProposals(options = {}) {
  let filterString = [], 
      filters,
      filter,
      data;

  filters = options.filters || {};

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

  data = {
    search: filters.text,
    //tag: tags,
    filter: filterString 
  }

  const request = $.ajax(`${API_BASE_URL}/proposals.json`, { data });

  return {
    type: FETCH_PROPOSALS,
    payload: request
  };
}

export function voteProposal(proposalId) {
  const request = $.ajax(`${API_BASE_URL}/proposals/${proposalId}/votes.json`, { method: 'POST' });

  return {
    type: VOTE_PROPOSAL,
    payload: request
  }
}
