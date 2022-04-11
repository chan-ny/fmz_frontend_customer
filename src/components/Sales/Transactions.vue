<template>
  <div>
    <v-container grid-list-md>
      <v-row class="mt-n10">
        <v-col cols="12" sm="8" md="8">
          <v-stepper v-model="e1">
            <v-stepper-header dense>
              <v-stepper-step :complete="e1 > 1" step="1">
                <div class="white--text fontsize16">ເພີ່ມທີ່ຈັດສົ່ງ</div>
              </v-stepper-step>

              <v-divider color="white"></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                <div class="white--text fontsize16">ແຈ້ງໂອນເງິນ</div>
              </v-stepper-step>

              <v-divider color="white"></v-divider>
              <v-stepper-step step="3" :complete="e1 == 3">
                <div class="white--text fontsize16">ສຳເລັດ</div>
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <transac-address></transac-address>
              </v-stepper-content>

              <v-stepper-content step="2">
                <transac-tranfer @transfer="e1 = 3"></transac-tranfer>
              </v-stepper-content>

              <v-stepper-content step="3">
                <transac-fianl></transac-fianl>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <amount-cart></amount-cart>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Transactions_address from "./Transactions_address";
import Transactions_transfer from "./Transactions_transfer";
import Transactions_final from "./Transactions_final";

import AmountCart from "./AmountCart";
import { mapState } from "vuex";
export default {
  components: {
    "transac-address": Transactions_address,
    "transac-tranfer": Transactions_transfer,
    "transac-fianl": Transactions_final,
    "amount-cart": AmountCart
  },
  data() {
    return {
      e1: 1
    };
  },
  computed: {
    ...mapState(["stepper", "isUserLogin"])
  },
  mounted() {
    if (this.stepper > 0) {
      this.e1 = this.stepper;
    }
    if (this.isUserLogin == false) {
      this.$router.push({
        name: "Login"
      });
    }
  },
  watch: {
    stepper() {
      if (this.stepper > 0) {
        this.e1 = this.stepper;
      }
    }
  }
};
</script>
<style scoped>
.v-stepper__header {
  margin-top: -10px;
  background: #444444 !important;
  height: 60px;
  color: white !important;
}
th {
  color: black !important;
  font-size: 14px !important;
}
td {
  font-size: 12px !important;
}
</style>
