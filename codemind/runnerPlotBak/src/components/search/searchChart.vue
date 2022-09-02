<template>
    <div>
        <form id="searchForm" v-on:submit="onSubmitForm" class="d-flex">
            <v-text-field v-model="form.id" style="width: 300px" placeholder="검색어를 입력해주세요." />

            <v-select class="mx-4" :items="lineCov" item-text="name" item-value="value" v-model="form.lineCov" chips solo label="라인커버리지" multiple />

            <v-select class="mr-4" :items="branchCov" item-text="name" item-value="value" v-model="form.branchCov" chips solo label="브랜치커버리지" multiple />

            <v-text-field class="mr-4" type="number" step="0.01" v-model="form.compareNum" style="width: 300px" placeholder="커버리지 증감 값">
                <template v-slot:append>%</template>
            </v-text-field>

            <v-btn type="submit" class="mr-2" large dark>검색</v-btn>
            <v-btn @click="reset()" large dark>초기화</v-btn>
        </form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { searchData } from "@/components/modules/dataDto";

export default Vue.extend({
    data() {
        return {
            lineCov: [
                { name: "오름", value: "U" },
                { name: "그대로", value: "S" },
                { name: "내림", value: "D" },
            ],
            branchCov: [
                { name: "오름", value: "U" },
                { name: "그대로", value: "S" },
                { name: "내림", value: "D" },
            ],
            form: {
                id: "",
                lineCov: [],
                branchCov: [],
                compareNum: "",
            } as searchData,
        };
    },
    methods: {
        // 검색버튼이나 엔터 action
        onSubmitForm(e) {
            // form의 새로고침 막기
            e.preventDefault();

            // 커버리지 증감 값만 있는 경우 default로 커버리지 기준을 오름 내림으로 준다.
            if (this.form.id == "" && this.form.lineCov.length == 0 && this.form.branchCov.length == 0 && this.form.compareNum) {
                this.form.lineCov.push("U", "D");
                this.form.branchCov.push("U", "D");
            }

            this.$emit("change", this.form);
        },
        // reset button action
        reset() {
            this.form = {
                id: "",
                lineCov: [],
                branchCov: [],
                compareNum: "",
            };
        },
    },
});
</script>
<style lang="scss"></style>
