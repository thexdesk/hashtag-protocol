import { gql } from "apollo-boost";

export const TOP_TENS = gql`
  query {
    hashtags(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      name
      owner
      publisher
      timestamp
      tagCount
    }
    publishers(first: 10, orderBy: tagCount, orderDirection: desc) {
      id
      mintCount
      tagCount
      mintFees
      tagFees
    }
    owners(first: 10, orderBy: mintCount, orderDirection: desc) {
      id
      mintCount
      tagCount
      tagFees
    }
    tags(first: 5, orderBy: timestamp, orderDirection: desc) {
      id
      hashtagId
      hashtagName
      nftContract
      nftContractName
      nftImage
      nftName
      nftDescription
      nftId
      tagger
      timestamp
      publisher
    }
    popular: hashtags(first: 10, orderBy: tagCount, orderDirection: desc) {
      id
      name
      owner
      publisher
      tagCount
    }
  }
`;
