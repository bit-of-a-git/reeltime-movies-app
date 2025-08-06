import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
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
const HomePage = React.lazy(() => import("./pages/homePage"));
const UpcomingMoviesPage = React.lazy(
  () => import("./pages/upcomingMoviesPage")
);
const NowPlayingMoviesPage = React.lazy(
  () => import("./pages/nowPlayingMoviesPage")
);
const PopularMoviesPage = React.lazy(() => import("./pages/popularMoviesPage"));
const TopRatedMoviesPage = React.lazy(
  () => import("./pages/topRatedMoviesPage")
);

const AiringTodayTvShowsPage = React.lazy(
  () => import("./pages/airingTodayTvShows")
);
const DiscoverTvShowsPage = React.lazy(
  () => import("./pages/discoverTvShowsPage")
);
const OnTheAirTVShowsPage = React.lazy(() => import("./pages/onTheAirTvShows"));
const PopularTvShowsPage = React.lazy(
  () => import("./pages/popularTvShowsPage")
);
const TopRatedTvShowsPage = React.lazy(
  () => import("./pages/topRatedTvShowsPage")
);

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
            <React.Suspense fallback={<div>Loading...</div>}>
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
                <Route
                  path="/movies/upcoming"
                  element={<UpcomingMoviesPage />}
                />
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
                <Route
                  path="/tv/airing-today"
                  element={<AiringTodayTvShowsPage />}
                />
                <Route path="/tv/discover" element={<DiscoverTvShowsPage />} />
                <Route
                  path="/tv/on-the-air"
                  element={<OnTheAirTVShowsPage />}
                />
                <Route path="/tv/popular" element={<PopularTvShowsPage />} />
                <Route path="/tv/top-rated" element={<TopRatedTvShowsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </React.Suspense>
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
