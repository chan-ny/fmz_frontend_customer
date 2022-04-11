<template>
  <div>
    <div class="d-flex d-sm-none">
      <v-app-bar color="grey lighten-3" app dense>
        <v-toolbar-title
          ><v-img
            src="@/assets/mono.png"
            max-width="40"
            @click="headerHome"
          ></v-img
        ></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="headerAddproduct">
          <v-icon v-if="CountItem == 0">mdi-cart</v-icon>
          <v-badge v-else color="blue" overlap :content="CountItem">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
        <v-menu offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on"
              ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
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
        <v-menu offset-y v-if="authen == true">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon text v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle</v-icon></v-btn
            >
          </template>
          <v-list color="grey lighten-3">
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

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-card flat width="200">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title @click="headerHome"
                    >ໜ້າແລກ</v-list-item-title
                  >
                  <v-list-item-title class="mt-3 " @click="headerSearchProduct"
                    >ຄົ້ນຫາສີນຄ້າ
                    <v-icon>mdi-magnify</v-icon></v-list-item-title
                  >
                  <v-list-item-title class="mt-3" @click="headleAbout"
                    >ກຽ່ວກັບເຮົາ
                    <v-icon
                      >mdi-comment-alert-outline</v-icon
                    ></v-list-item-title
                  >
                  <v-list-item-title
                    v-if="authen == false"
                    class="mt-3"
                    @click="headle_register"
                    >ລົງທະລຽນສະມາຊີກ</v-list-item-title
                  >
                  <v-list-item-title
                    v-if="authen == false"
                    class="mt-3"
                    @click="headleLogin"
                    >ລົງຊື່ເຂົ້າໃຊ້</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
  </div>
</template>
<script>
import CategoryView from "@/service/product/ProductServices";
import { mapState } from "vuex";
export default {
  data() {
    return {
      authen: false,
      categories: []
    };
  },
  methods: {
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
    headleAbout() {
      this.$router.push({
        name: "About"
      });
    },
    headerHome() {
      this.$router.push({
        name: "Home"
      });
    },
    headerAddproduct() {
      this.$router.push({
        name: "AddProduct"
      });
    },
    headerSearchProduct() {
      this.$router.push({
        name: "SearchProduct"
      });
    },
    headle_register() {
      this.$router.push({
        name: "Register"
      });
    },
    headleLogin() {
      this.$router.push({
        name: "Login"
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
    headerLogOut() {
      this.$store.dispatch("setToken", "");
      this.$store.dispatch("setUser", "");
      this.$store.dispatch("headerAddCart", []);
      // this.$store.dispatch('changeDetailP', null)
      this.$router.push({
        name: "Home"
      });
    },
    isOpenCategory(item) {
      this.$router.push({
        name: "Category",
        params: { categoryId: item.ctname }
      });
      // console.log(item);
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
  created() {
    this.dsiplayCategory();
    let countadd = this.$store.state.addCart;
    if (countadd != null) {
      this.itemCart = countadd.length;
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
<style></style>
