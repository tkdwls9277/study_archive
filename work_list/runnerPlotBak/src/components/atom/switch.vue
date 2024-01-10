<template>
  <v-container>
    <v-switch @change="onChange" v-model="isChecked" :label="label" :disabled="disabled" :style="userStyle"> </v-switch>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "switchButton",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    label: {
      type: String,
      default: "Switch",
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    userStyle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  methods: {
    onChange(val: string) {
      console.log("여기 확인");
      this.$emit("switch_change", val);
    },
  },
});
</script>
