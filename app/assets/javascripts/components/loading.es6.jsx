class Loading extends React.Component {
  render() {
    if (this.props.show) {
      return (
        <div className="loading-component"></div>
      )
    }
    return null;
  }
}
