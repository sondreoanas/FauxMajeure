<template>
    <div class="content">
        <div class="external-content" v-if="iframe" v-html="iframe" />
        <div class="images" v-if="images" @click="changeImage">
            <img :src="image" />
        </div>
    </div>
</template>

<script>
import { Project } from '@/data/Project';
export default {
    props: {
        content: Object,
    },
    data() {
        return {
            image: null,
            images: null,
        }
    },
    methods: {
        changeImage: function() {
            
        },
        takeRandomFromArray(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
    },
    computed: {
        iframe: function() {
            if (this.content.type == 'youtube') {
                return Project.formatYoutubeHTML(this.content.value);
            } else {
                return this.content.value;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    .external-content {
        height: 100%;
        margin-left: 1em;
        margin-right: 1em;
    }

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
        display: flex;
        justify-content: center;
        width: 100%;

        .external-content {
            max-width: 60vw;
            width: 100%;
        }
    }
}
</style>