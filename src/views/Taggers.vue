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
        <h1 class="title is-1">Taggers</h1>
        <h2 class="subtitle">Hashtag Protocol Taggers</h2>
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
                        <th class="">
                          <div class="th-wrap">
                            Tagger
                            <!---->
                          </div>
                        </th>
                        <th class="">
                          <div class="th-wrap is-centered">
                            Tag count
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
                        <td data-label="Tagger" class="">
                          <span
                            data-label="0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                            class="is-dark is-bottom is-medium b-tooltip"
                            style="transition-delay: 0ms;"
                            ><span
                              ><a
                                href="/tagger/0x12d062b19a2df1920eb9fc28bd6e9a7e936de4c2"
                                class=""
                                ><span>
                                  0x12...e4c2
                                </span></a
                              ></span
                            ></span
                          >
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          10
                        </td>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                      <tr draggable="false" class="">
                        <!---->
                        <!---->
                        <td data-label="Tagger" class="">
                          <span
                            data-label="0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e"
                            class="is-dark is-bottom is-medium b-tooltip"
                            style="transition-delay: 0ms;"
                            ><span
                              ><a
                                href="/tagger/0x07bd3b64f9f51fe1d5c79f81dfc0460fff305b0e"
                                class=""
                                ><span> swaylocks.eth </span></a
                              ></span
                            ></span
                          >
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          1
                        </td>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                      <tr draggable="false" class="">
                        <!---->
                        <!---->
                        <td data-label="Tagger" class="">
                          <span
                            data-label="0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                            class="is-dark is-bottom is-medium b-tooltip"
                            style="transition-delay: 0ms;"
                            ><span
                              ><a
                                href="/tagger/0xd677aed0965ac9b54e709f01a99ceca205aebc4b"
                                class=""
                                ><span>
                                  0xd6...bc4b
                                </span></a
                              ></span
                            ></span
                          >
                        </td>
                        <td data-label="Tag count" class="has-text-centered">
                          1
                        </td>
                        <!---->
                      </tr>
                      <!---->
                      <!---->
                    </tbody>
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
