<template>
  <div class="container">
    <v-container grid-list-md>
      <v-card class="mt-n8 px-3 ">
        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-card-title class="fontsize20 d-none d-sm-flex">
            ປະເພດສິນຄ້າທັງໝົດ
          </v-card-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-combobox
            class="mt-8"
            v-model="categoty"
            :items="categoriesHome"
            label="ເລືອກປະເພດສິນຄ້າ"
            outlined
            dense
            item-text="ctname"
            item-value="ctname"
            @change="isOpenCategory"
          ></v-combobox>
          <v-btn color="primary" icon @click="hesderClearCategory">
            <v-icon>mdi-filter-remove</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-subtitle class="mt-n8 ml-4 d-none d-sm-flex">
          ຈຳນວນ
          <strong style="color:red" class="mx-2">{{ count }}</strong> ລາຍການ
        </v-card-subtitle>
        <v-divider class="mt-n2 d-none d-sm-flex"></v-divider>

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
                      ><v-icon small class="mr-2">mdi-cart</v-icon
                      >ສັ່ງຊື້</v-btn
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
    </v-container>
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
      loading: false,
      count: 0,
      productHome: [],
      categoriesHome: [],
      categoryname: "",
      categoty: ""
    };
  },
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    },
    ///isopen Order
    isOpenOrder(item) {
      this.$store.commit("changeDetailP", item);
      this.$router.push({ name: "DetailProduct" });
      // console.log("store",this.$store.state.detailProduct);
    },
    async displayProduct() {
      try {
        this.loading = true;
        let product = await ProductService.ProductHome({
          ctname: this.categoryname
        });
        this.productHome = product.data.data;
        this.count = product.data.conut;
        this.loading = false;
        // console.log(this.categoryname);
      } catch (error) {
        console.log("error product", error);
      }
    },
    /// preview categories home
    async displyaCategories() {
      try {
        let category = (await ProductService.ViewCategories()).data;
        this.categoriesHome = category.data;
        // console.log(category);
      } catch (error) {
        console.log("error category", error);
      }
    },
    isOpenCategory() {
      this.categoryname = "";
      this.categoryname = this.categoty.ctname;
      this.displayProduct();
    },
    hesderClearCategory() {
       this.categoryname  = "";
      this.displayProduct();
    }
  },

  created() {
    this.categoryname = this.$route.params.categoryId;
    this.displayProduct();
    this.displyaCategories();
  }
};
</script>
<style></style>
