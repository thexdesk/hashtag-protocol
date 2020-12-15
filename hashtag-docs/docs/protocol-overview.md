# Protocol Overview

Hashtag Protocol is an experimental protocol consisting of a set of Ethereum
smart contracts that enables the tokenization of hashtag strings into ERC-721
non-fungible tokens (NFTs); the “tagging” of other digital assets with those
tokens; and APIs for surfacing this data for use in networks, platforms and
applications.

Stitched into the Protocol are game-theory incentive mechanisms that harnesses
the self-interest of participants to drive positive network growth.

| Conventions used in documentation |  |
| ------------- | ------------- |
| **_bold italic_**  | References [key participants](/participants.html) |
| `Contant width`  | References protocol code  |
|  |  |

## Hashtag Token (HASHTAG)


| Tokenomics  |  |
| ------------- | ------------- |
| **Type**  | Ethereum ERC- 721 non-fungible token (NFT) |
| **Symbol**  | HASHTAG  |
| **Supply** | Unlimited |
|  |  |

The centerpiece of Hashtag Protocol is the HASHTAG Token (HASHTAG), an
Ethereum ERC-721 non-fungible token. HASHTAG has the following features:

1. Each HASHTAG both contains and represents a unique hashtag string.
   There is only one instance of each HASHTAG Token -- this makes them non-fungible.
2. Minting contract validates that the string contained and referenced by a
   HASHTAG adheres to the following:
    1. Is unique.
    2. Alphanumeric characters only (a-z, A-Z, 0-9). No punctuation, spaces or special
       characters.
    3. Uppercase and lowercase characters are permitted. 
    4. Minimum 3 characters with at least 1 alphabetic character.
    5. Maximum 32 characters.
3. There is no upper limit to the number of HASHTAG Tokens that can be minted;
   the only requirement is that the text string they contain must be _unique_
   and _valid_.
