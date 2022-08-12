<template>
    <div class="project"
        :class="{ 'no-media': (!project.youtube && !project.soundcloud) }">
        <div class="youtube-container">
            <div class="youtube" v-if="project.youtube" v-html="project.youtube" />
        </div>
        <div class="soundcloud" v-if="project.soundcloud" v-html="project.soundcloud" />
        <RandomFontText v-bind:text="project.name" class="name" />
        <div class="date">{{project.date}}</div>
    </div>
</template>

<script lang="ts">
import { Project } from '@/data/Project';
export default {
    props: {
        project: Project
    }
}
</script>

<style lang="scss" scoped>
.project {
    font-size: 25px;
    margin-left: 1em;
    margin-right: 1em;
    min-width: 100vw;
    width: 100%;

    &.no-media {
        min-width: 60vw;
    }

    .name {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .date {
        font-size: 20px;
    }

    .youtube {
        height: 25vh;
    }


    @media only screen and (min-width: 1000px) {
        margin-left: 2em;
        margin-right: 2em;
        min-width: 50vw;

        &.no-media {
            min-width: 20vw;
        }

        .youtube {
            height: 40vh;
        }
    }
}
</style>