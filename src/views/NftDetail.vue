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
        <h1 class="title is-1">MetaFactory Tester Badge</h1>
        <h2 class="subtitle">ERC-721 Digital asset</h2>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <help-modal
                  modal="isNewHashtagsModalActive"
                  @popModalFromChild="popModal"
                  class="is-pulled-right"
                ></help-modal>
                <div class="card">
                  <div class="card-image">
                    <figure class="image">
                      <img
                        src="https://ipfs.infura.io/ipfs/QmPfpZToedF2MnBgmBAhmWf5rXUYKvMbww2zA16J8JG8tc"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <h2 class="title is-4">Asset information</h2>
                    <div class="b-table">
                      <div class="table-wrapper">
                        <table class="table">
                          <tbody>
                            <tr draggable="false" class="">
                              <td class="has-text-weight-bold">Name</td>
                              <td>
                                MetaFactory Tester Badge
                              </td>
                            </tr>
                            <tr draggable="false" class="">
                              <td class="has-text-weight-bold">Project</td>
                              <td>
                                KnownOrigin
                              </td>
                            </tr>
                            <tr draggable="false" class="">
                              <td class="has-text-weight-bold">Asset Id</td>
                              <td>
                                {{ id }}
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
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <b-tooltip
                  label="Help"
                  position="is-bottom is-pulled-right"
                  type="is-dark"
                >
                  <button
                    class="button is-white is-pulled-right"
                    @click="isSummaryModalActive = true"
                  >
                    <b-icon icon="help-circle-outline" type="is-dark"> </b-icon>
                  </button>
                </b-tooltip>
              </div>
            </div>
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
import HelpModal from "../components/HelpModal";

export default {
  name: "NftDetail",
  components: {
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      isOverviewModalActive: false,
      isSummaryModalActive: false,
      isTaggedModalActive: false,
      name: this.$route.params.name,
      type: this.$route.params.type,
      contract: this.$route.params.contract,
      id: this.$route.params.id,
      tagsByHashtag: null,
      hashtagsByName: null,
    };
  },
};
</script>

<style lang="scss"></style>
