import { 
  FETCH_PROPOSALS, 
  APPEND_PROPOSALS_PAGE, 
  VOTE_PROPOSAL 
} from './proposals.actions';

export default function (state = [], action) {
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

const proposal = function (state = {}, action) {
  switch (action.type) {
    case VOTE_PROPOSAL:
      let vote = action.payload.data.vote;

      if (state.id === vote.votable.id) {
        return {
          ...state,
          total_votes: state.total_votes + 1,
          voted: true
        };
      } else {
        return state;
      }
  }
  return state;
}
