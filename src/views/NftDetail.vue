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
                <article class="tile is-child box">
                  <help-modal
                    modal="isTaggingModalActive"
                    @popModalFromChild="popModal"
                    class="is-pulled-right"
                  ></help-modal>
                  <p class="title is-5">
                    Tag this asset
                  </p>
                  <b-field>
                    <b-autocomplete
                      placeholder="Enter a hashtag"
                      icon="pound"
                      field="name"
                    >
                    </b-autocomplete>
                  </b-field>
                  <hr />
                  <help-modal
                    modal="isRecentTagsModalActive"
                    @popModalFromChild="popModal"
                    class="is-pulled-right"
                  ></help-modal>
                  <h2 class="title is-5">Recent tags</h2>
                  <div class="b-table">
                    <!---->
                    <!---->
                    <div class="table-wrapper has-mobile-cards">
                      <table tabindex="0" class="table is-hoverable">
                        <thead>
                          <tr>
                            <!---->
                            <!---->
                            <th class="">
                              <div class="th-wrap">
                                Hashtag
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
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/Kaiju" class="">
                                  #Kaiju
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">10 days ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                    class=""
                                    ><span>
                                      0x12...e4c2
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/Dapp" class="">
                                  #Dapp
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">10 days ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                    class=""
                                    ><span>
                                      0x12...e4c2
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/Vinc3" class="">
                                  #Vinc3
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">10 days ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                    class=""
                                    ><span>
                                      0x12...e4c2
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/genesis" class="">
                                  #genesis
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">14 days ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x401cbf2194d35d078c0bcdae4bea42275483ab5f"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x401cbf2194d35d078c0bcdae4bea42275483ab5f"
                                    class=""
                                    ><span>
                                      0x40...ab5f
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/SharkWeek" class="">
                                  #SharkWeek
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">20 days ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e"
                                    class=""
                                    ><span>
                                      0x07...5b0e
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/Micha3l" class="">
                                  #Micha3l
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">24 days ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                    class=""
                                    ><span>
                                      0x12...e4c2
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/James" class="">
                                  #James
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">a month ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                    class=""
                                    ><span>
                                      0x12...e4c2
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/AmaZ3" class="">
                                  #AmaZ3
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">a month ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                    class=""
                                    ><span>
                                      0x12...e4c2
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/bob" class="">
                                  #bob
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">a month ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0xf718da09e7f07a0ee3b73d26d3b469aa29d2b5b9"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0xf718da09e7f07a0ee3b73d26d3b469aa29d2b5b9"
                                    class=""
                                    ><span>
                                      0xf7...b5b9
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <!---->
                          </tr>
                          <!---->
                          <!---->
                          <tr draggable="false" class="">
                            <!---->
                            <!---->
                            <td data-label="Hashtag" class="">
                              <span class="has-text-weight-bold"
                                ><a href="/hashtag/blockchain" class="">
                                  #blockchain
                                </a></span
                              >
                            </td>
                            <td data-label="Minted" class="">a month ago</td>
                            <td data-label="Owner" class="">
                              <span
                                data-label="0xf718da09e7f07a0ee3b73d26d3b469aa29d2b5b9"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/owner/0xf718da09e7f07a0ee3b73d26d3b469aa29d2b5b9"
                                    class=""
                                    ><span>
                                      0xf7...b5b9
                                    </span></a
                                  ></span
                                ></span
                              >
                            </td>
                            <td data-label="Publisher" class="">
                              <span
                                data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class="is-dark is-bottom is-medium b-tooltip"
                                style="transition-delay: 0ms;"
                                ><span
                                  ><a
                                    href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                    class=""
                                    ><span>
                                      0xd6...bc4b
                                    </span></a
                                  ></span
                                ></span
                              >
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
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isTaggingModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Tag an asset</p>
              </div>
            </div>
            <div class="content">
              <p>Copy tbd</p>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
        :active.sync="isRecentTagsModalActive"
        :width="640"
        scroll="keep"
      >
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Recent tags</p>
              </div>
            </div>
            <div class="content">
              <p>
                A listing of Hashtags this asset has been recently tagged with.
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
      isTaggingModalActive: false,
      isRecentTagsModalActive: false,
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
