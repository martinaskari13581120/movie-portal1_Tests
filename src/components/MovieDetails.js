import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getMovieDetails } from "../services/api";
import styles from "../styles/Modal.module.css";
function MovieDetails({ movieId, onClose }) {
 const [movie, setMovie] = useState(null);
 useEffect(() => {
   if (movieId) {
     getMovieDetails(movieId).then((res) => setMovie(res.data));
   }
 }, [movieId]);
 if (!movieId) return null;
 return ReactDOM.createPortal(
<div className={styles.overlay}>
<div className={styles.modal}>
<button onClick={onClose}>Close</button>
       {movie ? (
<>
<h2>{movie.title}</h2>
<p>{movie.release_date?.slice(0, 4)}</p>
<p>{movie.overview}</p>
<p>⭐ {movie.vote_average}</p>
<h3>Cast:</h3>
           {movie.credits?.cast.slice(0, 5).map((c) => (
<p key={c.id}>{c.name}</p>
           ))}
</>
       ) : (
<p>Loading...</p>
       )}
</div>
</div>,
   document.getElementById("portal-root")
 );
}
export default MovieDetails;