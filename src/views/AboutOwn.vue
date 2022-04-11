<template>
  <div class="container">
    <v-row>
      <v-col class="ml-5 mt-n5">
        <div class="fontsize20"><u>ຂໍ້ມູນກ່ຽວກັບ</u></div>
        <v-list-item v-for="(item,index) in store.data" :key="index">
          <v-list-item-content class="fontsize16">
            <div>
              <v-icon color="black">mdi-laptop-windows</v-icon
              ><a> {{item.store_website}}</a>
            </div>
            <div>
              <v-icon color="black"> mdi-crosshairs-gps</v-icon
              ><a> {{item.store_address}}</a>
            </div>
            <div class="mt-1">
              <v-icon color="black">mdi-phone-in-talk</v-icon
              ><a> ເບີໂທ: {{item.store_phone}}</a>
            </div>
            <div>
              <v-icon color="black">mdi-email</v-icon
              ><a> ອີເມວ: {{item.store_email}}</a>
            </div>
            <div>
              <v-icon color="black">mdi-facebook</v-icon><a> fb.monlao</a>
            </div>
            <div>
              <v-icon color="black">mdi-instagram</v-icon
              ><a> ig.monlao</a>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import StoreService from '@/service/StoreService'
export default {
 data() {
   return {
     store: []
   }
 },
 methods: {
    async SelectStore() {
      try {
        let store = (await StoreService.selectStore()).data;
        this.store = store;
        // console.log(this.store);
      } catch (error) {
        console.log("store not found");
      }
    }
 },
 created() {
   this.SelectStore();
 },
};
</script>
<style></style>
