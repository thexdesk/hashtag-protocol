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
        <h1 class="title is-1">#SharkWeek</h1>
        <div class="tile is-ancestor">
          <div class="tile is-horizontal">
            <div class="tile is-parent is-6 is-12-mobile">
              <div class="tile is-child box">
                <p class="title is-4">Overview</p>
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
            <article class="is-white notification">
              <h3 class="title is-3 is-spaced">Tagged artifacts</h3>
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
};
</script>

<style lang="scss"></style>
