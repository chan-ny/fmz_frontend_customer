<template>
  <div>
    <div class="card mt-n11">
      <img src="@/assets/blacgruop.jpg"  />
      <div class="card-img-overlay control">
        <h1 class="card-title font deep-orange--text fontsize30 ">
          ຍີນດີຕອນຮັບທ່ານ
        </h1>
        <p class="card-text pink--text fontsize20 d-none d-sm-flex">
          ຕອນນີ້ ທ່ານສາມາດສັ່ງຊື່ເຄື່ອງນຳພວກເຮົາໄດ້ແລ້ວ
          ພຽງແຕ່ທ່ານສະມັກສະມາຊີກເຂົ້າມາ
        </p>
      </div>
    </div>
    <div class="container">
      <hello-world />
    </div>
  </div>
</template>
<script>
import HelloWorld from "../components/Dasboard";
export default {
  data() {
    return {
      colors: ["indigo", "warning", "pink darken-2"],
      slides: ["First", "Second", "Third"]
    };
  },

  components: {
    HelloWorld
  }
};
</script>
<style scoped>
.font {
  font-size: 60px !important;
}
.control {
  margin-top: 11rem !important;
  margin-left: 6rem !important;
}
.card-img-top {
  background-color: rgba(0, 128, 0, 0.1) !important;
}
@media screen and (max-width: 600px) {
  .control {
    margin-top: 1rem !important;
    margin-left: 1rem !important;
  }
  .font {
    font-size: 20px !important;
  }
}
</style>
