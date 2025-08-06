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
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieImage {
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
  images: MovieImage[];
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
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

export interface MovieApiResults {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
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

export interface BaseTvShowListProps {
  tvShows: BaseTvShowProps[];
  action: (t: BaseTvShowProps) => React.ReactNode;
}

export interface TvShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
  changePage?: (delta: number) => void;
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
