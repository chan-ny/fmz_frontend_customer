<template>
  <div class="container">
    <div class="row mt-n6">
      <div class="col-12 col-sm-2 col-md-2 ">
        <v-sheet color="grey lighten-1" class="pa-3 d-none d-md-block">
          <div class="fontsize20 black--text ">
            ປະເພດສິນຄ້າ
          </div>
        </v-sheet>
        <div class="d-none d-sm-flex">
          <v-list>
            <v-list-item link @click="headerSelectNull">
              <v-list-item-title>All</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(item, index) in categoriesHome"
              :key="index"
              link
              @click="headerSelect(item)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <div>
                    {{ item.ctname }}
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <div class="col-12 col-sm-10 col-md-10 ">
        <v-sheet color="grey lighten-1" class="pa-3">
          <div class="fontsize20 black--text">
            ລາຍການສິນຄ້າທົ່ວໄປ
          </div>
        </v-sheet>
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
                      <div class="fontsize18 mb-n3">{{ item.pdname }}</div>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
              <v-card-text align="left" class="mt-n2">
                <div class="fontsize14">ປະເພດ: {{ item.ctname }}</div>
                <div class="fontsize14">ສີ: {{ item.cname }}</div>
                <div class="mt-2">
                  <span
                    ><v-btn small color="success" @click="isOpenOrder(item)"
                      ><v-icon small class="mr-2">mdi-cart</v-icon
                      >ສັ່ງຊື້</v-btn
                    ></span
                  >
                  <span
                    ><b class="fontsize18 ml-1 blue--text">
                      {{ new Intl.NumberFormat().format(item.pdprice) }} ກີບ</b
                    ></span
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <br />
        <v-sheet color="grey lighten-1" class="pa-3 mt-6">
          <div class="fontsize20 black--text">
            ລາຍການສິນຄ້າຂາຍດີ
          </div>
        </v-sheet>

        <v-row>
          <div
            v-if="loadingbeat == true"
            class="d-flex justify-center mb-6 mt-1"
          >
            <v-progress-circular
              v-if="loadingbeat == true"
              :size="50"
              indeterminate
              color="green"
            ></v-progress-circular>
          </div>
          <v-col
            v-for="(item, i) in sellGood.data"
            :key="i"
            cols="12"
            sm="3"
            md="3"
          >
            <v-card align="center" justify="center" outlined>
              <v-img
                class="align-end"
                width="100%"
                :src="
                  'http://127.0.0.1:8000/storage/images/clothing/' +
                    item.pdphotos_main
                "
              >
                <v-card-title>
                  <div class="fontsize18 mb-n2 ">{{ item.pdname }}</div>
                </v-card-title>
              </v-img>
              <v-card-text align="left" class="mt-n2">
                <div class="fontsize14">ປະເພດ: {{ item.ctname }}</div>
                <div class="fontsize14">ສີ: {{ item.cname }}</div>

                <div class="mt-2">
                  <span
                    ><v-btn small color="success" @click="isOpenOrder(item)"
                      ><v-icon small class="mr-2">mdi-cart</v-icon
                      >ສັ່ງຊື້</v-btn
                    ></span
                  >
                  <span
                    ><b class="fontsize18 ml-1 blue--text"
                      >{{ new Intl.NumberFormat().format(item.sdPrice) }} ກີບ</b
                    ></span
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <pagination
            size="small"
            align="center"
            :data="sellGood"
            @pagination-change-page="getResults"
          ></pagination>
        </v-row>
        <br />
      </div>
    </div>

    <br />
    <h3>@Mono Men's Clothing Store</h3>
  </div>
</template>
<script>
import ProductService from "@/service/product/ProductServices";
import axios from "axios";
import SearchPage from "../callsystem/Search";
export default {
  components: {
    "search-page": SearchPage
  },
  data() {
    return {
      count: "",
      productHome: [],
      categoriesHome: [],
      categoryname: "",
      loading: false,
      loadingbeat: false,

      sellGood: {}
    };
  },

  methods: {
    headleCategory(item) {
      this.$router.push({
        name: "Category",
        params: { categoryId: item }
      });
    },
    async getResults(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      this.loadingbeat = true;
      await new Promise(resolve => setTimeout(resolve, 900));

      axios
        .get("http://127.0.0.1:8000/api/sellbest?page=" + page)
        .then(response => {
          this.sellGood = response.data.data;
          this.loadingbeat = false;
          // console.log(response.data.data);
        });
    },

    //preview product home
    async displayProduct() {
      try {
        this.loading = true;
        let product = await ProductService.ProductHome({
          ctname: this.categoryname
        });
        this.loading = false;
        this.count = product.data.conut;
        this.productHome = product.data.data;
        // console.log(this.count);
      } catch (error) {
        console.log(error);
      }
    },

    /// preview categories home
    async displyaCategories() {
      try {
        let category = (await ProductService.ViewCategories()).data;
        this.categoriesHome = category.data;
        // console.log(category);
      } catch (error) {
        console.log(error);
      }
    },
    async headerSelect(item) {
      this.categoryname = item.ctname;
      this.loading = true;
      await this.displayProduct();
      this.loading = false;
      // console.log(item.ctname);
    },
    async headerSelectNull() {
      this.categoryname = "";
      this.loading = true;
      await this.displayProduct();
      this.loading = false;
    },

    ///isopen Order
    isOpenOrder(item) {
      this.$store.commit("changeDetailP", item);
      this.$router.push({ name: "DetailProduct" });
      // console.log("store",this.$store.state.detailProduct);
    }
  },

  created() {
    this.displayProduct();
    this.displyaCategories();
    this.getResults();
  }
};
</script>
<style scoped>
.v-card.on-hover.theme--dark {
  background-color: rgba(#fff, 0.8);
}
</style>
