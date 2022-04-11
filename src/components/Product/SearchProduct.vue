<template>
  <div class="container">
    <v-card outlined class="mt-n6">
      <v-toolbar dense color="grey lighten-2">
        <v-toolbar-title>
          ລາຍການສີນຄ້າທັງໝົດ
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-text-field
          class="mb-n4"
          dense
          label="ຄົ້ນຫາສິນຄ້າ"
          prepend-icon="mdi-magnify"
          v-model="productName"
          @keyup.enter="headleSearchproduct"
        ></v-text-field>
      </v-toolbar>
      <v-row>
        <div v-if="loading == true" class="d-flex justify-center mb-6 mt-1">
          <v-progress-circular
            v-if="loading == true"
            :size="50"
            indeterminate
            color="green"
          ></v-progress-circular>
        </div>
        <div v-if="count == 0">
          <search-page></search-page>
        </div>
        <v-col
          v-for="(item, index) in productHome"
          :key="index"
          cols="12"
          sm="3"
          md="3"
        >
          <v-card align="center" justify="center">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img
                  class="align-end"
                  width="100%"
                  :src="
                    'http://127.0.0.1:8000/storage/images/clothing/' +
                      item.pdphotos_main
                  "
                >
                  <v-card-title>
                    <div class="fontsize20">{{ item.pdname }}</div>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-hover>
            <v-card-text align="left">
              <div class="fontsize14">{{ item.ctname }}</div>
              <div class="fontsize14">{{ item.cname }}</div>
              <div class="mt-2">
                <span
                  ><v-btn small color="success" @click="isOpenOrder(item)"
                    ><v-icon small class="mr-2">mdi-cart</v-icon>ສັ່ງຊື້</v-btn
                  ></span
                >
                <span
                  ><b class="fontsize18 ml-4 blue--text"
                    >₭ {{ new Intl.NumberFormat().format(item.pdprice) }}</b
                  ></span
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import ProductService from "@/service/product/ProductServices";
import SearchPage from "@/callsystem/Search";
export default {
  components: {
    "search-page": SearchPage
  },
  data() {
    return {
      productHome: [],
      productName: "",
      loading: false,
      count: 0
    };
  },
  methods: {
    //preview product home
    async displayProduct() {
      try {
        this.loading = true;
        let product = await ProductService.viewProduct({
          pdname: this.productName
        });
        this.productHome = product.data.data;
        this.count = product.data.count;
        this.loading = false;
        // console.log(product.data);
      } catch (error) {
        console.log(error);
      }
    },
    isOpenOrder(item) {
      this.$store.commit("changeDetailP", item);
      this.$router.push({ name: "DetailProduct" });
      // console.log("store",this.$store.state.detailProduct);
    },
    headleSearchproduct() {
      this.displayProduct();
    }
  },

  created() {
    this.displayProduct();
  }
};
</script>
<style></style>
