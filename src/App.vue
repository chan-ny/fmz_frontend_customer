<template>
  <div>
    <template v-if="$route.meta.allowAccess == false">
      <v-app class="font">
        <v-main>
          <breads-crumbs></breads-crumbs>
          <router-view />
        </v-main>
      </v-app>
    </template>
    <template v-else>
      <v-app class="font">
        <navigration-drawer></navigration-drawer>
        <header-dasboard></header-dasboard>
        <breads-crumbs></breads-crumbs>
        <v-main>
          <router-view />
        </v-main>
        <footer-menu></footer-menu>
      </v-app>
    </template>
  </div>
</template>

<script>
import Footer from "./components/layout/Footer";
import Navigrationdrawer from "./components/layout/NavigrationDrawer";
import Header from "./components/layout/Header";
import Breacrumbs from "./components/layout/braedcrumbs";
import { mapState } from "vuex";
export default {
  components: {
    "header-dasboard": Header,
    "footer-menu": Footer,
    "navigration-drawer": Navigrationdrawer,
    "breads-crumbs": Breacrumbs
  },
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    refreshPage() {
      // console.log("ok");
    }
  },
  mounted() {
    window.Echo.channel("channel").listen("Notifycations", e => {
      // console.log(e);
      this.$store.dispatch("EventNotifycation", e.value);
    });
  },
  computed: {
    ...mapState(["token", "user"])
  },
  watch: {
    user() {
      if (this.user != "") {
        this.refreshPage();
      }
    }
  },
  created() {
    if (this.user != "") {
      this.refreshPage();
    }
  }
};
</script>
<style>
.selector-for-some-widget {
  box-sizing: content-box;
}
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

.font {
  font-family: "Noto Sans lao" !important;
}
.fontsize30 {
  font-weight: bold !important;
  font-size: 30px !important;
}
.fontsize24 {
  font-weight: bold !important;
  font-size: 24px !important;
}
.fontsize20 {
  font-weight: bold !important;
  font-size: 20px !important;
}
.fontsize18 {
  font-size: 18px !important;
}
.fontsize16 {
  font-size: 16px !important;
}
.fontsize14 {
  font-size: 14px !important;
}
.fontsize13 {
  font-size: 13px !important;
}
.fontsize12 {
  font-size: 12px !important;
}
</style>
