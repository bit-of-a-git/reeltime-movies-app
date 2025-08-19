import { BaseMedia, CommonMediaDetails, Image, Videos } from "./common";
import { CastCredit, CrewCredit } from "./people";

export interface BaseMovieProps extends BaseMedia {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface MovieDetailsProps extends BaseMovieProps, CommonMediaDetails {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string;
  };
  budget: number;
  imdb_id: string;
  revenue: number;
  runtime: number;
  credits?: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
  similar?: MovieApiResults;
  videos?: Videos;
}

export interface MovieCastCredit extends BaseMovieProps {
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieCrewCredit extends BaseMovieProps {
  credit_id: string;
  department: string;
  job: string;
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
  showFooterActions?: boolean;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: Image[];
}

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
  changePage?: (delta: number) => void;
  showFooterActions?: boolean;
  showArrows?: boolean;
}

export interface MovieApiResults {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface FantasyMovieProps {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: Date | string;
  runtime: number | null;
  productionCompanies: string[];
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
