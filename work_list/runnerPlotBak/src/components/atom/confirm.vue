<template>
  <v-card class="mx-auto" elevation="1" max-width="500">
    <v-card-title class="py-5 font-weight-black">{{ confirmTitle }}</v-card-title>

    <v-card-text>
      {{ confirmContents }}
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">confirmCondition</div>

      <v-text-field label="Enter value here" single-line variant="outlined"></v-text-field>

      <v-btn
        :disabled="loading"
        :loading="loading"
        block
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
        @click="loading = !loading"
      >
        Verify and continue
      </v-btn>

      <v-btn block class="text-none" color="grey-lighten-3" size="x-large" variant="flat"> Cancel </v-btn>
    </v-card-text>
  </v-card>
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
    confirmTitle: {
      type: String,
      default: "confirmTitle",
    },
    confirmContents: {
      type: String,
      default: "confirmContents",
    },
    confirmCondition: {
      type: String,
      default: "confirmCondition",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(val: string) {
      this.$emit("change", val);
    },
  },
});

export interface inputRadioItems {
  label: number; // 라벨
  value: number; // 값
}
</script>
