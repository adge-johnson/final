// React
var React = require('react')
var ReactDOM = require('react-dom')

// Google Maps
var ReactGMaps = require('react-gmaps')
var {Gmaps, Marker} = ReactGMaps

// Movie data
var movieData = require('./data/movies.json')
var theatres = require('./data/theatres.json')

// Components
var Header = require('./components/Header')
var MovieDetails = require('./components/MovieDetails')
var MovieList = require('./components/MovieList')
var NoCurrentMovie = require('./components/NoCurrentMovie')
var SortBar = require('./components/SortBar')

// Firebase configuration
var Rebase = require('re-base')
var base = Rebase.createClass({
  apiKey: "AIzaSyBLFw1Whu1X9NWRNZLxvhdwHWeNkcP7iVI",   // replace with your Firebase application's API key
  databaseURL: "https://buyflix-a026e.firebaseio.com/", // replace with your Firebase application's database URL
})

var App = React.createClass({
  movieClicked: function(movie) {
    this.setState({
      currentMovie: movie
    })
  },
  movieWatched: function(movie) {
    var existingMovies = this.state.movies
    var moviesWithWatchedMovieRemoved = existingMovies.filter(function(existingMovie) {
      return existingMovie.id !== movie.id
    })
    this.setState({
      movies: moviesWithWatchedMovieRemoved,
      currentMovie: null
    })
  },
  resetMovieListClicked: function() {
    this.setState({
      movies: movieData.sort(this.movieCompareByReleased)
    })
  },
  viewChanged: function(view) {
    // View is either "latest" (movies sorted by release), "alpha" (movies
    // sorted A-Z), or "map" (the data visualized)
    // We should probably do the sorting and setting of movies in state here.
    // You should really look at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    this.setState({
      currentView: view
    })
  },
  renderMovieDetails: function() {
    if (this.state.currentMovie == null) {
      return <NoCurrentMovie resetMovieListClicked={this.resetMovieListClicked} />
    } else {
      return <MovieDetails movie={this.state.currentMovie}
                           movieWatched={this.movieWatched} />
    }
  },
  renderMainSection: function() {
    if (this.state.currentView === 'map') {
      return <TheatreMap />)
    } else if (this.state.currentView === "movielist")
      return <MovieList />
    }
  },
  movieCompareByTitle: function(movieA, movieB) {
    if (movieA.title < movieB.title) {
      return -1
    } else if (movieA.title > movieB.title) {
      return 1
    } else {
      return 0
    }
  },
  movieCompareByReleased: function(movieA, movieB) {
    if (movieA.released > movieB.released) {
      return -1
    } else if (movieA.released < movieB.released) {
      return 1
    } else {
      return 0
    }
  },
  getInitialState: function() {
    return {
      movies: movieData.sort(this.movieCompareByReleased),
      currentMovie: null,
      currentView: 'latest'
    }
  },
  componentDidMount: function() {
    base.syncState('/movies', { context: this, state: 'movies', asArray: true })
  },
  render: function() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <SortBar movieCount={this.state.movies.length} viewChanged={this.viewChanged} />
        <div className="main row">
          {this.renderMainSection()}
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById("app"))
