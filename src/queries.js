import { gql } from "apollo-boost";

export const TOP_TENS = gql`
   query {
       hashtags(first: 10, orderBy:timestamp, orderDirection:desc) {
           id
           name
           owner
           publisher
           timestamp
       }
       publishers(first: 10, orderBy:count, orderDirection:desc) {
           id
           count
       },
       owners(first: 10, orderBy:count, orderDirection:desc){
           id
           count
       }
   }

`;
