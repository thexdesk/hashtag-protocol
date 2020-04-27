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
      mintFees
      registryFees
    }
    owners(first: 10, orderBy: ownedCount, orderDirection: desc) {
      id
      ownedCount
      registryFees
    }
    tags {
      id
      hashtagId
      hashtagName
      nftContract
      nftId
      tagger
      timestamp
      publisher
    }
  }
`;
