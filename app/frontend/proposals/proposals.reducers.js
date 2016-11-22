import { combineReducers } from 'redux';

import { 
  FETCH_PROPOSALS, 
  FETCH_PROPOSAL, 
  UPDATE_PROPOSAL,
  APPEND_PROPOSALS_PAGE, 
  VOTE_PROPOSAL,
  UNVOTE_PROPOSAL,
  FETCH_ANSWER,
  UPDATE_ANSWER,
  FETCH_RELATED_MEETINGS,
  FETCH_REFERENCES,
  FETCH_ACTION_PLANS,
  HIDE_PROPOSAL,
  HIDE_PROPOSAL_AUTHOR,
  FLAG_PROPOSAL,
  UNFLAG_PROPOSAL
} from './proposals.actions';

import { ADD_NEW_COMMENT } from '../comments/comments.actions';

import { 
  FOLLOW, 
  UNFOLLOW, 
  FETCH_FOLLOW 
} from '../follows/follows.actions';

import { comments } from  '../comments/comments.reducers';

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
    case UNVOTE_PROPOSAL:
    case FETCH_ANSWER:
      return state.map(p => proposal(p, action));
  }
  return state;
}

export const proposal = function (state = {}, action) {
  let follow = null; 
  let proposal, author, meetings, actionPlans, references, answer, vote, comment;

  switch (action.type) {
    case FETCH_PROPOSAL:
    case UPDATE_PROPOSAL:
    case HIDE_PROPOSAL:
    case FLAG_PROPOSAL:
    case UNFLAG_PROPOSAL:
      proposal = action.payload.data.proposal;

      return {
        ...proposal,
        follow: state.follow,
        meetings: state.meetings,
        references: state.references,
        comments: state.comments
      }
    case FOLLOW:
      follow = action.payload.data.follow;

      if (follow.following_type === "Proposal" && follow.following_id === state.id) {
        return {
          ...state,
          follow
        };
      }

      return state;
    case FETCH_FOLLOW:
      [follow] = action.payload.data.follows;

      if (follow && follow.following_type === "Proposal" && follow.following_id === state.id) {
        return {
          ...state,
          follow
        };
      }

      return state;
    case UNFOLLOW:
      follow = action.payload.data.follow;

      if (follow.following_type === "Proposal" && follow.following_id === state.id) {
        return {
          ...state,
          follow: null
        };
      }

      return state;
    case HIDE_PROPOSAL_AUTHOR:
      author = action.payload.data.user;

      return {
        ...state,
        author
      }
    case FETCH_RELATED_MEETINGS:
      meetings = action.payload.data.meetings;

      return {
        ...state,
        meetings
      };
    case FETCH_REFERENCES:
      references = action.payload.data.proposals;

      return {
        ...state,
        references
      };
    case FETCH_ACTION_PLANS:
      actionPlans = action.payload.data.action_plans;

      return {
          ...state,
        actionPlans
      };
    case FETCH_ANSWER:
    case UPDATE_ANSWER:
      if (action.payload.data) {
        answer = action.payload.data.proposal_answer;

        if (state.id === answer.proposal_id) {
          return {
            ...state,
            answer
          };
        }
      }
      return state;
    case VOTE_PROPOSAL:
      vote = action.payload.data.vote;

      if (state.id === vote.votable.id) {
        return {
          ...state,
          total_votes: state.total_votes + 1,
          voted: true
        };
      }
      return state;
    case UNVOTE_PROPOSAL:
      vote = action.payload.data.vote;

      if (state.id === vote.votable.id) {
        return {
          ...state,
          total_votes: state.total_votes - 1,
          voted: false
        };
      }
      return state;
    case ADD_NEW_COMMENT:
      comment = action.payload.data.comment;

      return {
        ...state,
        total_comments: state.total_comments + 1,
        total_positive_comments: comment.alignment > 0 ? 
          state.total_positive_comments + 1 : state.total_positive_comments,
        total_negative_comments: comment.alignment < 0 ? 
          state.total_negative_comments + 1 : state.total_negative_comments,
        total_neutral_comments: comment.alignment === 0 ? 
          state.total_neutral_comments + 1 : state.total_neutral_comments,
        comments: comments(state.comments, action)
      };
    default:
      return {
        ...state,
        ...combineReducers({ 
          comments 
        })({ 
          comments: state.comments 
        }, action)
      };
  }
}
