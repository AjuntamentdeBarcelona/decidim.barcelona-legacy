import { 
  FETCH_PROPOSALS, 
  FETCH_PROPOSAL, 
  UPDATE_PROPOSAL,
  APPEND_PROPOSALS_PAGE, 
  VOTE_PROPOSAL,
  UPDATE_ANSWER
} from './proposals.actions';

export const proposals = function (state = [], action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return action.payload.data.proposals
    case APPEND_PROPOSALS_PAGE:
      return [
        ...state,
        ...action.payload.data.proposals
      ];
    case VOTE_PROPOSAL:
      return state.map(p => proposal(p, action));
  }
  return state;
}

export const proposal = function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROPOSAL:
    case UPDATE_PROPOSAL:
      return action.payload.data.proposal;
    case UPDATE_ANSWER:
      let answer = action.payload.data.proposal_answer;

      if (state.id === answer.proposal_id) {
        return {
          ...state,
          answer
        };
      }
      return state;
    case VOTE_PROPOSAL:
      let vote = action.payload.data.vote;

      if (state.id === vote.votable.id) {
        return {
          ...state,
          total_votes: state.total_votes + 1,
          voted: true
        };
      }
      return state;
  }
  return state;
}
