export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface BasePeopleListProps {
  people: Person[];
  action: (m: Person) => React.ReactNode;
  showFooterActions?: boolean;
}

export interface PeopleListPageTemplateProps extends BasePeopleListProps {
  title: string;
  changePage?: (delta: number) => void;
  showArrows?: boolean;
}

export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
  credits: Credits;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: Genre[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  videos: Videos;
}

export interface Videos {
  results: Video[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
  showFooterActions?: boolean;
}

export interface Image {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: Image[];
}

export type FilterOption =
  | "title"
  | "genre"
  | "minRating"
  | "yearTo"
  | "yearFrom";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
  changePage?: (delta: number) => void;
  showFooterActions?: boolean;
  showArrows?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreData {
  genres: Genre[];
}

export interface MovieApiResults {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Review {
  id: string;
  content: string;
  author: string;
}

export interface UserReview {
  content: string;
  image: string;
  movieId: number;
  movieTitle: string;
  rating: number;
  title: string;
}

export interface UpcomingMovies {
  dates: {
    minimum: string;
    maximum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface FantasyMovieProps {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: Date | null;
  runtime: number | null;
  productionCompanies: string[];
}

export interface BaseTvShowProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShowDetailsProps extends BaseTvShowProps {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: string;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  next_episode_to_air: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  production_countries: {
    iso_3166_1: string;
    name: string;
  };
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  };
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  };
  status: string;
  tagline: string;
  type: string;
}

export interface BaseTvShowListProps {
  tvShows: BaseTvShowProps[];
  action: (t: BaseTvShowProps) => React.ReactNode;
  showFooterActions?: boolean;
}

export interface TvShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
  changePage?: (delta: number) => void;
  showFooterActions?: boolean;
  showArrows?: boolean;
}

export interface TvShowApiResults {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
