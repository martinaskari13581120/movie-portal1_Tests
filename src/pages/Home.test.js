import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import * as api from "../services/api";

// Mock API calls
jest.mock("../services/api", () => ({
  getTopMovies: jest.fn(),
  searchMovies: jest.fn(),
  getGenres: jest.fn(),
  getMoviesByGenre: jest.fn(),
}));

// Mock MovieCard
jest.mock("../components/MovieCard", () => ({ movie, onClick }) => (
  <div onClick={() => onClick(movie.id)} data-testid="movie-card">
    {movie.title}
  </div>
));

// Mock MovieDetails
jest.mock("../components/MovieDetails", () => ({ movieId, onClose }) => {
  if (!movieId) return null;
  return (
    <div>
      <button onClick={onClose}>Close</button>
      <div>MovieDetails</div>
    </div>
  );
});

const mockMovies = [
  { id: 1, title: "Movie 1" },
  { id: 2, title: "Movie 2" },
];

beforeEach(() => {
  api.getTopMovies.mockResolvedValue({
    data: { results: mockMovies },
  });

  api.getGenres.mockResolvedValue({
    data: { genres: [{ id: 1, name: "Action" }] },
  });

  api.searchMovies.mockResolvedValue({
    data: { results: mockMovies },
  });

  api.getMoviesByGenre.mockResolvedValue({
    data: { results: mockMovies },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders movie list", async () => {
  render(<Home />);

  expect(await screen.findByText("Movie 1")).toBeInTheDocument();
  expect(screen.getByText("Movie 2")).toBeInTheDocument();
});

test("next button loads next page", async () => {
  render(<Home />);

  await screen.findByText("Movie 1");

  fireEvent.click(screen.getByText(/next/i));

  await waitFor(() => {
    expect(api.getTopMovies).toHaveBeenCalledTimes(2);
  });
});

test("prev button is disabled on first page", async () => {
  render(<Home />);
  await screen.findByText("Movie 1");

  expect(screen.getByText(/prev/i)).toBeDisabled();
});

test("search movies works", async () => {
  render(<Home />);

  await screen.findByText("Movie 1");

  fireEvent.change(screen.getByPlaceholderText(/search movie/i), {
    target: { value: "test" }
  });

  fireEvent.click(screen.getByText(/search/i));

  await waitFor(() => {
    expect(api.searchMovies).toHaveBeenCalled();
  });
});