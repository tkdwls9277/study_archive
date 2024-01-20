<template>
  <v-container>
    <v-switch
      :id="userId"
      @change="onChange"
      v-model="isChecked"
      :label="label"
      :disabled="disabled"
      :style="userStyle"
    >
    </v-switch>
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
    userId: {
      type: String,
      default: "switch",
    },
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  // created() {},
  methods: {
    onChange(val: string) {
      this.$emit("switch_change", val);
    },
  },
});
</script>
