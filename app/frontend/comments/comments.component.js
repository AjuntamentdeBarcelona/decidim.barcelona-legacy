import { Component }                         from 'react';
import { connect }                           from 'react-redux';
import { bindActionCreators }                from 'redux';

import { fetchComments, appendCommentsPage } from './comments.actions';

import Loading                               from '../application/loading.component';
import InfinitePagination                    from '../pagination/infinite_pagination.component';
import Comment                               from './comment.component';

export class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  
  componentDidMount() {
    const { 
      commentableId, 
      commentableType, 
      commentableAuthorId,
      fetchComments
    } = this.props;

    fetchComments({ commentableId, commentableType });
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    const { commentableAuthorId } = this.props;
    const comments = this.flattenComments(this.props.comments);

    if (comments && comments.length > 0) {
      return (
        <section className="row-full comments">
          <div className="row">
            <Loading show={this.state.loading} />
            <div id="comments" className="small-12 column">
              <h2>{I18n.t("proposals.show.comments_title")}</h2>
              {
                comments.map(comment => (
                  <Comment 
                    key={comment.id} 
                    comment={comment} 
                    commentableAuthorId={commentableAuthorId} />
                ))
              }
            </div>
            {this.renderInfinitePagination()}
          </div>
        </section>
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
    const { 
      commentableId, 
      commentableType, 
      pagination,
      appendCommentsPage
    } = this.props;

    let infinitePaginationActive = !this.state.loading && pagination.current_page < pagination.total_pages;

    if (infinitePaginationActive) {
      return (
        <InfinitePagination 
          onVisible={() => appendCommentsPage({ 
            commentableId,
            commentableType,
            page: pagination.current_page + 1
          })} /> 
      );
    }

    return null;
  }
}

function mapStateToProps(state, { commentableType }) {
  const resource = state[commentableType.toLowerCase()];
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
