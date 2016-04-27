import { Component }                         from 'react';
import { connect }                           from 'react-redux';
import { bindActionCreators }                from 'redux';

import { fetchComments, appendCommentsPage } from './comments.actions';

import InfinitePagination                    from '../pagination/infinite_pagination.component';
import Comment                               from './comment.component';
import NewCommentForm                        from './new_comment_form.component';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  
  componentDidMount() {
    const { commentable, fetchComments } = this.props;
    fetchComments(commentable);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    const { commentable } = this.props;

    return (
      <section className="row-full comments">
        <div className="row">
          <div id="comments" className="small-12 column">
            <h2>{I18n.t("proposals.show.comments_title")}</h2>
            <NewCommentForm 
              commentable={commentable}
              visible={commentable.permissions.comment} />
            {this.renderComments()}
          </div>
        </div>
      </section>
    );
  }

  renderComments() {
    const { commentable } = this.props;
    const comments = this.flattenComments(this.props.comments);

    if (comments && comments.length > 0) {
      return (
        <div>
          {
            comments.map(comment => (
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
      let rootComments = comments.filter(c => c.ancestry === null).map(c => Object.assign({}, c)),
          childComments = comments.filter(c => c.ancestry !== null).map(c => Object.assign({}, c));

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
    const { commentable, pagination, appendCommentsPage } = this.props;

    let infinitePaginationActive = !this.state.loading && pagination.current_page < pagination.total_pages;

    if (infinitePaginationActive) {
      return (
        <InfinitePagination 
          onVisible={() => appendCommentsPage(commentable, { 
            page: pagination.current_page + 1
          })} /> 
      );
    }

    return null;
  }
}

function mapStateToProps(state, { commentable }) {
  const resource = state[commentable.type.toLowerCase()];
  const comments = resource && resource.comments;

  return { 
    pagination: state.pagination,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComments, appendCommentsPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
