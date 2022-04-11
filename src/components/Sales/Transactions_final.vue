<template>
  <div class="font">
    <div id="pdfHTML">
      <div>
        <span class="fontsize24 blue--text"> ບີນສັ່ງຊື້ສິນຄ້າ</span>
        <span class="ml-4 green--text">
          ກະລຸນາເກັບບີນນີ້ໄວ້ ເພື່ອເປັນຫຼັກຖານ</span
        >
      </div>
      <v-toolbar dense>
        <b>ລາຍການສັ່ງຊື້ສິນຄ້າ</b>
      </v-toolbar>
      <v-row class="mt-1 ml-2">
        <v-col cols="12" sm="4" md="4">
          <div class="blod" v-if="reders.invId != undefined">
            ບີນທີ: <strong style="color:green">{{ reders.invId }}</strong>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <div>ວັນທີ່: {{ reders.created_at }}</div>
        </v-col>
      </v-row>
      <v-row class="ma-2">
        <v-col cols="12" sm="4" md="4">
          <div>ຈ່າຍເງິນ</div>
          <div style="color:green">ຈ່າຍສໍາເລັດແລ້ວ</div>
        </v-col>
      </v-row>
      <hr />
      <v-row class="mx-2 mt-1">
        <v-col cols="12" sm="6" md="6">
          <div v-for="(item, index) in store.data" :key="index" class="font">
            <div class="blod">ຮ້ານເສື້ອຜ້າ</div>
            <div>ຊື້: {{ item.store_name }}</div>
            <div>ເບີໂທ: {{ item.store_phone }}</div>
            <div>ອີເມວ: {{ item.store_email }}</div>
            <div>ເວັບໄຊຣ: {{ item.store_website }}</div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <div class="font">
            <div class="blod">ຈັດສົ່ງທີ່</div>
            <div>ຊື່: {{ reders.cus_fullname }}</div>
            <div>ເບີໂທ: {{ reders.cus_phone }}</div>
            <div>ລາຍລະອຽດ:</div>
            <div class="detail">
              <div class="ma-2 blod fontsize13">
                {{
                  reders.cus_provint +
                    " , " +
                    reders.cus_distric +
                    " , " +
                    reders.cus_home +
                    " , " +
                    reders.cus_description
                }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <hr class="ma-2" />
      <v-row>
        <v-col cols="12">
          <v-simple-table class="ma-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th>ລາຍການ#</th>
                  <th>ຂະໜາດ</th>
                  <th>ຈຳນວນ</th>
                  <th>ລາຄາ</th>
                  <th>ລາຄາລວມ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in orderpdf" :key="index">
                  <td>{{ item.pdId }}</td>
                  <td>{{ item.sname }}</td>
                  <td>{{ item.sdQty }}</td>
                  <td>{{ new Intl.NumberFormat().format(item.sdPrice) }}</td>
                  <td>{{ new Intl.NumberFormat().format(item.total) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <div class="fontsize16 mr-5 d-flex justify-md-end">
        ຈຳນວນສິນຄ້າ: {{ CountNumber }} ລາຍການ
      </div>
      <div class="fontsize30 mr-1 d-flex justify-md-end">
        {{ new Intl.NumberFormat().format(Total) }} ກີບ
      </div>
    </div>
    <div class="d-flex justify-md-end mt-2">
      <v-btn color="primary" @click="completeFinal">
        ສຳເລັດການສັ່ງຊື້
      </v-btn>
    </div>
  </div>
</template>
<script>
import Sellservice from "@/service/Sells/SellService";
import StoreService from '@/service/StoreService'
import { mapState } from "vuex";
import html2pdf from "html2pdf.js";
export default {
  data() {
    return {
      values: "",
      orderpdf: [],
      reders: "",
      store: []
    };
  },
  methods: {
    completeFinal() {
      this.$store.commit("setInvoinceID", 0);
      var element = document.getElementById("pdfHTML");
      var opt = {
        margin: 1,
        filename: "payment.pdf",
        image: { type: "jpeg", quality: 0.9 },
        html2canvas: {
          scale: 3,
          logging: true,
          dpi: 192,
          letterRendering: true,
          width: 800,
          height: 1900
        },

        jsPDF: { unit: "em", format: "a4", orientation: "p" }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save();

      this.$store.dispatch("headerStepoer", 1);
      this.$router.push({
        name: "Transfer"
      });
    },
    async startCapture(displayMediaOptions) {
      let captureStream = null;

      try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(
          displayMediaOptions
        );
      } catch (err) {
        console.error("Error: " + err);
      }
      return captureStream;
    },

    async viewOrderPdfs() {
      try {
        let value = (await Sellservice.viewOrderPDF(this.invoiceID)).data;
        this.orderpdf = value.data;
        this.reders = this.orderpdf[0];
        // console.log(this.reders);
      } catch (error) {
        console.log("error viewOrderPdf");
      }
    },
    async SelectStore() {
      try {
        let store = (await StoreService.selectStore()).data;
        this.store = store;
        // console.log(this.store);
      } catch (error) {
        console.log("store not found");
      }
    }
  },
  computed: {
    ...mapState(["invoiceID"]),
    Total() {
      let total = 0;
      this.orderpdf.forEach(item => {
        total += item.sdQty * item.sdPrice;
      });
      return total;
    },
    CountNumber() {
      var num = this.orderpdf.reduce(
        (acc, item) => acc + Number(item.sdQty),
        0
      );
      return num;
    }
  },
  watch: {
    invoiceID() {
      if (this.invoiceID != 0) {
        this.viewOrderPdfs();
      }
    }
  },
  mounted() {
    if (this.invoiceID != 0) {
      this.viewOrderPdfs();
    }

    this.SelectStore();
  }
};
</script>
<style scoped>
.blod {
  font-weight: bold !important;
}
th {
  font-weight: bold !important;
  color: black !important;
  font-size: 14px !important;
}
#pdfHTML {
  border: 1px solid black;
  background-color: lightyellow;
  font-family: "Saysettha OT" !important;
  font-size: 18x;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 15px;
  padding-right: 15px;
}
.detail {
  border: 0.5px solid black;
  background-color: lightyellow;
}
</style>
