<template>
  <div>
    <v-row justify="center" class="mb-12">
      <v-col>
        <v-card
          class="mx-auto mt-6  font d-none d-md-block"
          max-width="500px"
          outlined
          color="#EFE911"
        >
          <h2 class="text-center ma-3"><u>ລົງທະບຽນສະມາຊີກ</u></h2>
          <v-divider></v-divider>
          <v-card-text dense class="pl-15 pr-15">
            <v-form>
              <v-text-field
                required
                name="firstname"
                v-model="Firstname"
                label="ຊື່ແທ້ ແລະ ນາມສະກຸນ"
                prepend-icon="mdi-account-plus"
                :error-messages="FisrtError"
                @input="$v.Firstname.$touch()"
                @blur="$v.Firstname.$touch()"
              ></v-text-field>
              <v-radio-group v-model="Gender" row>
                <v-radio label="ເພດຍີງ" value="Female"> </v-radio>
                <v-radio label="ເພດຊາຍ" value="Male"> </v-radio>
              </v-radio-group>
              <v-text-field
                required
                name="phone"
                v-model="Phonenumber"
                label="ເບີໂທ"
                prepend-icon="mdi-phone"
                placeholder="856 20 54487799"
                counter="13"
                :error-messages="PhoneError"
                @input="$v.Phonenumber.$touch()"
                @blur="$v.Phonenumber.$touch()"
              ></v-text-field>
              <v-text-field
                required
                name="email"
                v-model="Email"
                label="ີອີເມວ"
                prepend-icon="mdi-email"
                :error-messages="EmailError"
                @input="$v.Email.$touch()"
                @blur="$v.Email.$touch()"
              >
              </v-text-field>
              <v-text-field
                required
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
          </v-card-text>
          <v-card-actions>
            <div class="mx-auto mb-2">
              <v-btn
                elevation="5"
                class="mr-2"
                color="#F57F17"
                tile
                dense
                dark
                @click="closeRegister"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                :loading="loading"
                elevation="5"
                color="#1588E4"
                tile
                dense
                dark
                @click="headleRegister"
                >ລົງທະບຽນ</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>

        <!-- mobile -->
        <v-card flat class="mx-auto mt-6  font d-lg-none" max-width="500px">
          <h2 class="text-center ma-3"><u>ລົງທະບຽນສະມາຊີກ</u></h2>
          <v-divider></v-divider>
          <v-card-text dense class="pl-15 pr-15">
            <v-form>
              <v-text-field
                required
                name="firstname"
                v-model="Firstname"
                label="ຊື່ແທ້ ແລະ ນາມສະກຸນ"
                prepend-icon="mdi-account-plus"
                :error-messages="FisrtError"
                @input="$v.Firstname.$touch()"
                @blur="$v.Firstname.$touch()"
              ></v-text-field>
              <v-radio-group v-model="Gender" row>
                <v-radio label="ເພດຍີງ" value="Female"> </v-radio>
                <v-radio label="ເພດຊາຍ" value="Male"> </v-radio>
              </v-radio-group>
              <v-text-field
                required
                name="phone"
                v-model="Phonenumber"
                label="ເບີໂທ"
                prepend-icon="mdi-phone"
                placeholder="856 20 54487799"
                counter="13"
                :error-messages="PhoneError"
                @input="$v.Phonenumber.$touch()"
                @blur="$v.Phonenumber.$touch()"
              ></v-text-field>
              <v-text-field
                required
                name="email"
                v-model="Email"
                label="ີອີເມວ"
                prepend-icon="mdi-email"
                :error-messages="EmailError"
                @input="$v.Email.$touch()"
                @blur="$v.Email.$touch()"
              >
              </v-text-field>
              <v-text-field
                required
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
          </v-card-text>
          <v-card-actions>
            <div class="mx-auto mb-2">
              <v-btn
                elevation="5"
                class="mr-2"
                color="#F57F17"
                tile
                dense
                dark
                @click="closeRegister"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                :loading="loading"
                elevation="5"
                color="#1588E4"
                tile
                dense
                dark
                @click="headleRegister"
                >ລົງທະບຽນ</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Notify from "@/notify/Notifycation";
import Authentication from "@/service/Authentication";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    Email: { required, email },
    Firstname: { required, minLength: minLength(6), maxLength: maxLength(50) },
    Phonenumber: {
      required,
      minLength: minLength(13),
      maxLength: maxLength(13)
    },
    Password: { required, minLength: minLength(6) },
    RepeatPassword: { required, sameAsPassword: sameAs("Password") }
  },
  data() {
    return {
      showpassword: false,
      showRepeatpassword: false,
      Password: "",
      RepeatPassword: "",
      Firstname: "",
      Phonenumber: "",
      Email: "",
      Gender: "",
      loading: false
    };
  },
  methods: {
    closeRegister() {
      this.Email = "";
      this.Firstname = "";
      this.Phonenumber = "";
      this.$router.push({
        name: "Home"
      });
    },
    async headleRegister() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("warning", "ປ້ອນຂໍ້ມູນກ່ອນ", 4000);
      } else {
        try {
          let data = {
            cus_gender: this.Gender,
            cus_fullname: this.Firstname,
            cus_phone: this.Phonenumber,
            email: this.Email,
            password: this.Password,
            cus_state: "on"
          };
          this.loading = true;
          await Authentication.Register(data);
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.loading = false;
          Notify.showMessage("success", "ບັນທືກຂໍ້ມູນລຸກຄ້າສຳເລັດແລ້ວ", 2000);

          this.$router.push({
            name: "Login"
          });
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດ ບັນທືກຂໍ້ມູນລຸກຄ້າ", 4000);
        }
      }
    }
  },
  computed: {
    EmailError() {
      const error = [];
      if (!this.$v.Email.$dirty) return error;
      !this.$v.Email.email && error.push("ຮຸບແບບອີເມວບໍ່ຖືກຕ້ອງ");
      !this.$v.Email.required && error.push("ປ້ອນຂໍ້ມູນ email ກ່ອນ");

      return error;
    },
    FisrtError() {
      const error = [];
      if (!this.$v.Firstname.$dirty) return error;
      !this.$v.Firstname.minLength &&
        error.push("ອັກສອນຕ້ອງຫຼາຍກວ່າ 6 ຕົວຂື້ນໄປ");
      !this.$v.Firstname.maxLength &&
        error.push("ອັກສອນຕ້ອງນ້ອຍກວ່າ 50 ຕົວລົງມາ");
      !this.$v.Firstname.required && error.push("ປ້ອນຂໍ້ມູນກ່ອນ");

      return error;
    },
    PhoneError() {
      const error = [];
      if (!this.$v.Phonenumber.$dirty) return error;
      !this.$v.Phonenumber.minLength && error.push("ນ້ອຍສຸດຕ້ອງມີ 13 ຈຳນວນ");
      !this.$v.Phonenumber.maxLength && error.push("ຫຼາຍສຸດຕ້ອງມີ 13 ຈຳນວນ");

      !this.$v.Phonenumber.required && error.push("ປ້ອນຂໍ້ມູນກ່ອນ");
      return error;
    },
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
