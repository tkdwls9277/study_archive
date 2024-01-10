<template lang="html">
  <v-fab-transition>
    <v-btn bottom right fixed fab dark small v-show="btnShow" @click="$vuetify.goTo('header')"
      ><v-icon>mdi-chevron-double-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
/**
 * scrollTop.vue
 * @description scrollTop button module
 * @namespace Vue
 */
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      btnShow: false,
    };
  },

  methods: {
    handleScrll() {
      this.btnShow = window.scrollY > 400;
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScrll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrll);
  },
});
</script>
<style lang="scss"></style>
