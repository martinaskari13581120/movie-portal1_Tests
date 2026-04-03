import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./MovieCard";

test("renders movie title and handles click", () => {
  const handleClick = jest.fn();

  const mockMovie = { id: 1, title: "Inception" };

  render(<MovieCard movie={mockMovie} onClick={handleClick} />);

  expect(screen.getByText("Inception")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Inception"));

  expect(handleClick).toHaveBeenCalledWith(mockMovie.id);
});