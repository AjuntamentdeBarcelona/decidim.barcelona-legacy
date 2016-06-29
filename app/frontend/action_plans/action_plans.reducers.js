import { combineReducers } from 'redux';

import {
  FETCH_ACTION_PLANS, 
  FETCH_ACTION_PLAN,
  FETCH_ACTION_PLAN_PROPOSALS,
  FETCH_RELATED_MEETINGS,
  APPEND_ACTION_PLANS_PAGE,
  DELETE_ACTION_PLAN,
  UPDATE_ACTION_PLAN,
  ADD_ACTION_PLAN_PROPOSAL,
  REMOVE_ACTION_PLAN_PROPOSAL
} from './action_plans.actions';

import { comments } from  '../comments/comments.reducers';
import { ADD_NEW_COMMENT } from '../comments/comments.actions';

export const actionPlans = function (state = [], action) {
  switch (action.type) {
    case FETCH_ACTION_PLANS:
      return action.payload.data.action_plans
    case APPEND_ACTION_PLANS_PAGE:
      return [
        ...state,
        ...action.payload.data.action_plans
      ];
  }
  return state;
}

export const actionPlan = function (state = {}, action) {
  let actionPlan, actionPlansProposals, meetings, comment;

  switch (action.type) {
    case UPDATE_ACTION_PLAN:
      return {
          ...state,
        ...action.payload.data.action_plan
      };
    case FETCH_ACTION_PLAN:
      actionPlan = action.payload.data.action_plan;

      return {
        ...actionPlan,
        proposals: state.proposals
      };
    case FETCH_ACTION_PLAN_PROPOSALS:
    case ADD_ACTION_PLAN_PROPOSAL:
    case REMOVE_ACTION_PLAN_PROPOSAL:
      actionPlansProposals = action.payload.data.action_plans_proposals;

      return {
        ...state,
        actionPlansProposals
      };
    case FETCH_RELATED_MEETINGS:
      meetings = action.payload.data.meetings;

      return {
        ...state,
        meetings
      }
    case DELETE_ACTION_PLAN:
      return {
        ...state,
        deleted: true
      };
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
      }
  }
}
