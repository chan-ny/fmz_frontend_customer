<template>
  <div>
    <v-row class="mx-auto">
      <v-col cols="12" sm="10" md="10">
        <v-card outlined>
          <v-row>
            <v-col cols="12" sm="8" md="8">
              <div class="green--text ml-3">ລໍຖ້າໂອນເງິນ</div>
              <div class="green--text ml-3"><b>ບີນທີ: 102</b></div>
              <div class="fontsize20 red--text ml-2 mb-2">
                ຈຳນວນທີ່ຕ້ອງຈ່າຍ:
                {{ new Intl.NumberFormat().format(Total) }} ກີບ
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card outlined class="mb-2">
          <!-- stepone -->
          <div class="fontsize14 ml-2">
            <b>1 ເລືອກຮູບແບບການຈ່າຍເງິນ</b>
          </div>
          <v-combobox
            v-model="bankName"
            color="green"
            dense
            :items="ItemBank"
            item-value="bkName"
            item-text="bkName"
            outlined
            label="ເລືອກທະນາຄານ"
            class="mx-4 mt-2"
            @change="hesderSelectBank"
          ></v-combobox>
          <v-list class="mt-n6 mb-2">
            <v-list-item v-for="(item, index) in selectItemBnak" :key="index">
              <v-img
                src="@/assets/clothing/Group 50.png"
                max-width="60px"
              ></v-img>
              <v-list-item-title>
                <div class="fontsize13">
                  - ຊື້ບັນຊີ:
                  <strong class="fontsize16">{{ item.bkAccount }}</strong>
                </div>
                <div class="fontsize13">- ເລກບັນຊີ: {{ item.bkNumberic }}</div>
              </v-list-item-title>
            </v-list-item>

            <div class="d-flex justify-md-center">
              <v-img
                :src="'http://127.0.0.1:8000/storage/images/bank/' + QR"
                max-width="280px"
              ></v-img>
            </div>
          </v-list>

          <!-- step two   -->
          <div class="fontsize14 ml-2">
            <b>2 ອັບໂຫລດຮູບພາບການຊໍາລະເງິນ</b>
          </div>
          <div class="d-flex justify-md-center fontsize14">
            <v-text-field
              v-model="numberSix"
              dense
              outlined
              class="mx-4 mt-2"
              label="ເລກບັນຊີຫົກໂຕຫຼັງ"
              prepend-icon="mdi-bank"
              placeholder="xxxxx352-001"
              :error-messages="NumberSixError"
              @input="$v.numberSix.$touch()"
              @blur="$v.numberSix.$touch()"
            ></v-text-field>
          </div>
          <h5 class="ml-5">ເລືອກຮູບພາບ</h5>
          <div class="d-flex justify-md-center">
            <v-card elevation="14" class="mb-3 ml-4">
              <div v-if="!preview" @click="selectImage">
                <v-img width="220px" src="@/assets/addpayment.png"></v-img>
              </div>
              <div v-else @click="selectImage">
                <v-img contain width="220px" :src="preview"></v-img>
              </div>
              <input
                style="display: none"
                type="file"
                ref="fileinput"
                accept="image/*"
                @change="priviewImage"
              />
            </v-card>
          </div>

          <div class=" justify-md-center mb-2 ml-3">
            <v-btn
              color="success"
              :loading="stateloading"
              tile
              @click="addPaymeny"
            >
              ຈ່າຍເງິນຄ່າສິນຄ້າ
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="1" md="1"></v-col>
    </v-row>
  </div>
</template>
<script>
import BankService from "@/service/Transactions/BankService";
import TransactionService from "@/service/Transactions/TransactionService";
import { mapState } from "vuex";

import Notify from "@/notify/Notifycation";

