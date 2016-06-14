import {
  FETCH_PROPOSALS,
  APPEND_PROPOSALS_PAGE
} from '../proposals/proposals.actions';

import {
  FETCH_ACTION_PLANS,
  APPEND_ACTION_PLANS_PAGE
} from '../action_plans/action_plans.actions';

import {
  FETCH_COMMENTS,
  APPEND_COMMENTS_PAGE
} from '../comments/comments.actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
    case APPEND_PROPOSALS_PAGE:
    case FETCH_ACTION_PLANS:
    case APPEND_ACTION_PLANS_PAGE:
    case FETCH_COMMENTS:
    case APPEND_COMMENTS_PAGE:
      if (action.payload.data.meta) {
        let { 
          current_page, 
          next_page, 
          prev_page, 
          total_pages, 
          total_count 
        } = action.payload.data.meta;

        return {
          current_page,
          next_page,
          prev_page,
          total_pages,
          total_count
        };
      }
  }
  return state;
}

