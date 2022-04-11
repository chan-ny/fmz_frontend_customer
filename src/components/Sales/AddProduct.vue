<template>
  <div>
    <v-container grid-list-xs class="mt-n10">
      <v-row>
        <v-col cols="12" sm="8" md="8">
          <v-card>
            <v-toolbar color="primary" dense dark>
              <v-toolbar-title class="fontsize18"
                >ສິນຄ້າໃນລາຍການ</v-toolbar-title
              >
            </v-toolbar>
            <v-card-text>
              <div>
                <v-list>
                  <v-list-item v-for="(item, index) in dataCart" :key="index">
                    <v-row>
                      <v-col cols="12" sm="3" md="3">
                        <v-img
                          class="mx-auto"
                          max-width="103px"
                          :src="
                            'http://127.0.0.1:8000/storage/images/clothing/' +
                              item.pdphotos_main
                          "
                        ></v-img>
                        <div class="d-sm-none">
                          <v-divider color="red lighten-3"></v-divider>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="8" md="8">
                        <v-list-item-content>
                          <v-list-item-title>
                            <div class="fontsize16">
                              <v-card
                                class="d-flex justify-space-between"
                                flat
                                tile
                              >
                                <b>ຊື້ສິນຄ້າ: {{ item.pdname }} </b>
                                <v-btn
                                  icon
                                  color="red"
                                  @click="isOpenRemove(item)"
                                >
                                  <v-icon>mdi-delete-forever</v-icon>
                                </v-btn>
                              </v-card>
                            </div>
                            <div class="fontsize16">
                              ຂະໜາດ: {{ item.sname }}
                            </div>
                            <div class="d-flex justify-end fontsize16 mt-2">
                              <v-row>
                                <v-col cols="12" sm="4" md="4">
                                  <span>
                                    <v-btn
                                      v-if="item.srqty == item.QTY"
                                      small
                                      color="success"
                                      tile
                                      @click="++item.srqty"
                                      disabled
                                      >ເພີ່ມ</v-btn
                                    >
                                    <v-btn
                                      v-else
                                      small
                                      color="success"
                                      tile
                                      @click="++item.srqty"
                                      >ເພີ່ມ</v-btn
                                    >
                                    <v-btn
                                      v-if="item.srqty == 1"
                                      small
                                      color="error"
                                      class="ml-2"
                                      tile
                                      @click="--item.srqty"
                                      disabled
                                      >ລືບ</v-btn
                                    >
                                    <v-btn
                                      v-else
                                      small
                                      color="error"
                                      class="ml-2"
                                      tile
                                      @click="--item.srqty"
                                      >ລືບ</v-btn
                                    >
                                  </span>
                                </v-col>
                                <v-col cols="12" sm="8" md="8">
                                  <div class="d-flex float-right">
                                    <v-text-field
                                      v-if="item.srqty == item.QTY"
                                      class="number fontsize20 "
                                      dense
                                      outlined
                                      type="number"
                                      v-model="item.srqty"
                                      @change="headerCardt()"
                                      disabled
                                    ></v-text-field>
                                    <v-text-field
                                      v-else
                                      class="number fontsize20 "
                                      dense
                                      outlined
                                      type="number"
                                      v-model="item.srqty"
                                      @change="headerCardt()"
                                    ></v-text-field>
                                    <div class="float-right">
                                      <span class="ml-5 fontsize24"
                                        >{{
                                          new Intl.NumberFormat().format(
                                            item.pdprice
                                          )
                                        }}
                                        ກີບ</span
                                      >
                                    </div>
                                  </div>
                                </v-col>
                              </v-row>
                            </div>
                            <v-divider class="mt-1"></v-divider>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <amount-cart></amount-cart>
          <v-btn
            large
            width="100%"
            color="success"
            class="fontsize20"
            @click="headleTransactions"
            >ຊຳລະເງິນ</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

import AmountCart from "./AmountCart";
import Notify from "@/notify/Notifycation";
export default {
  components: {
    "amount-cart": AmountCart
  },
  data() {
    return {
      addNumber: 0,
      dataCart: []
    };
  },
  methods: {
    headerCardt() {
      this.$store.dispatch("headerAddCart", this.dataCart);
    },
    headleTransactions() {
      if (this.dataCart.length == 0) {
        Notify.showMessage("warning", "ຕ້ອງຊື້ສິນຄ້າກ່ອນ", 2000);
      } else {
        this.$router.push({
          name: "Transactions"
        });
      }
    },
    isOpenRemove(item) {
      this.dataCart.splice(this.dataCart.indexOf(item), 1);
      this.$store.dispatch("headerAddCart", this.dataCart);
    }
  },
  computed: {
    ...mapState(["addCart"])
  },
  mounted() {
    if (this.addCart.length > 0) {
      this.dataCart = this.addCart;
    }
  }
};
</script>
<style>
th {
  font-size: 16px !important;
}
.number {
  width: 100px !important;
}
</style>
