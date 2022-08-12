<template>
    <div v-if="projects" class="projects">
        <Project v-bind:key="index" v-for="(project, index) in projects" v-bind:project="project" />
    </div>
</template>

<script>
import { Project } from '@/data/Project';
import { GetProjects } from '@/services/firebase'
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            projects: []
        }
    },
    async mounted() {
        const result = await GetProjects();
        const projectContainer = result.data();
        if (projectContainer) {
            for (const project of projectContainer.projects) {
                this.projects.push(new Project(project.name, project.date, project.youtube, project.soundcloud));
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.projects {
    display: flex;
    align-items: center;
    max-height: 80vh;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 2em;
    padding-top: 2em;
}
</style>