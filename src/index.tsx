import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import PersonContextProvider from "./contexts/personContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import PersonDetailsPage from "./pages/personDetailsPage";
import MustWatchPage from "./pages/mustWatchPage";
import LoginPage from "./pages/login";
import ProtectedRoute from "./components/protectedRoute";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <PersonContextProvider>
            <Routes>
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route
                path="/movies/favourites"
                element={<FavouriteMoviesPage />}
              />
              <Route
                path="/actors/favourites"
                element={<FavouriteActorsPage />}
              />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route
                path="/movies/now-playing"
                element={<NowPlayingMoviesPage />}
              />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route
                path="/movies/top-rated"
                element={<TopRatedMoviesPage />}
              />
              <Route
                path="/reviews/form"
                element={
                  <ProtectedRoute>
                    <AddMovieReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-fantasy-movies"
                element={
                  <ProtectedRoute>
                    <FantasyMoviePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/person/:id" element={<PersonDetailsPage />} />
              <Route
                path="/my-must-watch-movies"
                element={
                  <ProtectedRoute>
                    <MustWatchPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </PersonContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
