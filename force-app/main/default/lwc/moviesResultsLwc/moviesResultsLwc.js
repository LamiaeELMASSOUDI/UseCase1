import { LightningElement, track, wire , api} from 'lwc';
import getMovies from '@salesforce/apex/MovieController.getMovies';

export default class MoviesResultsLwc extends LightningElement {

  movieSearchName = '';
  @api selectedMovie;
  @track movies = [];
  @wire(getMovies, {movieSearchName : "$movieSearchName"})
  wiredMovies({ data,error }) {
    if (data) {
      this.movies = data;
    } else if (error) {
      console.log(error);
    }
  }
  @api
  searchMovies(movieName){
    this.movieSearchName = movieName;
  }

  handleMovieClick(event) {
    const movieId = event.currentTarget.dataset.movieId;
    const clickedMovie = this.movies.find(movie => movie.Id === movieId);
    this.selectedMovie = clickedMovie;
    const movieSelectedEvent =  new CustomEvent("movieSelected", {
      detail: {
        movieId: movieId
      }
    }); 
    this.dispatchEvent(movieSelectedEvent);


  }
 
}