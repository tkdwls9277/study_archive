<template>
  <div class="container">
    <!-- search form -->
    <form v-on:submit.prevent="onSubmitForm" class="search-form">
      <v-text-field
        v-model="form.id"
        class="mr-4"
        style="max-width: 50vw; margin-left: 8vw"
        clearable
        placeholder="검색어를 입력해주세요."
        prepend-inner-icon="mdi-magnify"
        @click:prepend-inner="onSubmitForm"
      />

      <!-- detail button -->
      <v-btn @click="detail()" large dark style="margin-top: 0px">상세 <i class="mdi mdi-chevron-down"></i></v-btn>

      <!-- admin mode -->
      <switch-button
        v-if="type == 'project'"
        :label="'관리자 모드'"
        :userId="'adminMode'"
        :userStyle="'margin-top: 0px;'"
        style="width: fit-content"
        @switch_change="handleSwitchChange"
      ></switch-button>
    </form>

    <!-- detail search form-->
    <transition name="fade" mode="out-in" ref="containerRef">
      <form class="detail-form" v-on:submit.prevent="onSubmitForm" v-if="showDetail">
        <!-- line coverage -->
        <div class="detail-form-row">
          <v-col cols="2"><v-list-subheader>line cov</v-list-subheader></v-col>

          <v-col cols="4">
            <!-- 라인커버리지 드롭다운 -->
            <v-select
              class="mr-4"
              :items="CovItem"
              item-text="name"
              item-value="value"
              v-model="form.lineCov"
              label="라인커버리지"
              multiple
              chips
              clearable
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>

          <v-col cols="5">
            <!-- 커버리지 증감 값 입력란 -->
            <v-text-field
              class="mr-4"
              type="number"
              step="0.01"
              v-model="form.lineCompareNum"
              style="width: 300px"
              placeholder="라인 커버리지 증감 값"
            >
              <template v-slot:append>%</template>
            </v-text-field>
          </v-col>
        </div>

        <!-- branch coverage -->
        <div class="detail-form-row">
          <v-col cols="2"><v-list-subheader>branch cov</v-list-subheader></v-col>

          <v-col cols="4">
            <!-- 브랜치커버리지 드롭다운 -->
            <v-select
              class="mr-4"
              :items="CovItem"
              item-text="name"
              item-value="value"
              v-model="form.branchCov"
              label="브랜치커버리지"
              multiple
              chips
              clearable
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>

          <v-col cols="5">
            <!-- 커버리지 증감 값 입력란 -->
            <v-text-field
              class="mr-4"
              type="number"
              step="0.01"
              v-model="form.branchCompareNum"
              style="width: 300px"
              placeholder="브랜치 커버리지 증감 값"
            >
              <template v-slot:append>%</template>
            </v-text-field>
          </v-col>
        </div>

        <!-- tag -->
        <row class="detail-form-row">
          <v-col cols="2">
            <v-list-subheader>tag</v-list-subheader>
          </v-col>

          <v-col cols="9">
            <v-text-field v-model="form.tag" label="target tag"></v-text-field>
          </v-col>
        </row>

        <!-- skip option -->
        <div class="detail-form-row">
          <v-col cols="2"><v-list-subheader>skip contents</v-list-subheader></v-col>
          <v-col><input-radio class="my-0" v-model="form.viewGraph" :items="hideSameGraphItems" row /></v-col>
        </div>

        <!-- legacy option -->
        <div class="detail-form-row">
          <v-col cols="2"><v-list-subheader>legacy</v-list-subheader></v-col>
          <v-col><checkbox-group v-if="type != 'project'" class="my-0" :items="form.checkboxOption" /></v-col>
        </div>

        <!-- button set -->
        <div style="text-align: end">
          <!-- 검색 버튼 -->
          <v-btn type="submit" class="mr-2" large dark>search</v-btn>

          <!-- 초기화 버튼 -->
          <v-btn @click="reset()" class="mr-2" large dark>reset</v-btn>
        </div>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 * @name searchChart.vue
 * @description 상단의 검색창 부분을 담당하는 컴포넌트
 * @namespace typescript
 */

import Vue from "vue";
import { searchData } from "@/components/modules/dataDto";
import inputRadio from "@/components/atom/InputRadio.vue";
import switchButton from "@/components/atom/switch.vue";
import checkboxGroup from "@/components/atom/checkboxGroup.vue";

export default Vue.extend({
  components: {
    inputRadio,
    switchButton,
    checkboxGroup,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      CovItem: [
        { name: "오름", value: "U" },
        { name: "그대로", value: "S" },
        { name: "내림", value: "D" },
      ],
      form: {
        id: "",
        lineCov: [],
        branchCov: [],
        lineCompareNum: "",
        branchCompareNum: "",
        viewGraph: "all",
        checkboxOption: [{ label: "only legacy", id: "legacy", enabled: false }],
        tag: "",
      } as searchData,
      hideSameGraphItems: [
        { label: "skip equal value", value: "skip" },
        { label: "all", value: "all" },
      ],
      showDetail: false,
    };
  },
  mounted() {
    document.body.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.onClickOutside);
  },
  methods: {
    // 검색버튼이나 엔터 action
    onSubmitForm(e) {
      // form의 새로고침 막기
      e.preventDefault();

      // 증감 값만 있는 경우 커버리지 기준을 같음으로 설정해준다.
      // 커버리지 기준만 있는 경우 증감 값은 0으로 설정해준다.
      this.form.lineCov = this.form.lineCov.length === 0 && this.form.lineCompareNum ? ["S"] : this.form.lineCov;
      this.form.lineCompareNum =
        this.form.lineCov.length > 0 && this.form.lineCompareNum === "" ? "" : this.form.lineCompareNum;

      this.form.branchCov =
        this.form.branchCov.length === 0 && this.form.branchCompareNum ? ["S"] : this.form.branchCov;
      this.form.branchCompareNum =
        this.form.branchCov.length > 0 && this.form.branchCompareNum === "" ? "" : this.form.branchCompareNum;

      this.$emit("change", this.form);
    },
    // reset button action
    reset() {
      this.form = {
        id: "",
        lineCov: [],
        branchCov: [],
        lineCompareNum: "",
        branchCompareNum: "",
        viewGraph: "all",
        checkboxOption: this.form.checkboxOption.map((item) => {
          return { label: item.label, id: item.id, enabled: false };
        }),
        tag: "",
      };
    },

    detail() {
      this.showDetail = !this.showDetail;
    },
    onClickOutside(event) {
      const isClickInsideForm = this.$el.contains(event.target);
      console.log("isClickInsideForm: " + isClickInsideForm);
      if (
        !isClickInsideForm
        //   !event.target.className.includes("v-list")
        // !event.target.className.includes("v-list-item__content")
      ) {
        this.showDetail = false;
      }
      //   // const targetClassName = event.target.className;
      //   // if (!targetClassName.includes("v-list-item__title") && !targetClassName.includes("detail-form")) {
      //   //   this.showDetail = false;
      //   // }
    },
    handleSwitchChange(event) {
      this.$emit("switch_change", event);
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  //   position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
}
.search-form {
  display: flex;
  width: inherit;
}
.detail-form {
  text-align: center;
  z-index: 99;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #d8d9da;
  position: absolute;
  margin-top: 50px;
  .detail-form-row {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
