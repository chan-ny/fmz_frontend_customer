<template>
  <div>
    <v-row justify="center" class="mb-12">
      <v-col>
        <v-card
          class="mx-auto mt-6 font d-none d-none d-md-block"
          color="#EFE911"
          max-width="400px"
          outlined
        >
          <v-img class="mx-auto" max-width="70" src="@/assets/mono.png"></v-img>
          <h2 class="text-center">ເຂົ້າລະບົບສຳລັບລຸກຄ້າ</h2>
          <v-card-text class="pl-10 pr-15">
            <v-form>
              <v-text-field
                v-model="Email"
                name="email"
                label="ອີເມວ"
                prepend-icon="mdi-account-circle"
                :error-messages="EmailError"
                @input="$v.Email.$touch()"
                @blur="$v.Email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="Password"
                :type="showpassword ? 'text' : 'password'"
                name="password"
                label="ລະຫັດຜ່ານ"
                prepend-icon="mdi-lock"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpassword = !showpassword"
                :error-messages="PasswordError"
                @input="$v.Password.$touch()"
                @blur="$v.Password.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="mx-auto">
              <v-btn
                elevation="5"
                class="mr-2"
                color="#F57F17"
                tile
                dense
                dark
                @click="closeLogin"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                :loading="stateLoding"
                elevation="5"
                color="#1588E4"
                tile
                dense
                dark
                @click="headleLogin"
                >ຕົກລົງ</v-btn
              >
            </div>
          </v-card-actions>
          <div class="ml-3">
            <router-link to="/register">ລົງທະບຽນ</router-link>
          </div>
          <div class="ml-3">
            <router-link to="/format">ລືມລະຫັດຜ່ານ</router-link>
          </div>
        </v-card>

        <!-- mobile -->
        <v-card
          flat
          class="mx-auto mt-6 font d-md-none"
          color=""
          max-width="400px"
        >
          <v-img class="mx-auto" max-width="70" src="@/assets/mono.png"></v-img>
          <h2 class="text-center">ເຂົ້າລະບົບສຳລັບລຸກຄ້າ</h2>
          <v-card-text class="pl-10 pr-15">
            <v-form>
              <v-text-field
                v-model="Email"
                name="email"
                label="ອີເມວ"
                prepend-icon="mdi-account-circle"
                :error-messages="EmailError"
                @input="$v.Email.$touch()"
                @blur="$v.Email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="Password"
                :type="showpassword ? 'text' : 'password'"
                name="password"
                label="ລະຫັດຜ່ານ"
                prepend-icon="mdi-lock"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpassword = !showpassword"
                :error-messages="PasswordError"
                @input="$v.Password.$touch()"
                @blur="$v.Password.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="mx-auto">
              <v-btn
                elevation="5"
                class="mr-2"
                color="#F57F17"
                tile
                dense
                dark
                @click="closeLogin"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                :loading="stateLoding"
                elevation="5"
                color="#1588E4"
                tile
                dense
                dark
                @click="headleLogin"
                >ຕົກລົງ</v-btn
              >
            </div>
          </v-card-actions>
          <div class="ml-3">
            <router-link to="/register">ລົງທະບຽນ</router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import LoginService from "@/service/Authentication";
import CustomerService from "@/service/CustomerService";
import Notify from "@/notify/Notifycation";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    Email: { required, email },
    Password: { required, minLength: minLength(6), maxLength: maxLength(8) }
  },
  data() {
    return {
      showpassword: false,
      Email: "",
      Password: "",
      stateLoding: false
    };
  },
  methods: {
    closeLogin() {
      this.Email = "";
      this.Password = "";
      this.$router.push({
        name: "Home"
      });
      window.close();
    },

    async headleLogin() {
      let login = {
        email: this.Email,
        password: this.Password
      };

      try {
        this.stateLoding = true;
        let log = await LoginService.Login(login);
        this.$store.dispatch("setToken", log.data.token);
        this.$store.dispatch("setUser", log.data.user.email);

        this.viewCustomer(log.data.user.email);
        this.stateLoding = false;

        this.$router.push({
          name: "Home"
        });
      } catch (error) {
        Notify.showMessage(
          "error",
          "ກະລຸນາປ້ອນ 'ອີເມວ ແລະ ລະຫັດຜ່ານ' ອີກຄັ້ງ !!!",
          4000
        );
        this.Email = "";
        this.Password = "";
      }
    },
    async viewCustomer(email) {
      try {
        let cus = await CustomerService.viewCustomer(email);
        this.customers = cus.data.data;
        this.ItemCustomer = cus.data.data;
        this.$store.commit("setCustomerID", this.customers.cusId);
        // console.log(this.customers.cusId);
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    document.addEventListener("beforeunload", this.headleLogin);
  },
  computed: {
    EmailError() {
      const error = [];
      if (!this.$v.Email.$dirty) return error;
      !this.$v.Email.email &&
        error.push("ອີເມວບໍຖືກຕ້ອງ ຄວນເປັນແບບນີ້ email@gmail.com");
      !this.$v.Email.required && error.push("ປ້ອນອີເມວກ່ອນ");
      return error;
    },
    PasswordError() {
      const error = [];
      if (!this.$v.Password.$dirty) return error;
      !this.$v.Password.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ຫຼສບກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.Password.required && error.push("ປ້ອນລະຫັດຜ່ານກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
