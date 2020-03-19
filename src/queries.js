import { gql } from "apollo-boost";

export const ALL_HASH_TAGS = gql`
   query {
        hashtags {
            name
        }
    }
`;
