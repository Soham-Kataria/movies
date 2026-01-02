import { gql } from "@apollo/client";

export const QueryPersons = gql`
  query Persons($filter: ListPersonsFilter!, $sort: ListPersonsSort!) {
    listPersons(filter: $filter, sort: $sort) {
      message
      count
      data {
        id
        tmdbId
        birthday
        knownForDepartment
        deathday
        name
        alsoKnownAs

        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`;

export const QueryPerson = gql`
  query Person($id: ID!) {
    person(id: $id) {
      message
      data {
        id
        tmdbId
        birthday
        knownForDepartment
        deathday
        name
        alsoKnownAs

        gender
        biography
        popularity
        placeOfBirth
        profilePath
        homePage
        adult
      }
    }
  }
`;
