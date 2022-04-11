<template>
  <div>
    <v-container>
      <div>
        <v-card outline class="mt-1 mx-2 pa-5 mx-auto" max-width="400px">
          <h3>
            # ປ່ງນລະຫັດຜ່ານ
          </h3>

          <v-form class="mt-4">
            <v-text-field
              v-model="PasswordOld"
              type="password"
              prepend-icon="mdi-lock"
              dense
              label="ລະຫັດຜ່ານເກົ່າ..."
              :error-messages="PasswordOLDError"
              @input="$v.PasswordOld.$touch()"
              @blur="$v.PasswordOld.$touch()"
            ></v-text-field>
            <v-text-field
              required
              v-model="Password"
              :type="showpassword ? 'text' : 'password'"
              name="password"
              label="ລະຫັດຜ່ານໃໝ່"
              prepend-icon="mdi-lock"
              :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpassword = !showpassword"
              :error-messages="PasswordError"
              @input="$v.Password.$touch()"
              @blur="$v.Password.$touch()"
            ></v-text-field>
            <v-text-field
              required
              v-model="RepeatPassword"
              :type="showRepeatpassword ? 'text' : 'password'"
              name="repeatpassword"
              label="ທວນລະຫັດຜ່ານ"
              prepend-icon="mdi-lock"
              :append-icon="showRepeatpassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showRepeatpassword = !showRepeatpassword"
              :error-messages="RepeatPasswordError"
              @input="$v.RepeatPassword.$touch()"
              @blur="$v.RepeatPassword.$touch()"
            ></v-text-field>
          </v-form>
          <v-card-actions class="d-flex justify-center">
            <v-btn tile color="red" dark @click="hesdleCancel">ຍົກເລີກ</v-btn>
            <v-btn tile color="success" @click="changPassword">ປ່ຽນແປ່ງ</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

import { mapState } from "vuex";
import SMS from "@/service/sms";
import Notify from "@/notify/Notifycation";
export default {
  mixins: [validationMixin],

  validations: {
    Password: { required, minLength: minLength(6), maxLength: maxLength(6) },
    PasswordOld: { required, minLength: minLength(6), maxLength: maxLength(6) },

    RepeatPassword: { required, sameAsPassword: sameAs("Password") }
  },
  data() {
    return {
      showpassword: false,
      showRepeatpassword: false,
      Password: "",
      RepeatPassword: "",
      PasswordOld: ""
    };
  },
  methods: {
    hesdleCancel() {
      this.$router.push({
        name: "Home"
      });
    },
    async changPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("warning", "ປ້ອນຂໍ້ມູນກ່ອນ", 4000);
      } else {
        try {
          await SMS.changePassword(this.customerID, {
            email: this.user,
            password: this.PasswordOld,
            newpassword: this.Password
          });
          Notify.showMessage("success", "ປ່ຽນລະຫັດຜ່ານສຳເລັດແລ້ວ", 3000);
          this.headerLogOut();
        } catch (error) {
          Notify.showMessage("error", "ລະຫັດຜ່ານເກົ່າບໍ່ຖືກຕ້ອງ", 4000);
        }
      }
    },
    headerLogOut() {
      this.$store.dispatch("setToken", "");
      this.$store.dispatch("setUser", "");
      this.$store.dispatch("headerAddCart", []);
      // this.$store.dispatch('changeDetailP', null)
      this.$router.push({
        name: "Login"
      });
    }
  },
  computed: {
    ...mapState(["customerID", "user"]),
    PasswordOLDError() {
      const error = [];
      if (!this.$v.PasswordOld.$dirty) return error;
      !this.$v.PasswordOld.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ຫຼາຍກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.PasswordOld.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ນ້ອຍກວ່າ 7 ຕົວອັກສອນ");
      !this.$v.PasswordOld.required && error.push("ປ້ອນລະຫັດຜ່ານກ່ອນ");
      return error;
    },
    PasswordError() {
      const error = [];
      if (!this.$v.Password.$dirty) return error;
      !this.$v.Password.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ຫຼາຍກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.Password.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ນ້ອຍກວ່າ 7 ຕົວອັກສອນ");
      !this.$v.Password.required && error.push("ປ້ອນລະຫັດຜ່ານກ່ອນ");
      return error;
    },
    RepeatPasswordError() {
      const error = [];
      if (!this.$v.RepeatPassword.$dirty) return error;
      !this.$v.RepeatPassword.sameAsPassword &&
        error.push("ລະຫັດຜ່ານບໍ່ຕົງກັນ ກະລູນາກວດສອບ");
      !this.$v.RepeatPassword.required && error.push("ປ້ອນລະຫັດຜ່ານກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
