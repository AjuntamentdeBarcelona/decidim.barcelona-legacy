var AxisRow = React.createClass({
  handleClick () {
    this.props.onClick(this.props.axis);
  },

  render () {
    var name = this.props.axis.name;
    if(this.props.axis.selected){
      name = <strong>{name}</strong>;
    }

    return (
      <li onClick={this.handleClick}>
        {name}
      </li>
    );
  }
});

var AxisPicker = React.createClass({
  getInitialState () {
    return {
      axis: this.props.axis.map(function(axis){
        return {
          name: axis,
          selected: false
        };
      })
    }
  },

  render () {
    var selected = this.state.axis ? this.state.axis.find(a => a.selected) : null;
    var selectedName = (selected ? selected.name : null)

    var axis = this.state.axis.map(element =>
      <div>
        <input type="hidden" name="whatever" value={selectedName} />
      </div>
    );

    return (
      <ul>
        {axis}
      </ul>
    );
  },

  selectAxis(axis){
    var newAxis = this.props.axis.map(function(a){
      var selected = false;
      if(a === axis.name) selected = true;

      return {
        name: a,
        selected: selected
      }
    });

    this.setState({
      axis: newAxis
    });
  }
});

AxisPicker.propTypes = {
  axis: React.PropTypes.array
};
