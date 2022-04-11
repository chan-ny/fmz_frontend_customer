<template>
  <div>
    <v-container>
      <div align="center">
        <div class="fontsize24 mt-n10">ການສັ່ງຊື້ສິນຄ້າ</div>
        <div class="mt-n2">
          <v-text-field
            v-model="SearchData"
            class="input "
            prepend-icon="mdi-magnify"
            label="ຄົ້ນຫາເລກບີນທີ່ສັ່ງຊື້..."
            required
          ></v-text-field>
          <div>
            ຈຳນວນ <strong>{{ count }}</strong> ລາຍການ
          </div>
        </div>
      </div>
      <v-divider class="mt-1" color="red"></v-divider>
      <div class="ma-2">
        <v-card outlined>
          <v-data-table
            dense
            :headers="headerColumn"
            :items="payments.data"
            class="elevation-1 grey lighten-4"
            loading="true"
            :search="SearchData"
          >
            <template v-slot:item.invPrice="{ item }">
              <div>{{ new Intl.NumberFormat().format(item.invPrice) }} ກີບ</div>
            </template>
            <template v-slot:item.pmState="{ item }">
              <v-chip
                close
                text-color="white"
                class="pa-2"
                small
                :color="formatColor(item.pmState)"
                :close-icon="formatIcon(item.pmState)"
                >{{ item.pmState }}</v-chip
              >
            </template>

            <template v-slot:item.active="{ item }">
              <v-btn
                small
                dark
                color="deep-purple darken-1"
                @click="headerView(item)"
              >
                <v-icon small>mdi-eye</v-icon>
                ເບີ່ງຂໍ້ມູນ
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </div>
      <div>
        <v-row>
          <v-col cols="12">
            <v-dialog v-model="dialog" persistent max-width="1000px">
              <v-card>
                <v-card-title class="grey lighten-2 fontsize20">
                  ຂໍ້ມູນສັ່ງຊື້
                </v-card-title>
                <div class="ml-2">
                  <v-list>
                    <v-list-item>
                      <v-img
                        outline
                        max-width="200px"
                        :src="
                          'http://127.0.0.1:8000/storage/images/payment/' +
                            Image
                        "
                        @click="isOpenURL"
                      >
                      </v-img>
                      <v-list-item-content>
                        <div class="fontsize24 ml-2">ເລກບີນ: {{ BillID }}</div>
                        <div class="fontsize18 ml-2">
                          ຈຳນວນລວມ: {{ Numbers }}
                        </div>
                        <div class="fontsize18 ml-2">
                          ເງິນລວມ:
                          {{ new Intl.NumberFormat().format(Toatl) }} ກີບ
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-divider class="mt-n3"></v-divider>
                  <v-data-table
                    dense
                    :headers="headerViewOrder"
                    :items="viewOrder"
                    class="elevation-1 grey lighten-3 ma-3"
                    loading="true"
                  >
                    <template v-slot:item.sdPrice="{ item }">
                      <div>
                        {{ new Intl.NumberFormat().format(item.sdPrice) }} ກີບ
                      </div>
                    </template>
                    <template v-slot:item.total="{ item }">
                      <div>
                        {{ new Intl.NumberFormat().format(item.total) }} ກີບ
                      </div>
                    </template>
                  </v-data-table>
                </div>
                <v-card-actions>
                  <v-btn color="red" outlined @click="dialog = false"
                    >ປີດ</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </div>
      <div>
        <div align="center" class="mt-8">
          <div class="mt-3 fontsize18">
            <strong
              >ກະລຸນາຄົ້ນຫາຂໍ້ມູນ ທີ່ທ່ານສັ່ງຊື້ ຫຼື
              ຕີດຕໍ່ພະນັກງານໃນຮ້ານ</strong
            >
          </div>

          <div class="d-flex justify-center mt-4">
            <v-img
              max-width="50"
              src="@/assets/clothing/icon/facebook_60px.jpg"
            ></v-img>
            <v-img
              max-width="50"
              src="@/assets/clothing/icon/whatsapp_60px.jpg"
            ></v-img>
            <v-img max-width="50" src="@/assets/clothing/icon/line.jpg"></v-img>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import TransactionService from "@/service/Transactions/TransactionService";
import { mapState } from "vuex";
export default {
  data() {
    return {
      SearchData: "",
      headerColumn: [
        { text: "ບິນເລກທີ", value: "invId" },
        { text: "ເລກບັນຊີ", value: "pmNumbersix" },
        { text: "ຈຳນວນລວມ", value: "invQty" },
        { text: "ລາຄາລວມ", value: "invPrice" },
        { text: "ສະຖານະ", value: "pmState" },
        { text: "ວັນທີ່ສັ່ງຊື້", value: "created_at" },
        { text: "ເລືອກ", sortable: false, value: "active" }
      ],
      payments: [],
      count: 0,
      headerViewOrder: [
        { text: "ລະຫັດສິນຄ້າ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຊື່ເຕັມ", value: "pdfullname" },
        { text: "ຂະໜາດ", value: "sname" },
        { text: "ຈຳນວນ", value: "sdQty" },
        { text: "ລາຄາ", value: "sdPrice" },
        { text: "ລວມ", value: "total" }
      ],
      dialog: false,
      viewOrder: [],
      BillID: "",
      Numbers: "",
      Toatl: "",
      Image: ""
    };
  },
  methods: {
    async viewPayment() {
      try {
        let order = (await TransactionService.viewPayment(this.customerID))
          .data;
        this.payments = order;
        this.count = order.count;
        // console.log(order);
      } catch (error) {
        console.log(error);
      }
    },
    async headerView(item) {
      this.Image = item.pmImage;
      try {
        let view = (await TransactionService.viewOrdered(item.invId)).data;
        this.viewOrder = view.data;
        this.BillID = item.invId;
        this.Numbers = item.invQty;
        this.Toatl = item.invPrice;
        this.dialog = true;
        // console.log(item);
      } catch (error) {
        console.log(error);
      }
    },
    isOpenURL() {
      window.location =
        "http://127.0.0.1:8000/storage/images/payment/" + this.Image;
    },
    formatColor(item) {
      if (item == "pay") {
        return "orange darken-3";
      } else {
        return "green accent-4";
      }
    },
    formatIcon(item) {
      if (item == "pay") {
        return "mdi-cached";
      } else {
        return "mdi-checkbox-marked-circle";
      }
    }
  },
  computed: {
    ...mapState(["customerID", "isUserLogin", "notifycation"])
  },
  mounted() {
    if (this.isUserLogin == false) {
      this.$router.push({
        name: "Login"
      });
    }
    if (this.addCart != null) {
      this.dataCart = this.addCart;
    }
  },

  watch: {
    notifycation() {
      if (this.notifycation != null) {
        this.viewPayment();
      }
    }
  },
  created() {
    this.viewPayment();
  }
};
</script>
<style scoped>
.input {
  width: 350px !important;
  font-size: 18px !important;
}
</style>
