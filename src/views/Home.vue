<template>
  <div>
    <div class="hero">
      <header>
        <h1>Hashtag</h1>
        <ul>
          <router-link to="/hashtags"
            ><li class="headerLink emphasis">
              Hashtags
            </li></router-link
          >
          <li class="headerLink emphasis">Developers</li>
        </ul>
        <ul>
          <li class="appLink">APP</li>
        </ul>
      </header>

      <div class="layout hero-flex">
        <h1>
          kellym.eth just <br />
          tokenized <strong class="emphasis">#girlpower</strong> <br />
          with <strong class="emphasis">Hashtag Protocol</strong>
        </h1>

        <h1>Stock Photo Here</h1>
      </div>
    </div>
    <section class="heroSection layout">
      <p class="heroContent">
        Hashtag is a decentralized protocol built for developers to tokenize
        hashtags, link them to online media and surface this data for use in
        networks, platforms and applications.
      </p>

      <img src="../assets/hashtag-protocol-sample-logo.png" />
    </section>
    <section class="heroSection darker layout">
      <div class="layout">
        <div class="heroContent">
          <h1>Try Hashtag</h1>
          <h2>
            Community built interfaces <br />
            integrating the protocol
          </h2>

          <div class="ui container push-down">
            <div class="ui grid">
              <div class="row">
                <div class="five wide column">
                  <div class="ui segments">
                    <div class="ui segment">
                      <h3 class="ui header">
                        <img src="../assets/hashtag-protocol-sample-logo.png" />
                      </h3>
                    </div>

                    <div class="ui container">
                      <table class="ui celled striped table change-table">
                        <tbody>
                          <tr>
                            <td>
                              <h3>Hashtag Interface</h3>
                              <p>
                                Experienced business people all know that
                                opportunities really interface with dialogues.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="five wide column">
                  <div class="ui segments">
                    <div class="ui segment">
                      <h3 class="ui header">Known Origin Logo</h3>
                    </div>
                    <div class="ui container">
                      <table class="ui celled striped table change-table">
                        <tbody>
                          <tr>
                            <td>
                              <h3>KnownOrigin</h3>
                              <p>
                                Total quality management (TQM) passes the baton
                                concerning the scenarios.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="five wide column">
                  <div class="ui segments">
                    <div class="ui segment">
                      <h3 class="ui header">CryptoKitties Logo</h3>
                    </div>
                    <div class="ui container">
                      <table class="ui celled striped table change-table">
                        <tbody>
                          <tr>
                            <td>
                              Guesstimate raises a flag over time frames.
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
.emphasis {
  color: #24ae60;
  font-weight: bold;
}
section.heroSection.darker {
  background-color: #bdbdbb;
  width: 100%;

  color: #4a4a4a;

  h1 {
    color: #a7a7a7;
  }

  .layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
section.heroSection {
  background-color: #ffffff;
  height: 60vh;
  width: 90%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  p.heroContent {
    width: 50%;

    font-size: 30px;
    font-weight: normal;
    line-height: 50px;
    color: #282828;
  }

  img {
    width: 200px;
    margin-right: 10em;
  }
}
.hero {
  background-color: #bdbdbb;
  height: 60vh !important;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .layout.hero-flex {
    display: flex;
    flex-direction: row;

    :nth-child(1) {
      width: 70%;
    }
  }

  .layout h1 {
    font-size: 2.6em;
    font-weight: normal;
    line-height: 50px;
    color: #ffffff;
  }
}
.headerLink,
.appLink {
  background-color: transparent;
}
.appLink {
  border-radius: 2px;
  border: 2px solid #24ae60;
  color: #24ae60;
  width: 72px;
  text-align: center;
}
</style>
