import { gql } from "apollo-boost";

export const TOP_TENS = gql`
  query {
    hashtags(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      name
      owner
      publisher
      timestamp
    }
    publishers(first: 10, orderBy: tagCount, orderDirection: desc) {
      id
      tagCount
    }
    owners(first: 10, orderBy: ownedCount, orderDirection: desc) {
      id
      ownedCount
    }
    tags {
      hashtagId
      nftContract
      nftId
      tagger
      timestamp
    }
  }
`;
