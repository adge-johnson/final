var React = require('react')
var SortBarItem = require('./SortBarItem')

var SortBar = React.createClass({
  render: function() {
    return (
      <div className="sort row">
        <div className="col-sm-12">
          <ul className="nav nav-pills">
            <SortBarItem view="movies" title="Latest Releases" currentView={this.props.currentView} viewChanged={this.props.viewChanged} />
            <SortBarItem view="movie-list" title="A-Z" currentView={this.props.currentView} viewChanged={this.props.viewChanged} />
            <SortBarItem view="theatres-map" title="Where to Watch" currentView={this.props.currentView} viewChanged={this.props.viewChanged} />
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = SortBar
