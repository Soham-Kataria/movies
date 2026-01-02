import { gql } from "@apollo/client";

export const CreatePerson = gql`
  mutation createPerson($data: PersonInput!) {
    createPerson(data:$data) {
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
export const editPerson = gql`
  mutation updatePerson($id:ID!,$data: UpdatePersonInput!) {
    updatePerson(id:$id,data:$data) {
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


export const Delete_Person = gql`
  mutation deletePerson($id:ID!) {
    deletePerson(id:$id) {
      message
    }
  }
`;