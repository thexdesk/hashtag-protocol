import { gql } from "apollo-boost";

export const SNAPSHOT = gql(`
    query {
        tags(first: 5, orderBy: timestamp, orderDirection: desc) {
            id
            hashtagId
            hashtagDisplayHashtag
            hashtag
            hashtagWithoutHash
            nftContract
            nftId
            nftContractName
            nftTokenUri
            nftName
            nftDescription
            nftImage
            tagger
            timestamp
            publisher
        }
    }
`);
