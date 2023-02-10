<template>
    <div align="left">
        <!-- project page -->
        <v-btn class="text-none mt-3 ml-3" elevation="2" rounded v-if="type == 'project'" disabled>Project</v-btn>

        <!-- file page -->
        <v-btn class="text-none mt-3 ml-3" elevation="2" rounded v-if="type != 'project'" @click="moveProject">Project</v-btn>
        <v-btn class="mt-3 mx-3" elevation="2" rounded v-if="type != 'project' && type == 'file'" disabled small>>></v-btn>
        <v-btn class="text-none mt-3" elevation="2" rounded v-if="type != 'project' && type == 'file'" disabled>{{ projectName }}</v-btn>

        <!-- unit page-->
        <v-btn class="mt-3 mx-3" elevation="2" rounded v-if="type != 'project' && type != 'file'" disabled small>>></v-btn>
        <v-btn class="text-none mt-3" elevation="2" rounded v-if="type != 'project' && type != 'file'" @click="moveFile">{{ projectName }}</v-btn>
        <v-btn class="mt-3 mx-3" elevation="2" rounded v-if="type != 'project' && type != 'file'" disabled small>>></v-btn>
        <v-btn class="text-none mt-3" elevation="2" rounded v-if="type != 'project' && type != 'file'" disabled>{{ fileLocation }}</v-btn>
    </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ["type", "projectName", "fileLocation"],
    methods: {
        moveProject: function () {
            console.log("project: ", this.type);
            if (this.type == "file") {
                this.$router.go(-1);
            } else {
                this.$router.go(-2);
            }
        },
        moveFile: function () {
            this.$router.go(-1);
        },
    },
});
</script>
<style lang="scss"></style>
