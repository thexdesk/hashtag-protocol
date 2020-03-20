import { gql } from "apollo-boost";

export const ALL_HASH_TAGS = gql`
   query {
       hashtags(first: 10, orderBy:timestamp, orderDirection:desc) {
           id
           name
           owner
           publisher
           timestamp
       }
   }
`;
