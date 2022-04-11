<template >
  <div>
    <v-container>
      <div>
        <v-card outline class="mt-1 mx-2 pa-5 mx-auto" max-width="400px">
          <h3>
            ສ້າງລະຫັດຜ່ານໃໝ່
          </h3>
          <v-form class="ma-4">
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
            <v-btn tile color="success" @click="resetpwd">ປ່ຽນແປ່ງ</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

import SMS from "@/service/sms";
import Notify from "@/notify/Notifycation";
export default {
  mixins: [validationMixin],

  validations: {
    Password: { required, minLength: minLength(6) },
    RepeatPassword: { required, sameAsPassword: sameAs("Password") }
  },
  data() {
    return {
      showpassword: false,
      showRepeatpassword: false,
      Password: "",
      RepeatPassword: ""
    };
  },
  methods: {
    async resetpwd() {
      try {
        await SMS.resetPassword(this.$route.params.otp, {
          password: this.Password
        });
        Notify.showMessage("success", "ປ່ຽນລະຫັດຜ່ານສຳເລັດແລ້ວ", 4000);
        this.$router.push({
          name: "Login"
        });
      } catch (error) {
        Notify.showMessage("warning", "ລະຫັດ OTP ໝົດອາຍຸ", 4000);
      }
    }
  },
  computed: {
    PasswordError() {
      const error = [];
      if (!this.$v.Password.$dirty) return error;
      !this.$v.Password.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ຫຼາຍກວ່າ 6 ຕົວອັກສອນ");
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
