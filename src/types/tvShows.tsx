import { BaseMedia, CommonMediaDetails, Company, Videos } from "./common";
import { CastCredit, CrewCredit } from "./people";

// This is the same as SimilarTvShow
export interface BaseTvShowProps extends BaseMedia {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface TvShowDetailsProps
  extends BaseTvShowProps,
    CommonMediaDetails {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
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
  networks: Company[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  };
  type: string;
  credits?: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
  similar: TvShowApiResults;
  videos?: Videos;
}

export interface TvShowCastCredit extends BaseTvShowProps {
  character: string;
  credit_id: string;
  episode_count: number;
  first_credit_air_date: string;
}

export interface TvShowCrewCredit extends BaseTvShowProps {
  credit_id: string;
  department: string;
  episode_count: number;
  first_credit_air_date: string;
  job: string;
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
}

export interface TvShowApiResults {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}
