import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { getMovieDetails } from "../services/api";

// Mock API
jest.mock("../services/api", () => ({
  getMovieDetails: jest.fn(),
}));

describe("MovieDetails Component", () => {
  const mockMovie = {
    data: {
      title: "Test Movie",
      release_date: "2024-01-01",
      overview: "Test overview",
      vote_average: 8.5,
      credits: {
        cast: [
          { id: 1, name: "Actor 1" },
          { id: 2, name: "Actor 2" },
          { id: 3, name: "Actor 3" },
        ],
      },
    },
  };

  beforeEach(() => {
    // Create portal root
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);

    getMovieDetails.mockClear();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("renders nothing when movieId is not provided", () => {
    const { container } = render(<MovieDetails />);
    expect(container).toBeEmptyDOMElement();
  });

  test("shows loading initially and then displays movie data", async () => {
    getMovieDetails.mockResolvedValueOnce(mockMovie);

    render(<MovieDetails movieId={1} onClose={jest.fn()} />);

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for API response
    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });

    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
    expect(screen.getByText(/⭐ 8.5/)).toBeInTheDocument();

    // Cast
    expect(screen.getByText("Actor 1")).toBeInTheDocument();
    expect(screen.getByText("Actor 2")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    getMovieDetails.mockResolvedValueOnce(mockMovie);

    const onCloseMock = jest.fn();

    render(<MovieDetails movieId={1} onClose={onCloseMock} />);

    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});