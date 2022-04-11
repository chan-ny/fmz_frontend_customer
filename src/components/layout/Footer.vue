<template>
  <div>
    <v-footer color="#444444" class="white--text mt-2">
      <div class="container">
        <v-row>
          <v-col cols="12" md="2" sm="2"></v-col>
          <v-col cols="12" md="3" sm="3">
            <div class="fontsize20"><u>ກ່ຽວກັບເຮົາ</u></div>
            <v-list-item>
              <v-list-item-content class="fontsize16">
                <div>
                  <v-icon color="white">mdi-cash</v-icon
                  ><a class="white--text"> ແຈັງໂອນເງິນສິນຄ້າ</a>
                </div>
                <div>
                  <v-icon color="white">mdi-clipboard-check</v-icon
                  ><a class="white--text"> ກວດສອບສິນຄ້າທີ່ສັ່ງຊື້</a>
                </div>
                <div>
                  <v-icon color="white">mdi-account-multiple-plus</v-icon
                  ><a class="white--text"> ຮັບສະມັກໂຕແທນຈຳນາຍ</a>
                </div>
                <div>
                  <v-icon color="white">mdi-comment-alert-outline</v-icon
                  ><a class="white--text"> ກຽ່ວກັບເຮົາ</a>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" md="3" sm="3">
            <div class="fontsize20"><u>ສອບຖາມຂໍ້ມູນເພີ່ມຕື່ມ</u></div>
            <v-list-item>
              <v-list-item-content class="fontsize16">
                <div>
                  <v-icon color="white">mdi-message-alert</v-icon
                  ><a class="white--text"> ສອບຖາມຂໍ້ມູນຕີດຕໍ່ທີ</a>
                </div>
                <div>
                  <v-icon color="white">mdi-whatsapp</v-icon
                  ><a class="white--text"> WhatsApp:@monolao</a>
                </div>
                <div>
                  <v-icon color="white">mdi-wechat</v-icon
                  ><a class="white--text"> LineID:@monolao</a>
                </div>
                <div class="ml-9">
                  <v-icon color="white" x-large>mdi-qrcode-scan</v-icon>
                  <v-icon color="white" class="ml-2" x-large
                    >mdi-qrcode-scan</v-icon
                  >
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" md="3" sm="3">
            <div class="fontsize20"><u>ຕີດຕໍ່ທາງເຮົາ</u></div>
            <v-list-item v-for="(item, index) in store.data" :key="index" >
              <v-list-item-content class="fontsize16">
                <div>
                  <v-icon color="white">mdi-laptop-windows</v-icon
                  ><a class="white--text"> {{ item.store_website }}</a>
                </div>
                <div>
                  <v-icon color="white"> mdi-crosshairs-gps</v-icon
                  ><a class="white--text"> {{ item.store_address }}</a>
                </div>
                <div class="mt-1">
                  <v-icon color="white">mdi-phone-in-talk</v-icon
                  ><a class="white--text"> ເບີໂທ: {{ item.store_phone }}</a>
                </div>
                <div>
                  <v-icon color="white">mdi-email</v-icon
                  ><a class="white--text"> ອີເມວ: {{ item.store_email }}</a>
                </div>
                <div>
                  <v-icon color="white">mdi-facebook</v-icon><a class="white--text"> fb.monlao</a>
                </div>
                <div>
                  <v-icon color="white">mdi-instagram</v-icon><a class="white--text"> ig.monlao</a>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" md="2" sm="2"></v-col>
        </v-row>
      </div>
    </v-footer>
  </div>
</template>
<script>
import StoreService from "@/service/StoreService";
export default {
  data() {
    return {
      store: []
    };
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
  }
};
</script>
<style scoped>
a {
  text-decoration: none !important;
}
</style>
