export type User = {
  email: string;
  password: string;
};

export type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

export type InputProps = {
  id?: string | undefined;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
  placeholder?: string;
};

export type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export type FilterProps = {
  handleFilter: () => Promise<void>;
  input: FilterInput;
  setInput: React.Dispatch<React.SetStateAction<FilterInput>>;
};

export type FilterInput = {
  limit?: number;
  field?: string;
  order?: string;
  skip?: number;
};

export type LoginProps = {
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type MovieListResponse = {
  message: string;
  count: number;
  data: Movie[];
};

export type MoviesQueryResult = {
  movies: MovieListResponse;
};

export type MovieQueryResponse = {
  movie: {
    message: string;
    data: Movie;
  };
};

export type FormPropsType = {
  title?: string;
  formData: MovieInput | EditMovieInput;
  setFormData: React.Dispatch<
    React.SetStateAction<MovieInput | EditMovieInput>
  >;
  // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: (value: MovieInput) => void;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  emailPasswordLogIn: {
    data: {
      token: string;
    };
    user: any;
  };
};

export type CreateMovieResponse = {
  createMovie: {
    message: string;
    data: { movie: Movie };
  };
};

export type MovieSuccessResponse = {
  updateMovie: {
    message: string;
    data: Movie;
  };
};

export type DeleteProps = {
  id: string | undefined;
};

export type DeleteSuccessResponse = {
  deleteMovie: {
    message: string;
    data: Movie;
  };
};

export type EditMovieInput = {
  adult?: boolean;
  budget?: number;
  originalLanguage?: string;
  originalTitle?: string;
  title?: string;
  overview?: string;
  releaseDate?: string;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
};

export type MovieInput = {
  adult: boolean;
  budget: number;
  originalLanguage: string;
  originalTitle: string;
  title: string;
  overview: string;
  releaseDate: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
};

export type UpdateMovieInput = {
  adult: boolean;
  budget: number;
  originalLanguage: string;
  originalTitle: string;
  title: string;
  overview: string;
  releaseDate: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
};
export type DateTime = string;
export type DateScalar = string;

export const MediaType = {
  MOVIE: "MOVIE",
  TV: "TV",
  EPISODE: "EPISODE",
  SEASON: "SEASON",
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export const ImageType = {
  POSTER: "POSTER",
  BACKDROP: "BACKDROP",
  PROFILE: "PROFILE",
  STILL: "STILL",
} as const;

export type ImageType = (typeof ImageType)[keyof typeof ImageType];

export type EditMovieData = {};

export type Movie = {
  id: string;
  adult?: boolean;
  budget?: number;
  homePage?: string;
  streamingOn?: string;
  originalLanguage?: string;
  originalTitle?: string;
  overview?: string;
  popularity?: number;
  releaseDate?: DateScalar;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  voteAverage?: number;
  voteCount?: number;
  createdAt?: DateTime;

  castAndCrew?: CastAndCrew[];
  genres?: Genre[];
  movieVideo?: Video[];
  movieImages?: Images[];
  movieCollection?: CollectionData[];
  languages?: Language[];
  countries?: Country[];

  imageUrl?: string;
};

export type Video = {
  id?: string;
  mediaId?: string;
  mediaType?: MediaType;
  languageCode?: string;
  countryCode?: string;
  site?: string;
  size?: number;
  official?: boolean;
  publishedAt?: DateTime;
};

export type Images = {
  id: string;
  mediaId: string;
  personId: string;
  collectionId: string;
  mediaType: MediaType;

  aspectRatio: number;
  filePath: string;
  height: number;
  voteAverage: number;
  voteCount: number;
  width: number;
  languageCode: string;

  imageType?: ImageType;
};

export type CollectionData = {
  id?: string;
  tmdbId?: number;
  name?: string;
  overview?: string;
  posterPath?: string;
  backdropPath?: string;
};

export type Language = {
  id?: string;
  languageCode?: string;
  englishName?: string;
};

export type Country = {
  id?: string;
  countryCode?: string;
  englishName?: string;
};

export type Genre = {
  id?: string;
  name?: string;
};

export type CastAndCrew = {
  id?: string;
  name?: string;
  creditType?: string;
  department?: string;
  job?: string;
  character?: string;

  characterAdult?: boolean;
  characterGender?: string;
  order?: number;

  tmdbId?: string;
  birthday?: DateTime;
  knownForDepartment?: string;
  deathday?: DateTime;
  alsoKnownAs?: string;
  gender?: string;
  biography?: string;
  popularity?: number;
  placeOfBirth?: string;
  profilePath?: string;
  homePage?: string;
  adult?: boolean;

  createdAt?: DateTime;
  updatedAt?: DateTime;
  deletedAt?: DateTime;
};

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type Person = {
  id: string;
  tmdbId: string;
  birthday: DateTime;
  knownForDepartment: string;
  deathday: DateTime;
  name: string;
  alsoKnownAs: [string];
  gender: GenderType;
  biography: string;
  popularity: number;
  placeOfBirth: string;
  profilePath: string;
  homePage: string;
  adult: boolean;
};

export type PersonDetails = {
  person: {
    message: string;
    data: Person;
  };
};

export type PersonList = {
  listPersons: {
    message: string;
    count: number;
    data: Person[];
  };
};

export type CreatePersonResponse = {
  createPerson: {
    message: string;
    data: Person;
  };
};

export type CreatePersonInput = {
  tmdbId: string;
  birthday: DateTime;
  knownForDepartment: string;
  deathday: DateTime;
  name: string;
  alsoKnownAs: [string];
  gender: GenderType;
  biography: string;
  popularity: number;
  placeOfBirth: string;
  profilePath: string;
  homePage: string;
  adult: boolean;
};
export type EditPersonInput = {
  tmdbId?: string;
  birthday?: DateTime;
  knownForDepartment?: string;
  deathday?: DateTime;
  name?: string;
  alsoKnownAs?: [string];
  gender?: GenderType;
  biography?: string;
  popularity?: number;
  placeOfBirth?: string;
  profilePath?: string;
  homePage?: string;
  adult?: boolean;
};

export type DeletePersonResponse = {
  deletePerson: {
    message: string;
  };
};
