import { useEffect, useState } from "react";
import {
 getTopMovies,
 searchMovies,
 getGenres,
 getMoviesByGenre,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import styles from "../styles/Home.module.css";
function Home() {
 const [movies, setMovies] = useState([]);
 const [genres, setGenres] = useState([]);
 const [query, setQuery] = useState("");
 const [page, setPage] = useState(1);
 const [selectedMovie, setSelectedMovie] = useState(null);
 useEffect(() => {
   fetchMovies();
   fetchGenres();
 }, [page]);
 const fetchMovies = async () => {
   const res = await getTopMovies(page);
   setMovies(res.data.results);
 };
 const fetchGenres = async () => {
   const res = await getGenres();
   setGenres(res.data.genres);
 };
 const handleSearch = async () => {
   const res = await searchMovies(query);
   setMovies(res.data.results);
 };
 const handleGenre = async (id) => {
   const res = await getMoviesByGenre(id);
   setMovies(res.data.results);
 };
 return (
<div className={styles.container}>
<h1>Movie Portal</h1>
     {/* Search */}
<input
       placeholder="Search movie..."
       onChange={(e) => setQuery(e.target.value)}
     />
<button onClick={handleSearch}>Search</button>
     {/* Genre Filter */}
<select onChange={(e) => handleGenre(e.target.value)}>
<option value="">All Genres</option>
       {genres.map((g) => (
<option key={g.id} value={g.id}>
           {g.name}
</option>
       ))}
</select>
     {/* Movie List */}
     {movies.map((movie) => (
<MovieCard
         key={movie.id}
         movie={movie}
         onClick={setSelectedMovie}
       />
     ))}
     {/* Pagination */}
<button disabled={page === 1} onClick={() => setPage(page - 1)}>
       Prev
</button>
<span> Page {page} </span>
<button onClick={() => setPage(page + 1)}>Next</button>
     {/* Portal */}
<MovieDetails
       movieId={selectedMovie}
       onClose={() => setSelectedMovie(null)}
     />
</div>
 );
}
export default Home;