import { LightningElement } from 'lwc';

export default class Movies extends LightningElement {

  openNewMovieModal() {
    const newMovieModal = this.template.querySelector("c-new-movie-modal-l-w-c");
    newMovieModal.show();
  }
  
  searchMovies(event){
    let movieName= event.detail.movieName;
    this.template.querySelector('c-movies-results-lwc').searchMovies(movieName);

  }


}