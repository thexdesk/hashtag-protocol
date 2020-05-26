<template>
  <div class="body">
    <section class="hero has-background-grey-dark is-bold">
      <div class="hero-head">
        <div class="container">
          <Header></Header>
        </div>
      </div>
    </section>
    <section class="main">
      <div class="container">
        <h1 class="title is-1">#{{ $route.params.hashtag }}</h1>
        <h2 class="subtitle">Hashtag Protocol Token</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <b-tooltip label="Help" position="is-bottom is-pulled-right">
                  <button
                    class="button is-white"
                    @click="isOverviewModalActive = true"
                  >
                    <b-icon
                      icon="help-circle-outline"
                      type="is-dark"
                      @click="isOverviewModalActive = true"
                    >
                    </b-icon>
                  </button>
                </b-tooltip>
                <h2 class="title is-4">Token overview</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Minted</td>
                          <td>11/22/20</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Publisher</td>
                          <td>knownorigin.eth</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Creator</td>
                          <td>artist.eth</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Owner</td>
                          <td>artist.eth</td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Expires</td>
                          <td>11/22/2022 (629 days)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <b-tooltip label="Help" position="is-bottom is-pulled-right">
                  <button
                    class="button is-white is-pulled-right"
                    @click="isSummaryModalActive = true"
                  >
                    <b-icon
                      icon="help-circle-outline"
                      type="is-dark"
                      @click="isSummaryModalActive = true"
                    >
                    </b-icon>
                  </button>
                </b-tooltip>
                <h2 class="title is-4">Revenue summary</h2>
                <div class="b-table">
                  <div class="table-wrapper">
                    <table class="table">
                      <tbody>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Mint price</td>
                          <td>
                            0.8265 ETH<br />0.57855 to Publisher<br />0.24795 to
                            Protocol
                          </td>
                        </tr>
                        <tr draggable="false" class="">
                          <td class="has-text-weight-bold">Earnings</td>
                          <td>
                            0.001 Owner<br />0.001 Publisher<br />0.001 Protocol
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <b-tooltip label="Help" position="is-bottom is-pulled-right">
                <button
                  class="button is-white"
                  @click="isTaggedModalActive = true"
                >
                  <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
                </button>
              </b-tooltip>
              <h2 class="title is-4 is-spaced">
                Content tagged with #SharkWeek
              </h2>
              <b-tabs v-model="activeTab" animated="false">
                <b-tab-item label="ERC-721 NFTs">
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table">
                        <thead>
                          <tr>
                            <!---->
                            <!---->
                            <th class="" style="width: 75px;">
                              <div class="th-wrap"><!----></div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Asset Name
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Project
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Tagged
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Tagger
                                <!---->
                              </div>
                            </th>
                            <th class="">
                              <div class="th-wrap">
                                Publisher
                                <!---->
                              </div>
                            </th>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                        </thead>
                        <tbody>
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmdkqXoVfY8icbqK9BGS9EdMtJXzpPfR5BWeYC4DTu9EtJ"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              Nr. 111 - The Pit
                            </td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmdkqXoVfY8icbqK9BGS9EdMtJXzpPfR5BWeYC4DTu9EtJ"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              Nr. 111 - The Pit
                            </td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmPfpZToedF2MnBgmBAhmWf5rXUYKvMbww2zA16J8JG8tc"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              MetaFactory Tester Badge
                            </td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmSas9z2iudgDFfZc5fJzpzMYEbv5hy6LyroYQCGLtT9GW"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">
                              Dreaming Big Color Dreams
                            </td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="" class="">
                              <img
                                src="https://ipfs.infura.io/ipfs/QmRomtVxLDmRrZG11Z6wtARQWnCChRT17VaEXPf24ykRfD/asset.webp"
                                style="max-width: 75px; max-height: 75px;"
                              />
                            </td>
                            <td data-label="Asset Name" class="">final test</td>
                            <td data-label="Project" class="">
                              KnownOriginDigitalAsset
                            </td>
                            <td data-label="Tagged" class="">
                              <span>2 days ago</span>
                            </td>
                            <td data-label="Tagger" class="">
                              <span>0x07 ... 5b0e</span>
                            </td>
                            <td data-label="Publisher" class="">
                              <span>0xd6 ... bc4b</span>
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                        </tbody>
                        <!---->
                      </table>
                    </div>
                    <!---->
                  </div>
                </b-tab-item>
                <b-tab-item label="IPFS">
                  Coming soon...
                </b-tab-item>
                <b-tab-item label="Unstoppable domains">
                  Coming soon...
                </b-tab-item>
              </b-tabs>
            </article>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isOverviewModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Token overview explained</p>
              </div>
            </div>
            <div class="content">
              <p>
                <strong>Minted</strong> - Date token was created and added to
                Ethereum blockchain.
              </p>
              <p>
                <strong>Publisher</strong> - Wallet address of application
                running Hashtag Protocol where token was minted. This address
                receives share of token minting fees.
              </p>
              <p>
                <strong>Creator</strong> - Wallet address that payed the token
                minting fee.
              </p>
              <p>
                <strong>Owner</strong> - Wallet address of current token owner.
                This address receives share of content tagging fees.
              </p>
              <p>
                <strong>Expires</strong> - Date from which
                <strong>Owner</strong> has 30 days to renew token ownership
                without cost. This is done by sending a transaction to the token
                contract signed by the current owner address. If token is not
                renewed within 30 days, ownership is transferred to the Protocol
                wallet address.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isSummaryModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Revenue summary explained</p>
              </div>
            </div>
            <div class="content">
              <p>
                Stitched into the design of the Hashtag Protocol is a virtuous
                incentive structure that rewards all participants of the system.
              </p>
              <p>
                <strong>Mint price</strong> - Hashtag Protocol uses a fair
                auction method to determine the price of a new Hashtag token.
                The mint price is the amount the winning bidder pays to acquire
                the newly minted Hashtag Token. The proceeds of the auction are
                automatically divided between the Publisher and the Protocol.
              </p>
              <p></p>
              <p>
                <strong>Earnings</strong> - When a digital artifact is tagged
                with a Hashtag token, the Tagger pays a small fee added to the
                standard Ethereum network gas fee. This fee is automatically
                divided among the Hastag Token owner, the originating Publisher
                and the Protocol. The summary shown here represents the lifetime
                sum total of tagging revenue distributed to the Owner, Publisher
                & Protocol for this Hashtag token.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isTaggedModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Tagged content explained</p>
              </div>
            </div>
            <div class="content">
              <p>
                Stitched into the design of the Hashtag Protocol is a virtuous
                incentive structure that rewards all participants of the system.
              </p>
              <p>
                <strong>Mint price</strong> - Hashtag Protocol uses a fair
                auction method to determine the price of a new Hashtag token.
                The mint price is the amount the winning bidder pays to acquire
                the newly minted Hashtag Token. The proceeds of the auction are
                automatically divided between the Publisher and the Protocol.
              </p>
              <p></p>
              <p>
                <strong>Earnings</strong> - When a digital artifact is tagged
                with a Hashtag token, the Tagger pays a small fee added to the
                standard Ethereum network gas fee. This fee is automatically
                divided among the Hastag Token owner, the originating Publisher
                and the Protocol. The summary shown here represents the lifetime
                sum total of tagging revenue distributed to the Owner, Publisher
                & Protocol for this Hashtag token.
              </p>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";

export default {
  name: "HashtagDetail",
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
    };
  },
};
</script>

<style lang="scss"></style>
