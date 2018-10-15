import { gql } from 'apollo-boost';

/* Queries */
export const GET_CURRENT_USER = gql`
query {
    hello
}
`;

/* User Mutations */
export const SIGNUP = gql`
  mutation(
      $firstname: String!, 
      $lastname: String!, 
      $email: String!, 
      $password: String!) {
    signUp(firstname: $firstname, 
        lastname: $lastname,
        email: $email,
        password: $password) {
      token
      user {
        firstname
      }
    }
  }
`;

export const LOGIN = gql`
  mutation(
    $email: String!, 
    $password: String!) {
    login(email: $email, 
        password: $password) { 
      token
      user {
          firstname
      }
    }
  }
`
