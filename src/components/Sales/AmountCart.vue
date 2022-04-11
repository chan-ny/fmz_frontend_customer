<template>
  <div>
    <v-card>
      <v-toolbar dense color="primary" dark>
        <v-toolbar-title class="fontsize18">ສະຫຼູບສິນຄ້າ</v-toolbar-title>
      </v-toolbar>
      <div>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th>ຊື່</th>
                <th>ໄຊຣ</th>
                <th>qty</th>
                <th>ລາຄາ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataCart" :key="index">
                <td>{{ item.pdname }}</td>
                <td>{{ item.sname }}</td>
                <td>{{ item.srqty }}</td>
                <td>{{ new Intl.NumberFormat().format(item.pdprice) }} ກີບ</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider class="mt-n1"></v-divider>
        <div class="ma-4">
          <div class="fontsize14">ລາຍການ: {{ dataCart.length }}</div>
          <div class="fontsize14">ຈຳນວນ: {{ CountNumber }}</div>
          <h2 class="pb-4">
            ລວມ:
            <span style="color: blue"
              >{{ new Intl.NumberFormat().format(Total) }} ກີບ</span
            >
          </h2>
        </div>
      </div>
    </v-card>
    <v-card>
      <div class="ma-2 pa-4">
        <div>ຈັດສົ່ງສິນຄ້າພາຍໃນ: <strong>3-7</strong> ມື້</div>
        <div>ຖ້າສິນຄ້າກາຍວັນທີ່ກຳນົດຈະບໍ່ຮັບຜີດຊອບ</div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dataCart: []
    };
  },
  methods: {},
  computed: {
    ...mapState(["addCart"]),
    Total() {
      let total = 0;
      this.dataCart.forEach(item => {
        total += item.pdprice * item.srqty;
      });
      return total;
    },
    CountNumber() {
      var num = this.dataCart.reduce(
        (acc, item) => acc + Number(item.srqty),
        0
      );
      return num;
    }
  },
  mounted() {
    if (this.addCart.length > 0) {
      this.dataCart = this.addCart;
    } else {
      this.dataCart = [];
    }
  }
};
</script>
<style></style>
