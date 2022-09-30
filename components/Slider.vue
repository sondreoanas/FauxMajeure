<template>
    <div class="slider-container">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="content-container" :key="index" v-for="(item, index) of content">
                        <Content :content="content[0]"  />
                    </div>
                </div>
                <div class="swiper-slide">
                    <Content :content="content[1]"/>
                </div>
                
                <!-- <div class="swiper-slide">
                    <span>1</span>
                </div>
                <div class="swiper-slide">
                    <span>2</span>
                </div> -->
            </div>
            <div class="arrows">
                <img class="swiper-button-next" src="/exit-pil.png" @click="slidePrev" />
                <img class="swiper-button-prev left" src="/exit-pil.png" @click="slideNext" />
            </div>
        </div>
    </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper';
import { GetContent } from '@/services/firebase'

export default {
    data() {
        return {
            swiper: null,
            content: null
        }
    },
    methods: {
        slideNext: function() {
            console.log('next')
            this.swiper.slideNext();
        },
        slidePrev: function() {
            console.log('prev');
            this.swiper.slidePrev();
        }
    },
    async mounted() {
        this.swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            modules: [Navigation, Pagination],

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        this.content = await GetContent();
    }
};
</script>

<style lang="scss" scoped>
.swiper {
    
}

.swiper-slide {
    display: flex;
    justify-content: center;

    .content-container {
        width: 100%;
    }
}

.arrows {
    display: flex;
    justify-content: space-between;

    img {
        max-width: 150px;
        width: 100%;

        @media only screen and (min-width: 1000px) {
            max-width: 150px;
        }
    }

    .left {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
    }
}
</style>

