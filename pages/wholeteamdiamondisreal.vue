<template>
    <div class="exit-page">
        <TheHeader/>
        <div class="exit-container">
            <div class="exit" v-if="image">
                <img :src="image" />
            </div>
        </div>
        <TheFooter :useLink="false" @click.native="changeImage" />
    </div>
</template>

<script>
import { GetPhotoUrls, GetPhotos, GetFileUrl } from "@/services/firebase";
export default {
    data() {
        return {
            images: [],
            image: '',
            index: 0
        }
    },
    methods: {
        changeImage: async function() {
            this.index = this.getAlmostRandomIndex(this.index, this.images.length);
            this.image = await GetFileUrl(this.images[this.index]);
        },
        getAlmostRandomIndex(currentIndex, arrayLength) {
            const random = this.getRandom(arrayLength);
            if (random == currentIndex) {
                if (random == arrayLength - 1) {
                    return 0;
                } else {
                    return random + 1;
                }
            }
            return random;
        },
        getRandom(arrayLength) {
            return Math.floor(Math.random() * arrayLength);
        }
    },
    async mounted() {
        const photos = await GetPhotos();
        this.images = photos.data().Photos;
        this.index = this.getRandom(this.images.length);
        this.image = await GetFileUrl(this.images[this.index]);
    }
}
</script>

<style lang="scss" scoped>
.exit-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    
    .exit-container {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        max-height: 450px;

        .exit {
            display: flex;
            max-height: 100%;
            margin-bottom: 3em;

            img {
                width: 100%;
                object-fit: contain;
            }

            
        }
        @media only screen and (min-width: 750px) {

            .exit {
                margin: 0;

                img {
                    //max-width: 400px 
                }
            }
        }    
    }
    
    footer {
        cursor: pointer;
    }
}
</style>