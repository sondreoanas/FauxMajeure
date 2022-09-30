<template>
    <div class="exit-content">
        <div class="content-container">
            <div class="content-slider" v-if="content">
                <Content :content="content" />
            </div>
            <div class="arrows">
                <div class="left">
                    <span v-if="index > 0" @click="slidePrev">OLDER</span>
                </div>
                <div>
                    <span v-if="index < contentList.length - 1" @click="slideNext">NEWER</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetContent } from '@/services/firebase'
export default {
    layout: 'exitSignLayout',
    data() {
        return {
            contentList: [],
            index: 0
        }
    },
    methods: {
        slidePrev: function() {
            if (this.index == 0) {
                this.index = this.contentList.length - 1;
            } else {
                --this.index;
            }
            this.$forceUpdate();
        },
        slideNext: function() {
            if (this.index == this.contentList.length - 1) {
                this.index = 0;
            } else {
                ++this.index;
            }
            this.$forceUpdate();
        }
    },
    computed: {
        content: function() {
            if (this.contentList) {
                return this.contentList[this.index];
            }
        }
    },
    async mounted() {
        this.contentList = await GetContent();
        this.index = 0;
    }
}
</script>

<style lang="scss" scoped>
.exit-content {
    display: grid;
    height: 450px;

    img {
        width: 100%;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        height: 100%;

        .content-slider {
            height: 100%;
            max-height: 300px;
        }

        .arrows {
            display: flex;
            justify-content: space-between;       
            font-family: Arial, Helvetica, sans-serif;    
            font-style: italic;
            font-size: 28px;
            margin-top: 1em; 

            div {
                max-width: 150px;
                width: 100%;
                cursor: pointer;
            }

            @media only screen and (min-width: 1000px) {
                align-self: center;
                width: 100%;
                max-width: 95vw;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                height: 150px;

                div {
                    width: 150px;
                    height: 150px;
                    display: flex;
                    align-items: center;
                }
            }

            .left {
                justify-content: flex-end;
                text-align: right;
            }
        }
    }

    @media only screen and (min-width: 1000px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        height: auto;

        .content-container {
            height: 450px;
            width: 100%;
            justify-content: center;
            position: relative;
            
            .content-slider {
                max-height: 400px;
            }
        }
    }
}
</style>