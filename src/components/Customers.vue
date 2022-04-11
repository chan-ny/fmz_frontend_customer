<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialogForm" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="fontsize24">ແກ້ໄຂ ຂໍ້ມູນລຸກຄ້າ</span>
          </v-card-title>
          <v-divider class="mt-1"></v-divider>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="Fullname"
                    dense
                    outlined
                    label="ຊື້ ແລະ ນາມສະກູນ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    dense
                    outlined
                    label="ເບີໂທ"
                    v-model="Tell"
                  ></v-text-field>
                </v-col>
                <v-radio-group v-model="Genders" class="mt-n8 mb-2 ml-3">
                  <v-radio label="Male" value="Male"></v-radio>
                  <v-radio label="Female" value="Female"></v-radio>
                </v-radio-group>
                <v-col cols="12" class="mt-n8">
                  <v-text-field
                    disabled
                    v-model="Email"
                    dense
                    outlined
                    label="@ອີເມວ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="mt-n8">
                  <v-select
                    v-model="Provinces"
                    dense
                    outlined
                    :items="province"
                    label="ແຂວງ"
                    required
                  ></v-select>
                  <v-text-field
                    dense
                    outlined
                    label="ບ້ານ"
                    v-model="Home"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    dense
                    outlined
                    label="ເມືອງ"
                    v-model="District"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="mt-n8">
                  <v-textarea
                    v-model="Description"
                    dense
                    outlined
                    label="ລາຍລະອຽດອື່ນ..."
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeForm">
              ຍົກເລີກ
            </v-btn>
            <v-btn color="blue darken-1" text @click="headerEdit">
              ແກ້ໄຂ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import Notify from "@/notify/Notifycation";
import CustomerService from "@/service/CustomerService";
export default {
  props: {
    dialogForm: Boolean,
    valueCus: Object
  },
  data() {
    return {
      province: ["ຈຳປາສັກ", "ນະຄອນຫຼວງວຽງຈັນ", "ສະຫວັນນະເຂດ"],
      cusId: "",
      Fullname: "",
      Tell: "",
      Email: "",
      Provinces: "",
      District: "",
      Home: "",
      Genders: "",
      Description: ""
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },
    async headerEdit() {
      let cus = {
        cusId: this.cusId,
        cus_gender: this.Genders,
        cus_fullname: this.Fullname,
        cus_phone: this.Tell,
        cus_provint: this.Provinces,
        cus_distric: this.District,
        cus_home: this.Home,
        cus_description: this.Description
      };
      try {
        let edit = await CustomerService.editCustomer(cus);
        Notify.showMessage("success", edit.data.message, 2000);
        this.$emit("closeForm");
        this.$emit("editSuccess");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດແກ້ໄຂ", 2000);
      }
    }
  },
  watch: {
    valueCus() {
      if (this.valueCus != null) {
        this.cusId = this.valueCus.cusId;
        this.Fullname = this.valueCus.cus_fullname;
        this.Tell = this.valueCus.cus_phone;
        this.Email = this.valueCus.email;
        this.Genders = this.valueCus.cus_gender;
        this.Provinces = this.valueCus.cus_provint;
        this.District = this.valueCus.cus_distric;
        this.Home = this.valueCus.cus_home;
        this.Description = this.valueCus.cus_description;
      }
    }
  }
};
</script>
<style></style>
