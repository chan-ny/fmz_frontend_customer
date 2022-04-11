<template>
  <div>
    <v-row>
      <v-col cols="12" sm="1" md="1"></v-col>
      <v-col cols="12" sm="10" md="10">
        <v-card outlined class="mb-12">
          <div class="mx-auto">
            <div class="fontsize18 ma-3">
              <b># ສົ່ງສະເພາະພາຍໃນປະເທດເທົ່ານັ້ນ</b>
            </div>
            <v-divider color="red lighten-1 "></v-divider>

            <div class="mt-4 mx-4 fontsize14">
              <v-text-field
                v-model="Fullname"
                color="green"
                dense
                label="ຜູ້ຮັບສິນຄ້າ"
                name="firstname"
                placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                :error-messages="FulllnameError"
                @nput="$v.Fullname.$touch()"
                @blur="$v.Fullname.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="Phone"
                dense
                name="Tell"
                label="ເບີໂທລະສັບ"
                placeholder="ຕ້ອງເປັນເບີທີ່ໂທໄດ້ເທົ່ານັ້ນ ..."
                :error-messages="PhoneError"
                @nput="$v.Phone.$touch()"
                @blur="$v.Phone.$touch()"
              ></v-text-field>
              <v-text-field
                dense
                label="ແຂວງ ..."
                v-model="Province"
                :error-messages="ProvinceError"
                @change="$v.Province.$touch()"
                @blur="$v.Province.$touch()"
              >
              </v-text-field>
              <v-text-field
                v-model="District"
                dense
                name="district"
                label="ເມືອງ"
                :error-messages="DistrictError"
                @nput="$v.District.$touch()"
                @blur="$v.District.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="Home"
                dense
                name="houe"
                label="ບ້ານ"
                :error-messages="HomeError"
                @nput="$v.Home.$touch()"
                @blur="$v.Home.$touch()"
              ></v-text-field>
              <v-textarea
                v-model="Description"
                dense
                outlined
                label="ລາຍລະອຽດທີ່ຕ້ອງການ:"
                :error-messages="DescriptionError"
                @nput="$v.Description.$touch()"
                @blur="$v.Description.$touch()"
              >
              </v-textarea>
            </div>
          </div>
        </v-card>
        <div class="d-flex flex-row-reverse">
          <v-btn
             :loading="stateLoading"
            :disabled="!checkBTN"
            color="primary"
            class="fontsize16"
            @click="completeAddress"
          >
            ດຳເນີນການຕໍ່
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="1" md="1"></v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CustomerService from "@/service/CustomerService";
import Notify from "@/notify/Notifycation";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    Fullname: { required },
    Phone: { required, minLength: minLength(8) },
    Province: { required },
    District: { required },
    Home: { required },
    Description: { required, minLength: minLength(30) }
  },
  data() {
    return {
      checkBTN: false,
      dataCustomer: [],
      cusId: "",
      Fullname: "",
      Phone: "",
      Province: "",
      District: "",
      Home: "",
      Description: "",
      stateLoading: false,
    };
  },
  methods: {
    async completeAddress() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("error", "ກະລຸນປ້ອນຂໍ້ມູນໃຫ້ຄົບກ່ອນ", 3000);
      } else {
        let value = {
          cusId: this.cusId,
          cus_fullname: this.Fullname,
          cus_phone: this.Phone,
          cus_provint: this.Province,
          cus_distric: this.District,
          cus_home: this.Home,
          cus_description: this.Description
        };
        try {
          this.stateLoading = true;
          let update = await CustomerService.editCustomer(value);
          this.$store.dispatch("headerStepoer", 2);
          this.$store.commit("setCustomerID", value.cusId);
          Notify.showMessage("success", update.data.message, 3000);
          this.stateLoading = false;
        } catch (error) {
          console.log("can't update customer");
        }
      }
    },
    CheckCustomer() {
      if (this.dataCustomer == null) {
        this.checkBTN = false;
      } else {
        this.checkBTN = true;
      }
    },
    async SeriesCustomer() {
      try {
        let customer = await CustomerService.viewCustomer(this.user);
        this.dataCustomer = customer.data.data;
        this.CheckCustomer();
        // console.log(this.dataCustomer);
      } catch (error) {
        this.$store.dispatch("setToken", "");
        this.$store.dispatch("setUser", "");
        this.$router.push({
          name: "Login"
        });
        console.log("error form transaction_address ");
      }
    }
  },
  computed: {
    ...mapState(["user"]),

    FulllnameError() {
      const error = [];
      if (!this.$v.Fullname.$dirty) return error;
      !this.$v.Fullname.required && error.push("ປ້ອນຂໍ້ມູນ ຊື່ກ່ອນ");
      return error;
    },
    PhoneError() {
      const error = [];
      if (!this.$v.Phone.$dirty) return error;
      !this.$v.Phone.required && error.push("ປ້ອນຂໍ້ມູນ ເບິໂທກ່ອນ");
      return error;
    },
    ProvinceError() {
      const error = [];
      if (!this.$v.Province.$dirty) return error;
      !this.$v.Province.required && error.push("ປ້ອນຂໍ້ມູນ ແຂວງກ່ອນ");
      return error;
    },
    DistrictError() {
      const error = [];
      if (!this.$v.District.$dirty) return error;
      !this.$v.District.required && error.push("ປ້ອນຂໍ້ມູນ ເມືອງກ່ອນ");
      return error;
    },
    HomeError() {
      const error = [];
      if (!this.$v.Home.$dirty) return error;
      !this.$v.Home.required && error.push("ປ້ອນຂໍ້ມູນ ບ້ານກ່ອນ");
      return error;
    },
    DescriptionError() {
      const error = [];
      if (!this.$v.Description.$dirty) return error;
      !this.$v.Description.minLength &&
        error.push("ຂໍ້ມູນຕົວອັກສອນ ຕ້ອງຫຼາຍ 30 ຕົວ");
      !this.$v.Description.required &&
        error.push("ປ້ອນຂໍ້ມູນ ລາຍະອຽດເພີ່ມເຕີບກ່ອນ");
      return error;
    }
  },
  async mounted() {
    if (this.user.length != null) {
      await this.SeriesCustomer();
      this.cusId = this.dataCustomer.cusId;
      this.Fullname = this.dataCustomer.cus_fullname;
      this.Phone = this.dataCustomer.cus_phone;
      this.Province = this.dataCustomer.cus_provint;
      this.District = this.dataCustomer.cus_distric;
      this.Home = this.dataCustomer.cus_home;
      this.Description = this.dataCustomer.cus_description;
    }
  }
};
</script>
<style scoped>
label {
  font-size: 12px !important;
}
</style>
