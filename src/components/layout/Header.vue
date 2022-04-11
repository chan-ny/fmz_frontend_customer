<template>
  <div class="font">
    <!-- fixed-top -->
    <nav
      id="nav_bar"
      class="navbar navbar-expand-md navbar-light bg-light d-none d-sm-flex fixed-top"
    >
      <div class="container">
        <v-img
          src="@/assets/mono.png"
          max-width="50"
          :to="{ name: 'Home' }"
        ></v-img>
        <v-spacer></v-spacer>
        <div class="d-sm-flex">
          <a @click="headleHome">ໜ້າແລກ</a>
          <v-menu offset-y transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <a v-bind="attrs" v-on="on" class="ml-4"
                >ໜວດໝູ້ສິນຄ້າ <v-icon>mdi-chevron-down</v-icon></a
              >
            </template>
            <v-list color="grey lighten-4">
              <v-list-item
                v-for="(item, index) in categories"
                :key="index"
                link
                dense
                @click="isOpenCategory(item)"
              >
                <a>{{ item.ctname }}</a>
              </v-list-item>
            </v-list>
          </v-menu>

          <a class="ml-4" @click="headerAddproduct"
            >ກະຕ້າສິນຄ້າ
            <v-icon v-if="CountItem == 0">mdi-cart</v-icon>
            <v-badge v-else color="blue" overlap :content="CountItem">
              <v-icon>mdi-cart</v-icon>
            </v-badge></a
          >
          <a class="ml-4" @click="headleTransfer"
            >ແຈ້ງໂອນເງິນ
            <v-icon >mdi-cash-multiple</v-icon>
            <!-- <v-badge v-else color="blue" overlap :content="confirmBill">
              <v-icon>mdi-cash-multiple</v-icon>
            </v-badge> -->
          </a>
          <a class="ml-4" @click="headerSearchProduct"
            >ຄົ້ນຫາສີນຄ້າ <v-icon>mdi-magnify</v-icon></a
          >
          <a class="ml-4" @click="headleAbout"
            >ກຽ່ວກັບເຮົາ <v-icon>mdi-comment-alert-outline</v-icon></a
          >
          <div v-if="authen == false">
            <a class="ml-4" @click="headle_register">ລົງທະລຽນສະມາຊີກ</a>
          </div>
          <div v-if="authen == false">
            <a class="ml-4" @click="headleLogin">ລົງຊື່ເຂົ້າໃຊ້</a>
          </div>
          <div v-else>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <a v-bind="attrs" v-on="on" class="ml-4">
                  ຕັ້ງຄ່າ <v-icon>mdi-account-circle</v-icon></a
                >
              </template>
              <v-list color="#EFE911">
                <v-list-item dense>
                  <a
                    ><v-icon>mdi-email-outline</v-icon>:
                    <strong style="color:blue">{{ authenName }}</strong></a
                  >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item dense class="mt-n3 mb-n2">
                  <a @click="headleDataCustomer"
                    ><v-icon>mdi-clipboard-account</v-icon> ຂໍ້ມູນສ່ວນຕົວ:</a
                  >
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item dense class="mt-n3 mb-n2">
                  <a @click="headleChangePassword"
                    ><v-icon>mdi-key-change</v-icon> ປ່ຽນລະຫັດຜ່ານ:</a
                  >
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item dense class="mt-n3 mb-n2">
                  <a @click="headerLogOut"
                    ><v-icon>mdi-logout-variant</v-icon> ອອກຈາກລະບົບ</a
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="d-flex d-sm-none">
          <v-app-bar-nav-icon @click="headleMenu"></v-app-bar-nav-icon>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
var lastScrollTop = 0;
window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    document.getElementById("nav_bar").style.top = "-70px";
  } else {
    document.getElementById("nav_bar").style.top = "";
  }
  lastScrollTop = scrollTop;
});

import CategoryView from "@/service/product/ProductServices";
import { mapState } from "vuex";

export default {
  data() {
    return {
      authenName: "",
      authen: false,
      categories: [],
      confirmBill: ""
    };
  },
  methods: {
    headerLogOut() {
      this.$store.dispatch("setToken", "");
      this.$store.dispatch("setUser", "");
      this.$store.dispatch("headerAddCart", []);
      // this.$store.dispatch('changeDetailP', null)
      this.$router.push({
        name: "Home"
      });
    },
    // view category
    async dsiplayCategory() {
      try {
        let category = (await CategoryView.ViewCategories()).data;
        this.categories = category.data;
        // console.log(category.data);
      } catch (error) {
        console.log(error);
      }
    },
    headleHome() {
      this.$router.push("/");
    },
    ///show menu somtime sx
    headleMenu() {
      this.$store.commit("changeNavigation", true);
    },
    headlelink(item) {
      console.log(item);
    },
    // event login
    headleLogin() {
      this.$router.push({
        name: "Login"
      });
    },
    headle_register() {
      this.$router.push({
        name: "Register"
      });
    },
    headleAbout() {
      this.$router.push({
        name: "About"
      });
    },
    headleTransfer() {
      this.$store.dispatch("EventNotifycation", null);

      this.$router.push({
        name: "Transfer"
      });
    },
    headleDataCustomer() {
      this.$router.push({
        name: "DatatCustomer"
      });
    },
    headleChangePassword() {
      this.$router.push({
        name: "ChangePassword"
      });
    },
    isOpenCategory(item) {
      this.$router.push({
        name: "Category",
        params: { categoryId: item.ctname }
      });
      // console.log(item);
    },
    headerSearchProduct() {
      this.$router.push({
        name: "SearchProduct"
      });
    },
    headerAddproduct() {
      this.$router.push({
        name: "AddProduct"
      });
    }
  },
  created() {
    this.dsiplayCategory();
    let countadd = this.$store.state.addCart;
    if (countadd != null) {
      this.itemCart = countadd.length;
    }
  },
  computed: {
    ...mapState(["isUserLogin", "user", "notifycation"]),
    CountItem() {
      let count = this.$store.state.addCart;
      if (count != null) {
        count = this.$store.state.addCart.length;
      }
      return count;
    }
  },
  mounted() {
    if (this.isUserLogin == false) {
      this.authen = false;
    } else {
      this.authen = true;
      this.authenName = this.$store.state.user;
    }

    if (this.notifycation != null) {
      this.confirmBill = this.notifycation;
    } else {
      this.confirmBill = null;
    }
  },
  watch: {
    isUserLogin() {
      if (this.isUserLogin == false) {
        this.authen = false;
      } else {
        this.authen = true;
        this.authenName = this.$store.state.user;
      }
    },

    notifycation() {
      if (this.notifycation != null) {
        this.confirmBill = this.notifycation;
      } else {
        this.confirmBill = null;
      }
    }
  }
};
</script>
<style scoped>
a {
  color: black !important;
  text-decoration: none;
}
a:hover {
  color: #2196f3 !important;
}
</style>
