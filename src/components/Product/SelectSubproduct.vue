<template>
  <div>
    <v-container grid-list-md>
      <v-card class="ma-2">
        <a class="ma-3" @click="headleBack"
          ><v-icon>mdi-arrow-left-bold-circle</v-icon><u> ກັບຄືໜ້າເກົ່າ</u></a
        >
        <br /><br />
        <v-row class="auto">
          <v-col cols="12" sm="4" md="4">
            <v-row justify="space-around">
              <v-col>
                <v-card class=" pa-1">
                  <div class="ma-2">
                    <v-carousel
                      cycle
                      height="auto"
                      hide-delimiter-background
                      show-arrows-on-hover
                    >
                      <v-carousel-item v-for="(slide, i) in slides" :key="i">
                        <v-img max-width="auto" :src="slide"> </v-img>
                      </v-carousel-item>
                    </v-carousel>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-sheet color="blue lighten-5" class="back--text">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="fontsize30">Sweater Shirt</div>
                      <div class="fontsize16">SW001</div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2 ml-3 mr-3" color="red"></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="fontsize18"
                      ><b>ໄຊຣ ຫຼື ຂະໜາດຂອງສິນຄ້າ</b></v-list-item-title
                    >
                    <v-list-item-subtitle class="mt-2">
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <strong><u>ໄຊຣ</u></strong>
                          <div class="fontsize18 mt-3">
                            <strong>S: detail all </strong>
                          </div>
                          <div class="fontsize18 mt-3">
                            <strong>M: detail all </strong>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <strong><u>ລາຄາ</u></strong>
                          <div class="fontsize18 mt-3">
                            <strong>80,000₭</strong>
                          </div>
                          <div class="fontsize18 mt-3">
                            <strong>90,000₭</strong>
                          </div>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="ma-3">
                  <div class="mt-4 fontsize20">ເລືອກ</div>
                  <v-divider class="mt-2" color="red"></v-divider>
                </div>
                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col>
                        <v-list-item-action>
                          <div class="d-flex">
                            <v-btn
                              color="#707070"
                              class="white--text fontsize30 mr-2"
                              >S</v-btn
                            >
                            <v-btn
                              color="#092FEC"
                              class="white--text fontsize30"
                              >S</v-btn
                            >
                          </div>
                        </v-list-item-action>
                      </v-col>
                    </v-row>
                    <v-btn
                      color="#F11212"
                      width="300"
                      class="mx-auto white--text fontsize18"
                      tile
                      @click="headleAddProduct"
                      >ສັ່ງຊື້ສິນຄ້າ</v-btn
                    >
                    <v-list-item-subtitle>
                      ok
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div class="ma-3">
                  <div class="mt-4 fontsize20">ສອບຖາມຂໍ້ມູນ</div>
                  <v-divider class="mt-2" color="red"></v-divider>
                  <div class="d-flex">
                    <v-img
                      max-width="40"
                      src="@/assets/clothing/icon/facebook_60px.jpg"
                    ></v-img>
                    <v-img
                      max-width="40"
                      src="@/assets/clothing/icon/whatsapp_60px.jpg"
                    ></v-img>
                    <v-img
                      max-width="40"
                      src="@/assets/clothing/icon/line.jpg"
                    ></v-img>
                  </div>
                </div>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slides: [
        "https://i2.wp.com/www.nevernotclimbing.com/wsf/wp-content/uploads/2020/01/mockup-of-a-happy-bald-man-wearing-a-t-shirt-on-the-street-a18228.png?resize=300%2C400&ssl=1",
        "https://i2.wp.com/www.nevernotclimbing.com/wsf/wp-content/uploads/2020/01/mockup-of-a-happy-bald-man-wearing-a-t-shirt-on-the-street-a18228.png?resize=300%2C400&ssl=1",
        "https://i2.wp.com/www.nevernotclimbing.com/wsf/wp-content/uploads/2020/01/mockup-of-a-happy-bald-man-wearing-a-t-shirt-on-the-street-a18228.png?resize=300%2C400&ssl=1"
      ]
    };
  },
  methods: {
    headleBack() {
      this.$emit("closeCategories", 0);
    },
    headleAddProduct() {
      this.$router.push({
        name: "AddProduct"
      });
    }
  }
};
</script>
<style></style>
