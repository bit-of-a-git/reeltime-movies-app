// This endpoint defaults to English, but takes a language parameter so that images
// can also be provided for international films
export const getImages = (
  id: string | number,
  endpoint: string,
  language: string
) => {
  return fetch(
    `https://api.themoviedb.org/3/${endpoint}/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&include_image_language=en,${language}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    })
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
};

export const getReviews = (id: string | number, endpoint: string) => {
  return fetch(
    `https://api.themoviedb.org/3/${endpoint}/${id}/reviews?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch reviews");
      }
      return response.json();
    })
    .then((json) => json.results)
    .catch((error) => {
      throw error;
    });
};

export const getDiscoverMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchMoviePage = (endpoint: string, page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch movies. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getUpcomingMovies = (page: number) => {
  return fetchMoviePage("upcoming", page);
};

export const getNowPlayingMovies = (page: number) => {
  return fetchMoviePage("now_playing", page);
};

export const getPopularMovies = (page: number) => {
  return fetchMoviePage("popular", page);
};

export const getTopRatedMovies = (page: number) => {
  return fetchMoviePage("top_rated", page);
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&append_to_response=credits,similar,videos`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get movie data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US"
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch genres. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = (id: string | number, language: string) => {
  return getImages(id, "movie", language);
};

export const getMovieReviews = (id: string | number) => {
  return getReviews(id, "movie");
};

export const getDiscoverTvShows = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&include_adult=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch TV Shows. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTvShowPage = (endpoint: string, page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${endpoint}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Unable to fetch TV Shows. Response status: ${response.status}`
        );
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getAiringTodayTvShows = (page: number) => {
  return fetchTvShowPage("airing_today", page);
};

export const getOnTheAirTvShows = (page: number) => {
  return fetchTvShowPage("on_the_air", page);
};

export const getPopularTvShows = (page: number) => {
  return fetchTvShowPage("popular", page);
};

export const getTopRatedTvShows = (page: number) => {
  return fetchTvShowPage("top_rated", page);
};

export const getTvShow = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&append_to_response=credits,similar,videos`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get TV show data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTvShowImages = (id: string | number, language: string) => {
  return getImages(id, "tv", language);
};

export const getTvShowReviews = (id: string | number) => {
  return getReviews(id, "tv");
};

export const getPerson = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&append_to_response=movie_credits,tv_credits`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to get person data. Response status: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
