import { Component, PropTypes } from 'react';

import htmlToReact from '../application/html_to_react';

export default class Pagination extends Component {
  render () {
    return (
      <div className="pagination-centered">
        <nav>
          <ul className="pagination">
            { this.renderPrevLinks() }
            { this.renderPaginationLinks() }
            { this.renderNextLinks() }
          </ul>
        </nav>
      </div>
    )
  }

  renderPrevLinks() {
    if (this.props.currentPage > 1) {
      return [
        <li key="first_page">
          <a onClick={() => this.props.onSetCurrentPage(1)}>
            {htmlToReact(I18n.t("views.pagination.first"))}
          </a>
        </li>,
        <li key="prev_page">
          <a rel="prev" onClick={() => this.props.onSetCurrentPage(this.props.currentPage - 1)}>
            {htmlToReact(I18n.t("views.pagination.previous"))}
          </a>
        </li>
      ]
    }
  }

  renderPaginationLinks() {
    let result = [],
        initialPage,
        lastPage;

    initialPage = this.props.currentPage - (this.props.maxPages / 2);
    initialPage = initialPage < 1 ? 1 : initialPage;

    lastPage = this.props.currentPage + (this.props.maxPages / 2);
    lastPage = lastPage > this.props.totalPages ? this.props.totalPages : lastPage;

    if (this.props.totalPages > 1) {
      for (let i = initialPage; i <= lastPage; i += 1) {
        result.push(
          <li className={this.props.currentPage === i ? 'current': ''} key={`page_${i}`}>
            <a onClick={() => this.props.onSetCurrentPage(i)}>{i}</a>
          </li>
        )
      }
    }

    if (this.props.totalPages > lastPage) {
      result.push(
        <li key="truncate">
          {htmlToReact(I18n.t("views.pagination.truncate"))}
        </li>
      )
    }
    
    return result;
  }

  renderNextLinks() {
    if (this.props.currentPage < this.props.totalPages) {
      return [
        <li key="next_page">
          <a rel="next" onClick={() => this.props.onSetCurrentPage(this.props.currentPage + 1)}>
            {htmlToReact(I18n.t("views.pagination.next"))}
          </a>
        </li>,
        <li key="last_page">
          <a onClick={() => this.props.onSetCurrentPage(this.props.totalPages)}>
            {htmlToReact(I18n.t("views.pagination.last"))}
          </a>
        </li>
      ]
    }
  }
}

Pagination.defaultProps = { 
  maxPages: 10
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onSetCurrentPage: PropTypes.func.isRequired
};
