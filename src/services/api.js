import Vue from 'vue';
import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://localhost:8081',
  json: true,
});

export default {
  getMovies() {
    return ax.get('/movies');
  },
  addMovie(movie) {
    return ax.post('/movies', movie);
  },
}