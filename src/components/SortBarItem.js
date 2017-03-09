var React = require('react')

var SortBarItem = React.createClass({
  render: function() {
    return (
      <li className={this.props.currentView === this.props.view ? "active" : ""}>
        <a href="#" onClick={(event) => this.props.viewChanged(event, this.props.view)}>{this.props.title}</a>
      </li>
    )
  }
})

module.exports = SortBarItem
