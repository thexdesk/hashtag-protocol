import { BigInt, Bytes, ipfs, json, JSONValue } from "@graphprotocol/graph-ts"

import {
  HashtagRegistered,
  ERC721HashtagRegistry
} from "../generated/ERC721HashtagRegistry/ERC721HashtagRegistry";

import {HashtagProtocol} from "../generated/HashtagProtocol/HashtagProtocol"
import {Tag, Hashtag} from "../generated/schema"

import {
  safeLoadPublisher,
  safeLoadPlatform,
  safeLoadOwner,
  safeLoadTagger,
  extractNftIPFSMetadata,
  ONE,
} from "./helpers";

/*
 * Track the tagging of an NFT asset
 *
 * event.params.hashtagId NFT ID of the hashtag
 * event.params.nftContract Contract address of the NFT asset being tagged
 * event.params.nftId NFT ID of the NFT asset being tagged
 * event.params.tagger Ethereum address that initiated the tag
 * event.params.publisher Publisher that facilitated the tag
 * event.params.hashtagFee Fee earned by the owner of the hashtag
 * event.params.publisherFee Fee earned by the publisher that facilitated the tagging
 * event.params.platformFee Fee earned by the Hashtag Protocol
 *
 * Notes
 *    A number of data points are generated off the back of this tagging event:
 *     - Tag / usage count for a hashtag
 *     - NFT asset metadata including name, description and image
 *     - Tagging fees earned by the hashtag owner, publisher and platform
 */
export function handleHashtagRegistered(event: HashtagRegistered): void {
  let registryContract = ERC721HashtagRegistry.bind(event.address);

  let protocolAddress = registryContract.hashtagProtocol();
  let protocolContract = HashtagProtocol.bind(protocolAddress);

  let hashtagId = event.params.hashtagId;

  // Update hashtag data
  let hashtag = Hashtag.load(hashtagId.toString());
  hashtag.tagCount = hashtag.tagCount.plus(ONE);
  hashtag.save();

  // Store tag information
  let tagEntity = new Tag(event.transaction.hash.toHexString());
  tagEntity.hashtagId = hashtagId.toString();
  tagEntity.hashtagName = protocolContract.tokenIdToHashtag(hashtagId).value3;
  tagEntity.nftContract = event.params.nftContract;
  tagEntity.nftId = event.params.nftId.toString();

  let erc721Contract = HashtagProtocol.bind(event.params.nftContract);
  tagEntity.nftContractName = erc721Contract.name();

  let tokenUriCallResult = erc721Contract.try_tokenURI(event.params.nftId);
  tagEntity.nftTokenUri = tokenUriCallResult.reverted ? null : tokenUriCallResult.value;

  if (!tokenUriCallResult.reverted) {
    let nftMetadata = extractNftIPFSMetadata(tagEntity.nftTokenUri);
    if (nftMetadata) {
      tagEntity.nftName = nftMetadata.nftName;
      tagEntity.nftDescription = nftMetadata.nftDescription;
      tagEntity.nftImage = nftMetadata.nftImage;
    }
  }

  tagEntity.tagger = event.params.tagger;
  tagEntity.timestamp = event.block.timestamp;
  tagEntity.publisher = event.params.publisher;
  tagEntity.save();

  // Update owner counts and fees
  let owner = safeLoadOwner(protocolContract.ownerOf(hashtagId).toHexString());
  owner.tagCount = owner.tagCount.plus(ONE);
  owner.tagFees = owner.tagFees.plus(event.params.hashtagFee);
  owner.save();

  // update publisher counts and fees
  let publisherEntity = safeLoadPublisher(event.params.publisher.toHexString());
  publisherEntity.tagCount = publisherEntity.tagCount.plus(ONE);
  publisherEntity.tagFees = publisherEntity.tagFees.plus(event.params.publisherFee);
  publisherEntity.save();

  // update platform fees
  let platform = safeLoadPlatform("platform");
  platform.tagFees = platform.tagFees.plus(event.params.platformFee);
  platform.save();

  // update tagger counts
  let tagger = safeLoadTagger(event.params.tagger.toHexString());
  tagger.tagCount = tagger.tagCount.plus(ONE);
  tagger.save();
}