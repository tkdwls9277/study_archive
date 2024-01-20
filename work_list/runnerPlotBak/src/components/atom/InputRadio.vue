<template>
  <v-radio-group :value="value" @change="onChange" v-bind="$attrs">
    <v-radio v-for="(item, i) in items" :key="i" v-bind="item" />
  </v-radio-group>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "InputRadio",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: [String, Number, Object],
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChange(val: string) {
      this.$emit("change", val);
    },
  },
});
</script>