import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    numberSix: { required, minLength: minLength(6), maxLength: maxLength(6) }
  },
  data() {
    return {
      TransferTotal: 0,
      payment: false,
      ItemBank: [],
      bankName: "",

      selectItemBnak: [],
      QR: "",
      preview: null,
      image: null,
      numberSix: 0,
      stateloading: false
    };
  },
  methods: {
    completeTransfer() {
      this.$emit("transfer");
    },
    selectImage() {
      this.$refs.fileinput.click();
    },
    priviewImage(event) {
      var input = event.target;
      if (input.files) {
        var resder = new FileReader();
        resder.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        resder.readAsDataURL(input.files[0]);
      }
    },
    async showListBank() {
      try {
        let bank = (await BankService.showBank()).data;
        this.ItemBank = bank.data;
        // console.log(bank.data);
      } catch (error) {
        console.log(error);
      }
    },
    async hesderSelectBank() {
      try {
        let select = await BankService.selectBank(this.bankName.bkId);
        this.selectItemBnak = select.data.data;
        this.QR = select.data.data[0].bkImage;
      } catch (error) {
        console.log(error);
      }
    },
    async addPaymeny() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage(
          "error",
          "<sapn style='color: red'>ປ້ອນເລກທ້າຍກ່ອນ</sapn>",
          3000
        );
      } else {
        if (this.bankName.bkId > 0 && this.image != null) {
          this.stateloading = true;
          let save = await TransactionService.saveBill({
            customer_Id: this.customerID,
            invQty: this.CountNumber,
            invPrice: this.Total,
            invState: "success",
            list: this.ModifyName
          });
          // console.log(save.data.data);
          this.SavePayment(save.data.data.invId, save.data.data.invPrice);
          // this.SavePayment("IN03", 483000);
          await new Promise(resolve => setTimeout(resolve, 2000))
          this.stateloading = false;
        } else {
          Notify.showMessage(
            "error",
            "ກະລູນາເລືອກ <sapn style='color: red'>ທະນະຄານໂອນເງິນກ່ອນ</sapn> ຫຼື  <sapn style='color: blue'>ອັບໂຫລດຫຼັກຖານການໂອນກ່ອນ</sapn>",
            3000
          );
        }
      }
    },

    async SavePayment(invId, invPrice) {
      let value = new FormData();
      value.append("invoince_Id", invId);
      value.append("bank_Id", this.bankName.bkId);
      value.append("pmImage", this.image);
      value.append("pmNumbersix", this.numberSix);
      value.append("pmPrice", invPrice);
      value.append("pmState", "pay");

      const config = {
        headers: { "content-type": "multipart/form-data; boundary=something" }
      };

      try {
        let save = await TransactionService.savePayments(value, config);
        this.$store.dispatch("headerAddCart", []);
        this.$store.dispatch("headerStepoer", 3);
        this.$store.commit("setInvoinceID", invId);
        Notify.showMessage("success", save.data.message, 3000);
      } catch (error) {
        console.log("can't save payment");
      }
    }
  },
  created() {
    this.showListBank();
  },
  computed: {
    ...mapState(["addCart", "customerID", "transferStep"]),
    Total() {
      let total = 0;
      this.addCart.forEach(element => {
        total += element.pdprice * element.srqty;
      });
      return total;
    },
    CountNumber() {
      var num = this.addCart.reduce((acc, item) => acc + Number(item.srqty), 0);
      return num;
    },
    NumberSixError() {
      const error = [];
      if (!this.$v.numberSix.$dirty) return error;
      !this.$v.numberSix.minLength &&
        error.push("ກະລຸນາປ້ອນໃຫ້ຄົບ 6 ຕົວເລກທ່າຍສຸດກ່ອນ");
      !this.$v.numberSix.maxLength &&
        error.push("ໂຕເລກຕ້ອງມີ 6 ຕົວເລກເທົ່ານັ້ນ");
      !this.$v.numberSix.required && error.push("ປ້ອນຂໍ້ມູນກ່ອນ");
      return error;
    },
    ModifyName() {
      let change = [];
      for (let index = 0; index < this.addCart.length; index++) {
        change.push({
          storage_Id: this.addCart[index].srId,
          product_Id: this.addCart[index].pdId,
          sdQty: this.addCart[index].srqty,
          sdPrice: this.addCart[index].pdprice
        });
      }
      return change;
    }
  }
};
</script>
<style scoped>
.step_header {
  color: black !important;
  background: #e3e3e3;
  padding: 10px !important;
  margin: 2px 2px 0px 2px;
}
</style>
