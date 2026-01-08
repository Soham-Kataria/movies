import { gql } from "@apollo/client";

export const QueryMovies = gql`
  query Movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {
    movies(filter: $filter, sort: $sort) {
      count
      data {
        id
        title
        imageUrl
        releaseDate
        voteAverage
        originalLanguage
        runtime
      }
    }
  }
`;

export const MovieCredits = gql`
  query listMovieCredits($id: ID!, $filter: ListCreditMovieFilter) {
    listMovieCredits(id: $id, filter: $filter) {
      count
      data {
        id
        person{
          id
        }
      }
    }
  }
`;

export const Movie = gql`
  query movie($id: ID!) {
    movie(id: $id) {
      message
      data {
        imageUrl
        title
        originalLanguage
        releaseDate
      }
    }
  }
`;

export const QueryMovie = gql`
  query movie($id: ID!) {
    movie(id: $id) {
      message
      data {
        id
        adult
        budget
        homePage
        streamingOn
        originalLanguage
        originalTitle
        overview
        popularity
        releaseDate
        revenue
        runtime
        status
        tagline
        title
        video
        voteAverage
        voteCount
        createdAt
        imageUrl
        genres {
          id
          name
        }
        castAndCrew{
            id
            name
            creditType
            department
            job
            character
          
            characterAdult
            characterGender
            order
            department
            createdAt
            updatedAt
            deletedAt
        }
      }
    }
  }
`;

// countries {
//           id
//           countryCode
//           englishName
//         }
//         languages {
//           id
//           languageCode
//           englishName
//         }
//         movieCollection {
//           id
//           tmdbId
//           name
//           overview
//           posterPath
//           backdropPath
//         }
//         movieImages {
//           id
//           mediaId
//           personId
//           collectionId
//           mediaType
//           aspectRatio
//           filePath
//           height
//           voteAverage
//           voteCount
//           width
//           languageCode
//           imageType
//         }
//         movieVideo {
//           id
//           mediaId
//           mediaType
//           languageCode
//           countryCode
//           site
//           size
//           official
//           publishedAt
//         }

//         castAndCrew {
//           id
//           name
//           creditType
//           department
//           job
//           character
//           characterAdult
//           characterGender
//           order
//           tmdbId
//           birthday
//           knownForDepartment
//           deathday
//           alsoKnownAs
//           gender
//           biography
//           popularity
//           placeOfBirth
//           profilePath
//           homePage
//           adult
//           createdAt
//           updatedAt
//           deletedAt
//         }
