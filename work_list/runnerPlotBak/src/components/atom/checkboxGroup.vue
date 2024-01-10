<template>
  <v-container fluid>
    <v-checkbox v-for="item in items" :key="item['id']" v-model="item['enabled']" :label="item['label']"> ></v-checkbox>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CheckboxGroup",
  props: {
    items: {
      type: Array as () => CheckboxItem[],
      required: true,
    },
  },
  methods: {
    onChange(val: string) {
      this.$emit("change", val);
    },
  },
});

interface CheckboxItem {
  label: string;
  value: string | number | boolean;
}
</script>
