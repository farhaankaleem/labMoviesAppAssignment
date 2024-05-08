export interface BaseMovie {
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
  }

  export interface TVShow {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    favourite?: boolean;
}

export interface TVShowDetails extends TVShow {
  adult: boolean;
  created_by: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string | null;
  }[];
  episode_run_time: number[];
  genres: {
      id: number;
      name: string;
  }[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
      id: number;
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
      still_path: string | null;
  };
  next_episode_to_air: null | {
      // This can be implemented similarly to last_episode_to_air if needed
  };
  networks: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
  }[];
  production_countries: {
      iso_3166_1: string;
      name: string;
  }[];
  seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      season_number: number;
      vote_average: number;
  }[];
  spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
}


  export interface BaseMovieList { 
    movies: BaseMovie[];
  }  

  export interface MovieT extends BaseMovie {
    genres: {
      id: number;
      name: string;
    }[];

    production_countries: {
      iso_3166_1: string;
      name: string
    }[];
  }


  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }

  export interface ListedMovie extends BaseMovie {
    genre_ids?: number[];
  }

  export type FilterOption = "title" | "genre";

  export type FilterOptionActor = "name" | "gender";

  export type FilterOptionShow = "name" | "genre";

  export interface MovieListPageTemplateProps {
    movies: ListedMovie[];
    title: string;
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    action: (m: ListedMovie) => React.ReactNode
  }

  export interface SeriesListPageTemplateProps {
    shows: TVShow[];
    title: string;
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    action: (m: TVShow) => React.ReactNode
  }

  export interface ActorListPageTemplateProps {
    actors: Person[];
    title: string;
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    action: (a: Person) => React.ReactNode
  }

  export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }

  export interface GenderData {
    [id: number]: string;
  }

  interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovie[];
  }

  interface DiscoverTVShows {
    page: number;	
    total_pages: number;
    total_results: number;
    results: TVShow[];
  }

  interface UpcomingMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovie[];
  }

  interface PopularMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovie[];
  }

  interface Person {
    adult: boolean;
    id: number;
    name: string;
    original_name?: string;
    media_type?: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path?: string;
    known_for: KnownFor[];
    favourite?: boolean;
}

interface KnownFor {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity?: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface PersonList {
    page: number;	
    total_pages: number;
    total_results: number;
    results: Person[];
}

  export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
  }

  export interface PersonDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string | null;
}

interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
} 

export interface SortOption {
  name: string;
  value: string;
}

