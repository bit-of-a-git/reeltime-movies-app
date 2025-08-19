import { MovieCastCredit, MovieCrewCredit } from "./movies";
import { TvShowCastCredit, TvShowCrewCredit } from "./tvShows";

export interface BasePersonProps {
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

export interface PersonDetails extends BasePersonProps {
  movie_credits: {
    cast: MovieCastCredit[];
    crew: MovieCrewCredit[];
  };
  tv_credits: {
    cast: TvShowCastCredit[];
    crew: TvShowCrewCredit[];
  };
}

export interface BaseCredit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface CastCredit extends BaseCredit {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewCredit extends BaseCredit {
  credit_id: string;
  department: string;
  job: string;
}

export interface BasePeopleListProps {
  people: BasePersonProps[];
  action: (m: BasePersonProps) => React.ReactNode;
  showFooterActions?: boolean;
}

export interface PeopleListPageTemplateProps extends BasePeopleListProps {
  title: string;
  changePage?: (delta: number) => void;
  showArrows?: boolean;
}
