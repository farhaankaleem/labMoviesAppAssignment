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

  export interface MovieListPageTemplateProps {
    movies: ListedMovie[];
    title: string;
    action: (m: MovieT) => void;
  }

  export interface ActorListPageTemplateProps {
    movies: Person[];
    title: string;
    action: (m: MovieT) => void;
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

  interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovie[];
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
    original_name: string;
    media_type: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
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
    popularity: number;
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