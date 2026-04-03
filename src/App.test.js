import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

jest.mock("./services/api", () => ({
  getTopMovies: jest.fn(),
  getGenres: jest.fn(),
}));

import App from "./App";
import { getTopMovies, getGenres } from "./services/api";

describe("App Component", () => {
  beforeEach(() => {
    getTopMovies.mockResolvedValue({
      data: { results: [{ id: 1, title: "Movie 1" }] },
    });

    getGenres.mockResolvedValue({
      data: { genres: [{ id: 1, name: "Action" }] },
    });
  });

  test("renders without crashing", async () => {
  render(<App />);
  
  const text = await screen.findByText(/movie/i);
  expect(text).toBeInTheDocument();
});
});