4. New HASHTAG are created (aka. “minted”) on participating **_Publisher_**
   platforms; They may be created alone or in conjunction with digital asset
   tagging (see [Tagging Digital
   Content](/protocol-overview.html#tagging-digital-content) below).
5. Tokens cost nothing to create (no platform fee) except for the standard
   Ethereum network gas fee, paid for by the token **_Creator_**.
6. When a HASHTAG is created, ownership is transferred to the **_Protocol_**
   where they are held until released for auction.
7. While pending release for auction, a HASHTAG may be used to tag digital assets
   by any user on any **_Publisher_** platform.
8. Once released for auction, anyone may bid on a HASHTAG on any platform
   hosting auctions. See [Hashtag
   Auction](/protocol-overview.html#hashtag-auction) for more details.
9. Once purchased at auction, HASHTAG is transferred to **_Owner_** wallet.
10. Auction proceeds are divided up and sent to
   participant accrual accounts as follows:
    1. 45% **_Creator_** 
    2. 45% **_Publisher_**
    3. 10% **_Protocol_** 
11. Participants may pull down earnings from their accrual account at any
    time.
12. Initial price for a HASHTAG is determined by public auction.
    Subsequently, HASHTAG may be traded in the open market on standard NFT
    platforms such as OpenSea.
13. HASHTAG **_Owner_** may renew, without cost, their claim on a HASHTAG
    Token every two years. Tokens that are not renewed return to the **_Protocol_**
    and re-released for auction.


## Tagging Digital Content 

HASHTAG Tokens utility is extended to by smart contracts (Fig. 1) for linking
a HASHTAG to any online artifact, effectively “tagging” that content with a
hashtag string. Tagging data is saved on-chain.

<br />

![HASHTAG Tokens utility is extended to by tagging smart contracts](/assets/img/tagging-contracts-roadmap.png)
_Figure 1: HASHTAG utility is extended by tagging contracts._

<br />

This design pattern permits great flexibility in how HASHTAG utility
can be extended by the **_Protocol_** and third-party developers. We envision
and hope new and novel tagging contracts will be developed as the Protocol
matures.

Hashtag Protocol is launching with a single tagging contract with the
following features: 


1. Tagging is restricted to other ERC-721 NFTs. (ie. Contract validates that
   the asset being tagged is ERC-721.)
2. Contract utilizes a many-to-many HASHTAG-to-ERC-721 NFT relationship. In
   other words, an ERC-721 NFT can be tagged with any number of HASHTAGs
   and conversely, a single HASHTAG may tag any number of ERC-721 NFTs.
3. **_Tagger_** may tag any ERC-721 NFT with any HASHTAG.
4. **_Tagger_** may tag with an existing HASHTAG or create a new HASHTAG
   and tag at the same time via `mintAndTag()` method.
5. **_Tagger_** pays the Ethereum transaction gas fee plus a small
   **_Protocol_** fee.
6. **_Protocol_** fee, paid by **_Tagger_**, is divided and distributed to an accrual
   account for participants in the following manner:
    1. 70% **_Owner_** 
    2. 20% **_Publisher_**
    3. 10% **_Protocol_**
7. If Token is not owned, the **_Owner_** portion accrues within the HASHTAG
   and transfers to the new **_Owner_** if and when the Token is purchased.
8. Accrued tagging funds may be pulled down to the participant wallet at any
   time. Transaction gas fees apply.

<br />

![Many-to-many HASHTAG-to-NFT asset relationship](/assets/img/tagging-schema-many-many.png)
_Figure 2: Hashtag Protocol NFT tagging contract entity relationships._

<br />

## Surfacing Tagging & Market Data

The Minting and tagging transactions are captured by the Hashtag Protocol
Subgraph hosted on The Graph. This permits querying Hashtag Protocol data in
extremely efficient and targeted ways.

More details coming soon.


## HASHTAG Auction

To ensure fair and accurate pricing of newly minted HASHTAG, we intend
to utilize an auction. Whether we utilize a third party auction platform (eg.
OpenSea) or develop our own is TBD in [Phase 2](/roadmap.html#phase-2-platform-promotion).

At this point, we believe it would be advantageous to develop our own for
greater control over statuses and to provide APIs to enable **_Publishers_** to
also act as **_Auctioneers_**. This model is similar to modern DNS registry
and its network of third party registrars (eg. GoDaddy).


### Auction summary

The following is some high-level thinking of our take on a potential HASHTAG Auction:

*   **_Creator_** can mint new HASHTAG at no cost (only Ethereum txn fees)
    on any **_Publisher_** platform.
*   Upon minting, **_Creator_** address is recorded in HASHTAG and ownership is
    transferred to **_Protocol_**.
*   Token status goes to “Unreleased” and Token is added to the next scheduled
    “Release batch”. Next batch “Release date” should be based on block
    height, in such a way that batches are released every x blocks (thinking 2
    weeks). If there are no gas / txn benefits to “batching” the release,
    consider releasing Tokens immediately when they are minted.
*   Once created, regardless of status, any **_Tagger_** may tag digital
    assets with the Token. For tokens with no **_Owner_** (ie. purchased
    purchased auction or via open market), tagging fees are stored in the
    HASHTAG (“charged particle”).
*   Once a HASHTAG is released (either in a batch or individually) the status of
    the HASHTAG moves to “Released”.
*   Once “Released”, the HASHTAG can be bid on by any user on
    any **_Auctioneer_** platform.
*   Once the HASHTAG receives a bid, status of the HASHTAG moves to “In
    auction” and the auction begins.
*   If a “Released” HASHTAG receives no bid, it simply stays in the “Released”
    status indefinitely, available for tagging and accumulating value should
    it ever be used to tag something.
*   HASHTAG auctions last for TBD blocks. Thinking 1-2 weeks.
*   HASHTAG is transferred to winning bidder wallet, and that wallet is now the **_Owner_**.



### Bidding details

Seems like the simplest way to handle the auction process, is to use an
“English auction” in which users bid up the price of the Token, having full
visibility of all bids (at least their values). There can be some parameters
added to prevent “swooping in” at the end of the auction. For example, Opensea
enforces the following on bids:


*   Bids must be at least 5% higher than the previous bid. Only bids in the
    same payment token (e.g. wrapped ETH or DAI) as the auction will be
    counted towards the winning bid.
*   If someone bids in the last 5 minutes of an auction, and if their bid
    exceeds all others, the auction will automatically extend by 5 minutes.
    This can continue for up to a week of extensions.

With the Hashtag Protocol auction, when a user bids, their funds are locked in
the auction contract. Not sure what this means for handling additional bids.
Ie. do we edit the first bid, or create a completely separate bid, locking up
additional funds.

When auction finishing block height is reached (thus triggering the end of
auction), the HASHTAG is transferred to the winning bidder, and locked funds
of losing bidders are unlocked and can be pulled down.
