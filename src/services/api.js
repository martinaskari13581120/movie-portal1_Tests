import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const getTopMovies = (page = 1) => {

  return axios.get(`${BASE_URL}/movie/top_rated`, {

    params: { api_key: API_KEY, page },

  });

};

export const searchMovies = (query) => {

  return axios.get(`${BASE_URL}/search/movie`, {

    params: { api_key: API_KEY, query },

  });

};

export const getGenres = () => {

  return axios.get(`${BASE_URL}/genre/movie/list`, {

    params: { api_key: API_KEY },

  });

};

export const getMoviesByGenre = (genreId) => {

  return axios.get(`${BASE_URL}/discover/movie`, {

    params: { api_key: API_KEY, with_genres: genreId },

  });

};

export const getMovieDetails = (id) => {

  return axios.get(`${BASE_URL}/movie/${id}`, {

    params: { api_key: API_KEY, append_to_response: "credits" },

  });

};
 