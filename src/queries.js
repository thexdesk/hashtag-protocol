import { gql } from "apollo-boost";

export const SNAPSHOT = gql(`
    query {
        hashtags(first: 10, orderBy: timestamp, orderDirection: desc) {
            id
            name
            displayHashtag
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
        platform(id: "platform") {
            id
            mintFees
            tagFees
        }
        taggers(first: 10, orderBy: tagCount, orderDirection: desc) {
            id
            tagCount
        }
    }
`);

export const TAGS_BY_HASHTAG = gql(`
query tagsByHashtag($hashtag: String!) {
   tagsByHashtag: tags(orderBy: timestamp, orderDirection: desc, where: {hashtagName: $hashtag}) {
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
}
`);

export const HASHTAGS_BY_NAME = gql(`
query hashtagsByName($name: String!) {
   hashtagsByName:  hashtags(first:1, where: {name:$name}) {
        id
        name
        displayHashtag
        owner
        publisher
        timestamp
        tagCount
   }
}
`);

export const TAGS_BY_DIGITAL_ASSET = gql(`
   query tagsByDigitalAsset($nftContract: String!, $nftId: String!) {
    tagsByDigitalAsset: tags(where:{nftContract: $nftContract, nftId: $nftId}) {
    id
    nftContract
    nftContractName
    nftImage
    nftId
    nftName
    nftTokenUri
    nftDescription
    tagger
    timestamp
    publisher
    hashtagId
    hashtagName
  }
}`);

export const OWNER_BY_ACC = gql(`
query ownerByAcc($id: String!) {
  ownerByAcc: owner(id: $id) {
    id
    mintCount
    tagCount
    tagFees
  }
}
`);

export const HASHTAGS_BY_OWNER = gql(`
query hashtagsByOwner($owner: String!) {
  hashtagsByOwner: hashtags(where:{ owner: $owner}) {
    id
    name
    displayHashtag
    owner
    publisher
    timestamp
    tagCount
  }
}
`);

export const HASHTAGS_BY_PUBLISHER = gql(`
query hashtagsByPublisher($publisher: String!) {
  hashtagsByPublisher: hashtags(where:{publisher: $publisher}) {
    id
    name
    displayHashtag
    owner
    publisher
    timestamp
    tagCount
  }
}
`);

export const TAGS_BY_TAGGER = gql(`
query tagsByTagger($tagger: String!) {
  tagsByTagger: tags(where:{ tagger: $tagger}) {
    id
    hashtagId
    hashtagName
    nftContract
    nftId
    nftContractName
    nftTokenUri
    nftName
    nftImage
    tagger
    timestamp
    publisher
  }
}
`);

export const TAGS_BY_PUBLISHER = gql(`
query tagsByPublisher($publisher: String!) {
  tagsByPublisher: tags(where:{ publisher: $publisher}) {
    id
    hashtagId
    hashtagName
    nftContract
    nftId
    nftContractName
    nftTokenUri
    nftName
    nftImage
    tagger
    timestamp
    publisher
  }
}
`);

export const TAGGER_BY_ACC = gql(`
query taggerByAcc($id: String!) {
    taggerByAcc: tagger(id: $id){
        id  
        tagCount
    }
}
`);

export const PUBLISHER_BY_ACC = gql(`
query publisherByAcc($id: String!) {
    publisherByAcc: publisher(id: $id){
      id  
      mintCount
      tagCount
      mintFees
      tagFees
    }
}
`);

export const PAGED_HASHTAGS = gql(`
query pagedHashtags($first: Int!, $skip: Int!) {
        pagedHashtags: hashtags(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
            id
            name
            displayHashtag
            owner
            publisher
            timestamp
            tagCount
        }
}
`);

export const PAGED_TAGS = gql(`
query pagedTags($first: Int!, $skip: Int!) {
        pagedTags: tags(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
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
   }     
`);

export const PAGED_PUBLISHERS = gql(`
query pagedPublishers($first: Int!, $skip: Int!) {
    pagedPublishers: publishers(first: $first, skip: $skip, orderBy: tagCount, orderDirection: desc) {
        id
        mintCount
        tagCount
        mintFees
        tagFees
    }
}`);

export const PAGED_OWNERS = gql(`
query pagedOwners($first: Int!, $skip: Int!) {
    pagedOwners: owners(first: $first, skip: $skip, orderBy: mintCount, orderDirection: desc) {
        id
        mintCount
        tagCount
        tagFees
    }
}
`);

export const PAGED_TAGGERS = gql(`
query pagedOwners($first: Int!, $skip: Int!) {
    pagedTaggers: taggers(first: $first, skip: $skip, orderBy: tagCount, orderDirection: desc) {
        id
        tagCount
    }
}
`);
