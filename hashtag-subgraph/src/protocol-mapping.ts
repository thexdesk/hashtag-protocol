import { BigInt } from "@graphprotocol/graph-ts"

import {
  MintHashtag
} from "../generated/HashtagProtocol/HashtagProtocol";

import { Hashtag } from "../generated/schema";
import {safeLoadOwner, safeLoadPlatform, safeLoadPublisher, ONE} from "./helpers";

/*
 * Track the minting of a hashtag
 *
 * event.params.tokenId NFT ID of the hashtag
 * event.params.hashtag Hashtag text
 * event.params.owner Owner of the new hashtag
 * event.params.publisher Publisher which facilitated the hashtag
 * event.params.publisherFee Fee earned by the publisher
 * event.params.platformFee Fee earned by the Hashtag Protocol
 *
 * Notes
 *  In addition to the data generated by a hashtag, further data points are generated:
 *   - Count of how many hashtags owned by an Ethereum address
 *   - Fees earned by the platform and publishers across all minting events
 */
export function handleMintHashtag(event: MintHashtag): void {
  let hashtagEntity = new Hashtag(event.params.tokenId.toString());

  hashtagEntity.name = event.params.hashtag;
  hashtagEntity.displayHashtag = event.params.displayHashtag;
  hashtagEntity.owner = event.params.owner;
  hashtagEntity.publisher = event.params.publisher;
  hashtagEntity.timestamp = event.block.timestamp;
  hashtagEntity.tagCount = BigInt.fromI32(0);
  hashtagEntity.ownerRevenue = BigInt.fromI32(0);
  hashtagEntity.publisherRevenue = BigInt.fromI32(0);
  hashtagEntity.protocolRevenue = BigInt.fromI32(0);
  hashtagEntity.creatorRevenue = BigInt.fromI32(0);
  hashtagEntity.save();

  let owner = safeLoadOwner(event.params.creator.toHexString());
  owner.mintCount = owner.mintCount.plus(ONE);
  owner.save();

  // publisher
  let publisher = safeLoadPublisher(event.params.publisher.toHexString());
  publisher.mintCount = publisher.mintCount.plus(ONE);
  publisher.save();

  // platform
  let platform = safeLoadPlatform("platform");
  platform.save();
}
