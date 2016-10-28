import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './comments.actions';

import Loading                  from '../application/loading.component';
import InfinitePagination       from '../pagination/infinite_pagination.component';
import CommentsOrderSelector    from './comments_order_selector.component';
import Comment                  from './comment.component';
import NewCommentForm           from './new_comment_form.component';

import htmlToReact              from '../application/html_to_react';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentWillReceiveProps(newProps) {
    const { order, commentable, fetchComments } = this.props;

    if (order !== newProps.order) {
      this.setState({ loading: true });
      fetchComments(commentable, { order: newProps.order } ).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  render() {
    const { commentable, participatoryProcess } = this.props;
    const { step } = participatoryProcess;
    const { flags } = step;
    const commentsDisabled = flags.proposals_readonly;

    return (
      <section style={{ position: 'relative', minHeight: '30em' }} className="comments">
        {
          (() => {
            if (!commentsDisabled) {
              return (
                <div className="add-coment">
                  <h5 className="section-heading">{I18n.t('components.comments.new_comment.title')}</h5>
                  {this.renderSignInWarning()}
                  <NewCommentForm 
                    commentable={commentable}
                    visible={commentable.permissions.comment} />
                  <span className="register__separator">
                    <span className="register__separator__text"></span>
                  </span>
                </div>
              )
            }
            return null;
          })()
        }
        <div className="row collapse order-by">
          <h2 className="order-by__text section-heading">
            {I18n.t('components.comments.total_comments', { count: commentable.total_comments})}
          </h2>
          <div className="order-by__dropdown order-by__dropdown--right">
            <CommentsOrderSelector />
          </div>
        </div>
        <Loading show={this.state.loading} />
        {this.renderComments()}
      </section>
    );
  }

  renderSignInWarning() {
    const { session } = this.props;

    if (!session.signed_in) {
      return (
        <div className="alert-box radius info">
          {
            htmlToReact(
              I18n.t('proposals.show.login_to_comment', {
                signin: `<a href="/users/sign_in">${I18n.t("votes.signin")}</a>`,
                signup: `<a href="/users/sign_up">${I18n.t("votes.signup")}</a>`
              })
            )
          }
        </div>
      );
    }

    return null;
  }

  renderSummary() {
    const { commentable } = this.props;

    if (commentable.arguable) {
      return (
        <span>
          {I18n.t('comments.form.alignment.positive')}:
          <span className="js-comments-count positive">
          {` ${commentable.total_positive_comments}`}
          </span>,
          {` ${I18n.t('comments.form.alignment.negative')}`}: 
          <span className="js-comments-count negative">
          {` ${commentable.total_negative_comments}`}
          </span>,
          {` ${I18n.t('comments.form.alignment.neutral')}`}: 
          <span className="js-comments-count neutral">
          {` ${commentable.total_neutral_comments}`}
          </span>
        </span>
      );
    } else {
      return (
        <span>{commentable.total_comments}</span>
      );
    }
  }

  renderComments() {
    const { commentable } = this.props;
    const comments = this.flattenComments(this.props.comments);

    if (!this.state.loading && comments && comments.length > 0) {
      return (
        <div>
          {
            comments.filter(c => !c.hidden).map(comment => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                commentable={commentable} />
            ))
          }
          {this.renderInfinitePagination()}
        </div>
      );
    }

    return null;
  }

  flattenComments(comments) {
    if (comments) {
      let rootComments = comments
            .filter(c => c.ancestry === null)
            .map(c => { return { ...c }}),
          childComments = comments
            .filter(c => c.ancestry !== null)
            .map(c => { return { ...c }});

      childComments.forEach(c => {
        let ancestry = c.ancestry.split("/"),
            comment;

        if(ancestry.length > 1) {
          ancestry = ancestry.pop();
          comment = childComments.filter(c => c.id === parseInt(ancestry))[0];
        } else {
          ancestry = ancestry[0];
          comment = rootComments.filter(c => c.id === parseInt(ancestry))[0];
        }

        if (!comment.children) {
          comment.children = [];
        }

        comment.children.push(c);
      });

      return rootComments;
    }
  }

  renderInfinitePagination() {
    const { commentable, order, pagination, appendCommentsPage } = this.props;

    let infinitePaginationActive = !this.state.loading && pagination.current_page < pagination.total_pages;

    if (infinitePaginationActive) {
      return (
        <InfinitePagination 
          onVisible={() => appendCommentsPage(commentable, { 
            page: pagination.current_page + 1,
            order
          })} /> 
      );
    }

    return null;
  }
}

function mapStateToProps(state, { commentable }) {
  const commentableType = commentable.type.charAt(0).toLowerCase() + commentable.type.slice(1);
  const resource = state[commentableType]; //actionplan
  const comments = resource && resource.comments;

  return { 
    session: state.session,
    pagination: state.pagination,
    order: state.order,
    participatoryProcess: state.participatoryProcess,
    commentableType,
    comments
  };
}

export default connect(mapStateToProps, actions)(Comments);

Comments.propTypes = {
  participatoryProcess: PropTypes.object.isRequired,
  order: PropTypes.string.isRequired,
  commentable: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  fetchComments: PropTypes.func.isRequired,
  appendCommentsPage: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
};
