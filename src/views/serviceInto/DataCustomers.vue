<template>
  <div>
    <v-container grid-list-md>
      <v-card outlined class="mx-2 pa-2">
        <h3># ຂໍ້ມູນສ່ວນຕົວ</h3>
        <hr style="border-color:red" class="ma-2" />
        <div class="pa-2 ml-2">
          <ul>
            <li>
              ຊື້ລຸກຄ້າ:
              <strong style="color:blue">{{ customers.cus_fullname }}</strong>
            </li>
            <li>
              ເພດ:
              <strong style="color:blue">{{ customers.cus_gender }}</strong>
            </li>
            <li>
              ເບີໂທ:
              <strong style="color:blue">{{ customers.cus_phone }}</strong>
            </li>
            <li>
              ອີເມວ:
              <strong style="color:blue">{{ customers.email }}</strong>
            </li>
            <li>ລະຫັດຜ່ານ: ***************</li>
            <li>
              ວັນທີ່ລົງທະບຽນ:
              <strong style="color:blue">{{
                new Date(customers.created_at)
              }}</strong>
            </li>
          </ul>
        </div>
        <h3 class="mt-2"># ທີ່ຈັດສົ່ງສິນຄ້າ</h3>
        <hr style="border-color:red" class="ma-2" />
        <div class="pa-2 ml-2">
          <ul>
            <li>
              ແຂວງ:
              <strong style="color:blue">{{ customers.cus_provint }}</strong>
            </li>
            <li>
              ເມືອງ:
              <strong style="color:blue">{{ customers.cus_distric }}</strong>
            </li>
            <li>
              ບ້ານ: <strong style="color:blue">{{ customers.cus_home }}</strong>
            </li>
          </ul>
          <div>
            <div>ລາຍລະອຽດທີ່ຕ້ອງການ</div>
            <v-card outlined height="300px" class="mt-2">
              <div class="fontsize16 blue--text">
                {{ customers.cus_description }}
              </div>
            </v-card>
          </div>
          <div class="ma-2 pa-2">
            <v-btn small tile color="grey darken-4" @click="backhome" dark>ກັບໄປໜ້າຫຼັກ</v-btn>
            <v-btn
              class="ml-1"
              small
              tile
              color="orange"
              dark
              @click="isOpenEdit"
              >ແກ້ໄຂ</v-btn
            >
          </div>
        </div>
      </v-card>
      <customer-manage
        :dialogForm="dialogFormCus"
        :valueCus="ItemCustomer"
        @closeForm="dialogFormCus = !dialogFormCus"
        @editSuccess="viewCustomer($store.state.user)"
      ></customer-manage>
    </v-container>
  </div>
</template>
<script>
import CustomerService from "@/service/CustomerService";
import { mapState } from "vuex";

import Customer from "@/components/Customers";
export default {
  components: {
    "customer-manage": Customer
  },
  data() {
    return {
      dialogFormCus: false,
      customers: [],
      ItemCustomer: null
    };
  },
  methods: {
    async viewCustomer(email) {
      try {
        let cus = await CustomerService.viewCustomer(email);
        this.customers = cus.data.data;
        this.ItemCustomer = cus.data.data;
        // console.log(this.customers);
      } catch (error) {
        this.$router.push({
          name: "Login"
        });
      }
    },
    isOpenEdit() {
      this.dialogFormCus = true;
    },
    backhome(){
      this.$router.push({
        name: "Home"
      })
    }
  },
  computed: {
    ...mapState(["isUserLogin", "user"])
  },
  mounted() {
    if (this.isUserLogin == false) {
      this.$router.push({
        name: "Login"
      });
    } else {
      this.viewCustomer(this.$store.state.user);
    }
  }
};
</script>
<style></style>
