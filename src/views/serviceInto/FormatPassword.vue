<template lang="">
  <div>
    <v-container>
      <div v-if="statePage == false">
        <v-card outline class="mt-1 mx-2 pa-5 mx-auto" max-width="400px">
          <h3>
            ລືມລະຫັດຜ່ານ
          </h3>
          <v-form class="ma-4">
            <vue-phone-number-input
              v-model="phone"
              default-country-code="LA"
              @update="onUpdate"
            />
          </v-form>
          <v-card-actions class="d-flex justify-center">
            <v-btn tile color="red" dark @click="hesdleCancel">ຍົກເລີກ</v-btn>
            <v-btn tile color="success" @click="sendSMS">ປ່ຽນແປ່ງ</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else>
        <v-card outline class="mt-1 mx-2 pa-5 mx-auto" max-width="400px">
          <h3>
            ລືມລະຫັດຜ່ານ
          </h3>
          <v-form class="mt-4">
            <v-text-field
              label="ປ້ອນລະຫັດ OTP"
              dense
              outlined
              v-model="OTP"
            ></v-text-field>
          </v-form>
          <div class="red--text">
            ທາງເຮົາໄດ້ສົ່ງລະຫັດ OTP ໄປໃຫ້ທ່ານແລ້ວ ກະລຸນາລໍຖ້າ
          </div>

          <v-card-actions class="d-flex justify-center">
            <v-btn tile color="red" dark @click="black">ຍ້ອນກັບ</v-btn>
            <v-btn tile color="success" @click="checkOTP">ປ່ຽນແປ່ງ</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import Notify from "@/notify/Notifycation";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

import SMS from "@/service/sms";
export default {
  components: {
    "vue-phone-number-input": VuePhoneNumberInput
  },
  data() {
    return {
      phone: null,
      results: {},
      statePage: false,
      OTP: ""
    };
  },
  methods: {
    hesdleCancel() {
      this.$router.push({
        name: "Home"
      });
    },
    black() {
      this.statePage = false;
    },
    onUpdate(payload) {
      this.results = payload;
    },
    async sendSMS() {
      if (this.results.formattedNumber == undefined) {
        Notify.showMessage("warning", "ປ້ອນຂໍ້ມູນກ່ອນ", 4000);
      } else {
        let check = this.results.formattedNumber.substring(1);

        if (check.length < 13) {
          Notify.showMessage("warning", "ປ້ອນຂໍ້ມູນ 020 ໃສ່ແດ່", 4000);
        } else {
          try {
            await SMS.checkPhone({
              phone: check
            });

            await SMS.SMSPhone({
              phone: check
            });
            this.statePage = true;
          } catch (error) {
            Notify.showMessage("error", "ເບີຂອງບໍ່ມີໃນລະບົບ", 4000);
          }
        }
      }
    },
    async checkOTP() {
      try {
        await SMS.checkOTP(this.OTP);
        this.$router.push({
          name: "ResetPassword",
          params: { otp: this.OTP }
        });
      } catch (error) {
        Notify.showMessage("error", "ລະຫັດ OTP ບໍ່ຖືກຕ້ອງ", 4000);
      }
    }
  }
};
</script>
<style lang=""></style>
