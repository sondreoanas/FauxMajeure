<template>
    <div class="captcha" v-if="images.length > 0">
        <div class="captcha-top">
            <div class="captcha-text">
                <div>Select all squares with</div>
                <div class="select">Exit signs</div>
                <div>If there are none, click skip</div>
            </div>
            <div class="image-container">
                <div v-for="(image, index) of images"
                    :class="{ active: image.isActive }"
                    v-bind:key="index"
                    @click="select(image)">
                    <img :src="image.path" />
                </div>
            </div>
        </div>
        <div class="captcha-bottom">
            <Button class="captcha-button" @click.native="verify" >{{buttonText}}</Button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [],
            captchas: [
                '/captcha/IMG_2035.jpg',
                '/captcha/IMG_2036.jpg',
                '/captcha/IMG_2037.jpg',
                '/captcha/IMG_2038.jpg',
                '/captcha/IMG_2040.jpg',
                '/captcha/IMG_2042.jpg',
                '/captcha/IMG_6708.jpg',
                '/captcha/IMG_6710.jpg',
                '/captcha/IMG_6712.jpg',
                '/captcha/IMG_6713.jpg',
                '/captcha/IMG_6714.jpg',
                '/captcha/IMG_6716.jpg',
                '/captcha/IMG_6717.jpg',
                '/captcha/IMG_6719.jpg',
                '/captcha/IMG_6720.jpg',
                '/captcha/IMG_6721.jpg',
                '/captcha/IMG_6724.jpg',
                '/captcha/IMG_6725.jpg',
            ],
            exits: [
                '/captcha/exit/IMG_6709.jpg',
                '/captcha/exit/IMG_6711.jpg',
                '/captcha/exit/IMG_6715.jpg',
                '/captcha/exit/IMG_6718.jpg',
                '/captcha/exit/IMG_6722.jpg',
                '/captcha/exit/IMG_6723.jpg',
                '/captcha/exit/IMG_2034.jpg',
                '/captcha/exit/IMG_2039.jpg',
                '/captcha/exit/IMG_2041.jpg',
            ]
        }
    },
    methods: {
        select: function(image) {
            image.isActive = !image.isActive;
        },
        takeRandomFromArray(array) {
            return array.splice([Math.floor(Math.random() * array.length)], 1)[0];
        },
        shuffleImages(array) {
            let currentIndex = array.length,  randomIndex;
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
        },
        getCaptcha: function() {
            const array = [];
            const captchas = [...this.captchas]
            const exits = [...this.exits]
            for (let i = 0; i < 6; i++) {
                array.push({ path: this.takeRandomFromArray(captchas), isActive: false, isExit: false });
            }
            for (let i = 0; i < 3; i++) {
                array.push({ path: this.takeRandomFromArray(exits), isActive: false, isExit: true });
            }
            this.images = this.shuffleImages(array);
        },
        verify: function() {
            const verify = this.images.every(image => {
                if (image.isActive && image.isExit) return true;
                else if (!image.isActive && !image.isExit) return true;
                else return false;
            });
            if (verify) {
                this.$router.push("/inside");
            } else {
                this.getCaptcha();
            }
        }
    },
    computed: {
        buttonText: function() {
            return this.images.filter(image => image.isActive).length > 0 ? 'VERIFY' : 'SKIP';
        }
    },
    mounted() {
        this.getCaptcha();
    }
}
</script>

<style lang="scss" scoped>
 @font-face {
    font-family: Baskerville;
    src: url("/BaskervilleBoldBT.ttf") format("opentype");
 }

.captcha {
    display: flex;
    flex-direction: column;
    margin-left: 0.5em;
    margin-right: 0.5em;
    max-width: 350px;

    .captcha-top {
        padding: 1em;
        border-top: 1px solid lightgray;
        border-left: 1px solid lightgray;
        border-right: 1px solid lightgray;

        .captcha-text {
            font-family: Arial, Helvetica, sans-serif;
            background-color: rgb(65, 133, 210);
            color: white;
            margin-bottom: 0.5em;
            padding: 1em;

            div {
                margin-bottom: 0.5em;
            }
            
            .select {
                font-size: 32px;
                font-family: Baskerville;
            }
        }

        .image-container {
            display: grid;
            grid-template-columns: repeat(3, auto);
            column-gap: 0.5em;
            row-gap: 0.5em;
            
            img {
                width: 100%;
            }

            .active {
                position: relative;

                img {
                    outline: 0.7em solid white;
                    outline-offset: -0.6em;
                }
                
                &::after {
                    content: '';
                    background-image: url('/captcha/check.png');
                    background-size: contain;
                    width: 20px;
                    height: 20px;
                    left: 2px;
                    bottom: 6px;
                    position: absolute;
                }
            }
        }
    }

    .captcha-bottom {
        border: 1px solid lightgray;
        padding: 1em;
        display: flex;
        justify-content: flex-end;
    }
}
</style>