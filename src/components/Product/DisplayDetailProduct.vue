<template>
  <div>
    <v-container grid-list-md>
      <v-card class="mx-2 mt-n4">
        <a class="ma-3" @click="headleBack"
          ><v-icon>mdi-arrow-left-bold-circle</v-icon><u> ກັບຄືໜ້າເກົ່າ</u></a
        >
        <br /><br />
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-row justify="space-around" class="ml-2">
              <v-col>
                <v-card class="pa-1">
                  <v-carousel
                    height="auto"
                    cycle
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                    <v-carousel-item v-for="(item, i) in images" :key="i">
                      <div class="ma-2">
                        <v-img
                          max-width="auto"
                          :src="
                            'http://127.0.0.1:8000/storage/images/clothing/' +
                              item
                          "
                        >
                        </v-img>
                      </div>
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-sheet color="blue lighten-5" class="back--text">
              <v-list v-for="(item, index) in displayProduct" :key="index">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="fontsize30">{{ item.pdname }}</div>
                      <div class="fontsize16">
                        <span class="d-flex flex-row"> {{ item.pdId }}</span>
                        <span
                          class="d-flex flex-row-reverse mt-n8 blue--text fontsize30"
                        >
                          {{ new Intl.NumberFormat().format(item.pdprice) }}
                          ກີບ</span
                        >
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class=" mt-n1 ml-3 mr-3" color="red"></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <div class="fontsize18 mt-n2"><u>ຂໍ້ມູນລາຍລະອຽດ</u></div>
                    <v-list-item-subtitle class="fontsize16 pa-3">
                      <strong>{{ item.pdfullname }}</strong>
                      <div><strong>ປະເພດ:</strong> {{ item.ctname }}</div>
                      <div><strong>ແບຣນສິນຄ້າ:</strong> {{ item.bname }}</div>
                      <div><strong>ສີ:</strong> {{ item.cname }}</div>
                    </v-list-item-subtitle>
                    <div class="fontsize18 mt-1"><u>ຂະໜາດຂອງເສື້ອ</u></div>
                    <v-list-item
                      class="ma-n2"
                      v-for="(view, i) in viewSize"
                      :key="i"
                    >
                      <v-list-item-subtitle class="fontsize16">
                        <div class="list">
                          {{ view.sname }} : {{ view.sdetail }}
                        </div>
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list-item-content>
                </v-list-item>
                <div class="ma-3">
                  <div class="mt-n3 fontsize20">ເລືອກ</div>
                  <v-divider class="mt-2 mb-n3" color="red"></v-divider>
                </div>
                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col
                        v-for="(views, i) in viewSize"
                        :key="i"
                        cols="12"
                        sm="3"
                        md="3"
                      >
                        <v-btn
                          v-if="views.srqty == views.QTY"
                          small
                          color="grey lighten-2"
                          @click="selectSize(views)"
                          disabled
                          >ສັ່ງຊື້ ເບີ:{{ views.sname }}
                        </v-btn>
                        <v-btn
                          v-else
                          small
                          color="grey lighten-2 "
                          class="fontsize16 ma-2"
                          @click="selectSize(views)"
                          >ສັ່ງຊື້ ເບີ:{{ views.sname }}
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col v-for="(item, i) in viewNuber" :key="i" cols="12">
                        <div
                          class="pink--text fontsize16 ml-1 mt-n3"
                          v-if="item.srqty < 6"
                        >
                          ຈຳນວນສິນຄ້າໃນສະຕ໊ອກທີ່ມີຄື:
                          <strong> {{ item.sname }} = {{ item.srqty }}</strong>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <div class="ma-3">
                  <div class="mt-4 fontsize20">ສອບຖາມຂໍ້ມູນ</div>
                  <v-divider class="mt-2" color="red"></v-divider>
                  <div class="d-flex">
                    <v-img
                      max-width="40"
                      src="@/assets/clothing/icon/facebook_60px.jpg"
                    ></v-img>
                    <v-img
                      max-width="40"
                      src="@/assets/clothing/icon/whatsapp_60px.jpg"
                    ></v-img>
                    <v-img
                      max-width="40"
                      src="@/assets/clothing/icon/line.jpg"
                    ></v-img>
                  </div>
                </div>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import ProductService from "@/service/product/ProductServices";
import Notify from "@/notify/Notifycation";
export default {
  data() {
    return {
      productId: "",
      detailProduct: [],
      displayProduct: [],
      viewSize: [],
      viewNuber: [],
      images: [],
      isButtone: false,
      addCart: this.$store.state.addCart
    };
  },
  methods: {
    async displayDetailProduct() {
      try {
        let detail = await ProductService.detailProduct(this.productId);
        this.displayProduct = detail.data.data;
        for (let index = 0; index < detail.data.data.length; index++) {
          const main = detail.data.data[index].pdphotos_main;
          let sub = detail.data.data[index].pdphotos_sub;
          sub.unshift(main);
          this.images = sub;
        }
        // console.log(this.displayProduct);
      } catch (error) {
        console.log(error);
      }
    },
    async displaySize() {
      try {
        let size = (await ProductService.viewSize(this.productId)).data;
        for (let index = 0; index < size.data.length; index++) {
          size.data[index].srqty = 0;
        }
        this.viewSize = size.data;
        // console.log(this.viewSize);
      } catch (error) {
        console.log(error);
      }
    },
    async displaySizenumber() {
      try {
        let size = await ProductService.viewSize(this.productId);
        this.viewNuber = size.data.data;
        // console.log(size.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    headerGetProduct() {
      this.detailProduct = this.$store.state.detailProduct;
      this.productId = this.detailProduct.pdId;
    },
    headleBack() {
      this.$store.commit("changeDetailP", null);
      this.$router.push({
        name: "Home"
      });
    },
    selectSize(itemAdd) {
      let items = itemAdd;
      let itemID = this.addCart.filter(item => item.srId === items.srId);
      let isitemId = itemID.length > 0;
      if (isitemId == false) {
        this.addCart.push(items);
        items.srqty = 1;
      } else {
        items.srqty += 1;
      }
      this.$store.dispatch("headerAddCart", this.addCart);

      Notify.showMessage(
        "success",
        "ສັ່ງຊື້ສຳເລັດແລ້ວ ເບີ: " + itemAdd.sname,
        2000
      );
      // console.log(isitemId);
    }
  },

  async created() {
    await this.headerGetProduct();
    await this.displayDetailProduct();
    this.displaySize();
    this.displaySizenumber();
  }
};
</script>
<style scoped>
a {
  text-decoration: none !important;
}
</style>
