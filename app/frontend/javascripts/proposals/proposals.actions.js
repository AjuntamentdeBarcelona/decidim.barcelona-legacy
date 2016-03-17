export const API_BASE_URL = '/api';
export const FETCH_PROPOSALS = 'FETCH_PROPOSALS';

export function fetchProposals (options = {
  filters: {}
}) {
  const request = $.ajax(`${API_BASE_URL}/proposals.json`, {
    data: {
      search: options.filters.text
    }
  });

  return {
    type: FETCH_PROPOSALS,
    payload: request
  };
}
