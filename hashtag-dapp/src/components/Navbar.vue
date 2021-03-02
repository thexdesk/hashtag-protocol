<template>
  <b-navbar :transparent="true">
    <div>warning</div>
    <template slot="brand">
      <b-navbar-item :href="this.website">
        <img
          src="../assets/logo-white.svg"
          alt="Content tagging for the decentralized web"
        />
        <h1>Hashtag</h1>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item>
        <b-dropdown
          :triggers="['hover']"
          v-model="currentMenu"
          aria-role="menu"
          :hoverable="true"
        >
          <button
            class="button is-primary"
            type="button"
            slot="trigger"
            role="button"
          >
            <template>
              <span>{{ currentMenu }}</span>
            </template>
          </button>

          <b-dropdown-item
            v-for="(value, key) in menusArr"
            :key="key"
            :value="value.text"
            aria-role="menuitem"
            :href="value.path"
          >
            {{ value.text }}
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            v-if="address !== null"
            class="button is-primary is-outlined"
            @click="changeWallet"
          >
            {{ address | shortEth }}
          </a>
          <a v-else class="button is-primary is-outlined" @click="connect">
            Connect wallet
          </a>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div" v-if="address !== null">
        <div class="buttons">
          <a class="button is-primary is-outlined" @click="drawdown">
            {{ accrued | toEth }} Ξ
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Drawdown from "./Drawdown";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      currentMenu: "Dashboard",
      menusArr: {
        dashboard: {
          text: "Dashboard",
          path: "/",
        },
        hashtags: {
          text: "Hashtags",
          path: "/hashtags",
        },
        publishers: {
          text: "Publishers",
          path: "/publishers",
        },
        owners: {
          text: "Owners",
          path: "/owners",
        },
        taggers: {
          text: "Taggers",
          path: "/taggers",
        },
        nfts: {
          text: "Tagged assets",
          path: "/nfts",
        },
      },
    };
  },
  created() {
    this.setCurrentMenu();
  },
  async mounted() {
    await this.initOnboard();
    await this.reconnectWallet();
    await this.initProtocol();
    //this.$store.dispatch("initProtocol");
  },
  computed: mapGetters(["account", "accrued", "address", "onboard", "wallet"]),
  methods: {
    async initOnboard() {
      await this.$store.dispatch("initOnboard");
    },
    async initProtocol() {
      await this.$store.dispatch("initProtocol");
    },
    async reconnectWallet() {
      const previouslySelectedWallet = window.localStorage.getItem(
        "selectedWallet"
      );

      if (previouslySelectedWallet && this.onboard) {
        this.onboard.walletSelect(previouslySelectedWallet);
      }
    },
    async connect() {
      await this.$store.dispatch("connectWallet");
    },
    changeWallet() {
      this.$store.dispatch("changeWallet");
    },
    setCurrentMenu() {
      this.currentMenu = this.$data.menusArr[this.section].text;
    },
    drawdown() {
      const result = this.$buefy.modal.open({
        parent: this,
        component: Drawdown,
        hasModalCard: true,
        customClass: "custom-class",
        trapFocus: true,
        width: 640,
      });

      this.$store.dispatch("captureOpenModalCloseFn", result.close);
    },
  },
};
</script>
<style scoped lang="scss">
.hero-head {
  .navbar-end {
    .dropdown-menu {
      .dropdown-item {
        font-weight: bold;
      }
    }
  }
}
</style>
