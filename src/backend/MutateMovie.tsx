import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation Login($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      message
      data {
        token
      }
    }
  }
`;

export const createMovie = gql`
  mutation CreateMovie($data: MovieInput) {
    createMovie(data: $data) {
      message
      data {
        movie {
          id
          title
        }
      }
    }
  }
`;

export const editMovie = gql`
  mutation updateMovie($id: ID!, $data: UpdateMovieInput) {
    updateMovie(id: $id, data: $data) {
      message
      data {
        movie {
          id
          adult
          budget
          originalLanguage
          originalTitle
          title
          overview
          releaseDate
          revenue
          runtime
          status
          tagline
        }
      }
    }
  }
`;

export const Delete_Movie = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      message
      data {
        movie {
          id
          title
        }
      }
    }
  }
`;
