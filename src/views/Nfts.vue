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
        <h1 class="title is-1">Tagged NFTs</h1>
        <div class="columns is-tablet is-centered">
          <div class="column is-12">
            <article class="is-white box">
              <help-modal
                modal="isRecentlyTaggedModalActive"
                @popModalFromChild="popModal"
                class="is-pulled-right"
              ></help-modal>
              <h2 class="title is-4 is-spaced"></h2>
              <div class="b-table">
                <!---->
                <!---->
                <div class="table-wrapper has-mobile-cards">
                  <table tabindex="0" class="table is-hoverable">
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
                            src="https://ipfs.infura.io/ipfs/QmU65xAi3H5oaZk1L9dVjZ7EqGFjoJbydXiSAp2ankgQxc"
                            style="max-width: 75px; max-height: 75px;"
                          />
                        </td>
                        <td data-label="Asset Name" class="">
                          <span class="has-text-weight-bold"
                            ><a
                              href="/nft/0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e/51001"
                              class=""
                            >
                              test
                            </a></span
                          >
                        </td>
                        <td data-label="Project" class="">
                          KnownOriginDigitalAsset
                        </td>
                        <td data-label="Hashtag" class="">
                          <span class="has-text-weight-bold"
                            ><a href="/hashtag/dapp" class=""> #dapp </a></span
                          >
                        </td>
                        <td>
                          12 days ago
                        </td>
                        <td>
                          <span
                            ><a
                              href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                              class=""
                            >
                              <span>
                                0xd6...bc4b
                              </span></a
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
                        <td data-label="" class="">
                          <img
                            src="https://ipfs.infura.io/ipfs/QmRomtVxLDmRrZG11Z6wtARQWnCChRT17VaEXPf24ykRfD/asset.webp"
                            style="max-width: 75px; max-height: 75px;"
                          />
                        </td>
                        <td data-label="Asset Name" class="">
                          <span class="has-text-weight-bold"
                            ><a
                              href="/nft/0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e/53901"
                              class=""
                            >
                              final test
                            </a></span
                          >
                        </td>
                        <td data-label="Project" class="">
                          KnownOriginDigitalAsset
                        </td>
                        <td data-label="Hashtag" class="">
                          <span class="has-text-weight-bold"
                            ><a href="/hashtag/vinc3" class="">
                              #vinc3
                            </a></span
                          >
                        </td>
                        <td>
                          12 days ago
                        </td>
                        <td>
                          <span
                            ><a
                              href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                              class=""
                            >
                              <span>
                                0xd6...bc4b
                              </span></a
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
                        <td data-label="" class="">
                          <img
                            src="https://ipfs.infura.io/ipfs/QmPfpZToedF2MnBgmBAhmWf5rXUYKvMbww2zA16J8JG8tc"
                            style="max-width: 75px; max-height: 75px;"
                          />
                        </td>
                        <td data-label="Asset Name" class="">
                          <span class="has-text-weight-bold"
                            ><a
                              href="/nft/0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e/54001"
                              class=""
                            >
                              MetaFactory Tester Badge
                            </a></span
                          >
                        </td>
                        <td data-label="Project" class="">
                          KnownOriginDigitalAsset
                        </td>
                        <td data-label="Hashtag" class="">
                          <span class="has-text-weight-bold"
                            ><a href="/hashtag/blockrocket" class="">
                              #blockrocket
                            </a></span
                          >
                        </td>
                        <td>
                          12 days ago
                        </td>
                        <td>
                          <span
                            ><a
                              href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                              class=""
                            >
                              <span>
                                0xd6...bc4b
                              </span></a
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
                        <td data-label="" class="">
                          <img
                            src="https://ipfs.infura.io/ipfs/QmdkqXoVfY8icbqK9BGS9EdMtJXzpPfR5BWeYC4DTu9EtJ"
                            style="max-width: 75px; max-height: 75px;"
                          />
                        </td>
                        <td data-label="Asset Name" class="">
                          <span class="has-text-weight-bold"
                            ><a
                              href="/nft/0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e/21001"
                              class=""
                            >
                              Nr. 111 - The Pit
                            </a></span
                          >
                        </td>
                        <td data-label="Project" class="">
                          KnownOriginDigitalAsset
                        </td>
                        <td data-label="Hashtag" class="">
                          <span class="has-text-weight-bold"
                            ><a href="/hashtag/sharkweek" class="">
                              #sharkweek
                            </a></span
                          >
                        </td>
                        <td>
                          12 days ago
                        </td>
                        <td>
                          <span
                            ><a
                              href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                              class=""
                            >
                              <span>
                                0xd6...bc4b
                              </span></a
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
                        <td data-label="" class="">
                          <img
                            src="https://ipfs.infura.io/ipfs/QmdkqXoVfY8icbqK9BGS9EdMtJXzpPfR5BWeYC4DTu9EtJ"
                            style="max-width: 75px; max-height: 75px;"
                          />
                        </td>
                        <td data-label="Asset Name" class="">
                          <span class="has-text-weight-bold"
                            ><a
                              href="/nft/0x2df6816286c583a7ef8637cd4b7cc1cc62f6161e/21001"
                              class=""
                            >
                              Nr. 111 - The Pit
                            </a></span
                          >
                        </td>
                        <td data-label="Project" class="">
                          KnownOriginDigitalAsset
                        </td>
                        <td data-label="Hashtag" class="">
                          <span class="has-text-weight-bold"
                            ><a href="/hashtag/micha3l" class="">
                              #micha3l
                            </a></span
                          >
                        </td>
                        <td>
                          12 days ago
                        </td>
                        <td>
                          <span
                            ><a
                              href="/publisher/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                              class=""
                            >
                              <span>
                                0xd6...bc4b
                              </span></a
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
              <div class="level">
                <div class="level-left"></div>
                <div class="level-right">
                  <div class="level-item">
                    <nav class="pagination">
                      <a
                        role="button"
                        href="#"
                        disabled="disabled"
                        aria-label="Page 0."
                        class="pagination-link pagination-previous"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-left mdi-24px"></i></span
                      ></a>
                      <a
                        role="button"
                        href="#"
                        aria-label="Page 2."
                        class="pagination-link pagination-next"
                        ><span class="icon" aria-hidden="true"
                          ><i class="mdi mdi-chevron-right mdi-24px"></i></span
                      ></a>
                      <ul class="pagination-list">
                        <!---->
                        <!---->
                        <li>
                          <a
                            role="button"
                            href="#"
                            aria-label="Current page, Page 1."
                            aria-current="true"
                            class="pagination-link is-current"
                            >1</a
                          >
                        </li>
                        <li>
                          <a
                            role="button"
                            href="#"
                            aria-label="Page 2."
                            class="pagination-link"
                            >2</a
                          >
                        </li>
                        <li><span class="pagination-ellipsis">…</span></li>
                        <li>
                          <a
                            role="button"
                            href="#"
                            aria-label="Page 12."
                            class="pagination-link"
                            >12</a
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import HelpModal from "../components/HelpModal";

export default {
  name: "Nfts",
  components: {
    Footer,
    Header,
    HelpModal,
  },
  data() {
    return {
      activeTab: null,
      isRecentlyTaggedModalActive: false,
    };
  },
};
</script>

<style lang="scss"></style>
