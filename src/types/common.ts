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

export interface BaseMedia {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface CommonMediaDetails extends BaseMedia {
  genres: Genre[];
  homepage: string;
  production_companies: Company[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

export interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
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

export type FilterOption =
  | "title"
  | "genre"
  | "minRating"
  | "yearTo"
  | "yearFrom";

export interface Genre {
  id: number;
  name: string;
}

export interface GenreData {
  genres: Genre[];
}
