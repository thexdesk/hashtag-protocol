<template>
  <b-navbar :transparent="true">
    <template slot="brand">
      <b-navbar-item :href="this.website">
        <img
          src="../assets/logo-white.svg"
          alt="Content tagging for the decentralized web"
        />
        <h1>Hashtag</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <b-dropdown
          :triggers="['hover']"
          v-model="currentMenu"
          aria-role="menu"
          :hoverable="true"
        >
          <b-button
            class="button is-primary"
            type="button"
            slot="trigger"
            role="button"
            icon-left="menu-down"
          >
            <template>
              <span>{{ currentMenu }}</span>
            </template>
          </b-button>

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
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons" v-if="address !== null && address !== undefined">
          <b-button
            icon-left="bank"
            type="is-primary"
            @click="drawdown"
            outlined
          >
            {{ accrued | toEth }} ETH
          </b-button>
          <b-button
            v-if="address !== null && address !== undefined"
            class="button is-primary is-outlined wallet-info"
            @click="walletInfo"
            ><b-tag type="is-primary">{{ balance | toEth(4) }} ETH</b-tag>
            <span class="address">
              {{ address | shortEth }}
            </span>
          </b-button>
        </div>
        <div class="buttons" v-else>
          <b-button
            icon-left="power-plug"
            class="button is-primary is-outlined"
            @click="connectWallet"
          >
            Connect wallet
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Drawdown from "./Drawdown";
import WalletInfo from "./WalletInfo";
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
  mounted() {
    // Sets the currently active dropdown menu.
    this.setCurrentMenu();
    // Start a mutation subscriber to watch for
    // an initialized/changed wallet address.
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type == "setWalletAddress") {
        if (typeof mutation.payload !== "undefined") {
          // Wallet address has changed, initialize the protocol.
          this.initProtocol();
        }
      }
    });

    // Initialize OnBoard. If a previously connected wallet
    // is found the subscriber above will be fired and
    // the protocol will be initialized.
    this.initOnboard();
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  computed: mapGetters(["accrued", "balance", "address", "onboard", "wallet"]),
  methods: {
    async initOnboard() {
      await this.$store.dispatch("initOnboard");
    },
    async initProtocol() {
      await this.$store.dispatch("initProtocol");
    },
    async connectWallet() {
      await this.$store.dispatch("connectWallet");
    },
    async disconnectWallet() {
      await this.$store.dispatch("disconnectWallet");
    },
    walletInfo() {
      const result = this.$buefy.modal.open({
        parent: this,
        component: WalletInfo,
        hasModalCard: true,
        customClass: "custom-class",
        trapFocus: true,
        width: 550,
      });
      this.$store.dispatch("captureOpenModalCloseFn", result.close);
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
        width: 550,
      });

      this.$store.dispatch("captureOpenModalCloseFn", result.close);
    },
  },
};
</script>
<style scoped lang="scss">
.navbar {
  .navbar-end {
    .navbar-item {
      .buttons {
        button.wallet-info {
          padding-left: 5px;

          span {
            &.tag {
              position: relative;
              top: -1px;
            }
          }

          span.address {
            padding-left: 8px;
          }
        }
      }
    }

    .dropdown-menu {
      .dropdown-item {
        font-weight: bold;
      }
    }
  }
}
</style>
