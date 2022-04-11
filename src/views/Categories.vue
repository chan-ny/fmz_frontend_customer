<template >
  <div>
     <div v-if="selectItem == 0">
        <categories-product @selectItem="getSelectItem"></categories-product>
     </div>
     <div v-else>
      <selectitem-product @closeCategories="getSelectItem"></selectitem-product>
     </div>
  </div>
</template>
<script>
import CategoryProduct from "../components/Product/CategoryProduct";
import SelectItemProduct from '../components/Product/SelectSubproduct'
export default {
  components: {
    "categories-product": CategoryProduct,
    "selectitem-product": SelectItemProduct
  },
  data() {
    return {
      selectItem: 0,
    }
  },
  methods: {
    getSelectItem(item){
      this.selectItem = item
    }
  },

  // watch: {
  //    selectItem(){
  //      if(this.selectItem !=0){
  //        this
  //      }
  //    }
  // },

};
</script>
<style lang=""></style>
