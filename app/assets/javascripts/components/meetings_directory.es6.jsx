class MeetingsDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: this.props.meetings,
      filter: this.props.filter,
      tagCloud: this.props.tagCloud,
      loading: false
    };
  }

  render () {
    return (
      <div className="meetings-directory">
        <MeetingsMap className="meetings-map" meetings={this.state.meetings} />

        <div className="meetings-directory-content">
          <aside className="filters sidebar" role="complementary">
            <MeetingsFilter 
              filterUrl={this.props.filterUrl}
              filter={this.state.filter}
              districts={this.props.districts} 
              meetings={this.state.meetings} 
              categories={this.props.categories}
              subcategories={this.props.subcategories} 
              tagCloud={this.state.tagCloud}
              tagsEnabled={this.props.tagsEnabled}
              onLoading={() => this.setState({ loading: true })}
              onFilterResult={({ meetings, filter, tag_cloud }) => this.setState({ meetings, filter, tagCloud: tag_cloud, loading: false })} />
          </aside>

          <div className="meetings-list-container">
            <MeetingsList meetings={this.state.meetings} loading={ this.state.loading }/>
          </div>
        </div>
      </div>
    );
  }
}
