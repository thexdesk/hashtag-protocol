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

export const ALL_TAGS_BY_HASHTAG = gql`
  query allTagsByHashtag($hashtag: String!) {
    allTagsByHashtag: tags(where: { hashtagName: $hashtag }) {
      id
    }
  }
`;

export const PAGED_TAGS_BY_HASHTAG = gql`
  query tagsByHashtag($hashtag: String!, $first: Int!, $skip: Int!) {
    tagsByHashtag: tags(
      first: $first
      skip: $skip
      orderBy: timestamp
      orderDirection: desc
      where: { hashtagName: $hashtag }
    ) {
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
`;

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

export const ALL_HASHTAG_IDS_BY_OWNER = gql`
  query allHashtagsByOwner($owner: String!) {
    allHashtagsByOwner: hashtags(where: { owner: $owner }) {
      id
    }
  }
`;

export const PAGED_HASHTAGS_BY_OWNER = gql(`
query hashtagsByOwner($owner: String!, $first: Int!, $skip: Int!) {
  hashtagsByOwner: hashtags(first: $first, skip: $skip, where:{ owner: $owner}) {
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

export const ALL_HASHTAG_IDS_BY_PUBLISHER = gql`
  query hashtagIdsByPublisher($publisher: String!) {
    hashtagIdsByPublisher: hashtags(where: { publisher: $publisher }) {
      id
    }
  }
`;

export const PAGED_HASHTAGS_BY_PUBLISHER = gql(`
query hashtagsByPublisher($publisher: String!, $first: Int!, $skip: Int!) {
  hashtagsByPublisher: hashtags(first: $first, skip: $skip, where:{publisher: $publisher}) {
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

export const ALL_TAG_IDS_BY_TAGGER = gql`
  query allTagIdsByTagger($tagger: String!) {
    allTagIdsByTagger: tags(where: { tagger: $tagger }) {
      id
    }
  }
`;

export const PAGED_TAGS_BY_TAGGER = gql`
  query tagsByTagger($tagger: String!, $first: Int!, $skip: Int!) {
    tagsByTagger: tags(first: $first, skip: $skip, where: { tagger: $tagger }) {
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
`;

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

export const ALL_TAG_IDS_BY_PUBLISHER = gql`
  query allTagIdsByPublisher($publisher: String!) {
    allTagIdsByPublisher: tags(where: { publisher: $publisher }) {
      id
    }
  }
`;

export const PAGED_TAGS_BY_PUBLISHER = gql(`
query tagsByPublisher($publisher: String!, $first: Int!, $skip: Int!) {
  tagsByPublisher: tags(first: $first, skip: $skip, where:{ publisher: $publisher}) {
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

export const ALL_HASHTAG_TOKEN_IDS = gql`
  query {
    hashtags {
      id
    }
  }
`;

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

export const ALL_TAG_IDS = gql`
  query {
    tags {
      id
    }
  }
`;

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

export const ALL_PUBLISHERS = gql`
  query {
    publishers {
      id
    }
  }
`;

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

export const ALL_OWNER_ADDRESSES = gql`
  query {
    owners {
      id
    }
  }
`;

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
