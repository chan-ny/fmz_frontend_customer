<template>
  <div class="container">
    <v-breadcrumbs :items="items" class="breadcrumbs mt-15 mb-n12 d-none d-sm-flex" divider="/">
      <template slot="item" slot-scope="props">
        <router-link :to="{ name: props.item.href }" class="link font">{{
          props.item.name
        }}</router-link>
      </template>
    </v-breadcrumbs>
    <v-breadcrumbs :items="items" class="breadcrumbs mt-10 mb-n12 d-flex d-sm-none" divider="/">
      <template slot="item" slot-scope="props">
        <router-link :to="{ name: props.item.href }" class="link font">{{
          props.item.name
        }}</router-link>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },

  watch: {
    $route() {
      const vm = this;

      vm.updateBreadcrumbs();
    }
  },

  mounted() {
    const vm = this;

    vm.updateBreadcrumbs();
  },

  methods: {
    updateBreadcrumbs() {
      const vm = this;

      vm.items = vm.$route.meta.breadcrumb;
    }
  }
};
</script>

<style>
.breadcrumbs .link {
  text-decoration: none;
  color: #737373;
  font: 18px Sans-Serif;
  letter-spacing: -1px;
  white-space: nowrap;
  display: inline-block;
  position: relative;
}
</style>
