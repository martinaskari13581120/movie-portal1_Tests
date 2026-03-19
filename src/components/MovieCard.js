function MovieCard({ movie, onClick }) {
 return (
<div onClick={() => onClick(movie.id)} style={{ cursor: "pointer" }}>
<h3>{movie.title}</h3>
<p>{movie.release_date?.slice(0, 4)}</p>
<p>⭐ {movie.vote_average}</p>
</div>
 );
}
export default MovieCard;