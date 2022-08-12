<template>
    <div class="project-name">
        <span v-bind:key="index" v-for="(text, index) in textArray" :class="getRandomClass()">
            {{text}}
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            classList: ['facade', 'karrik', 'pilowlava', 'victorianna', 'respira']
        }
    },
    props: {
        text: String
    },
    methods: {
        getRandomClass() {
            var max = this.classList.length;
            var random = Math.floor(Math.random() * max);
            return this.classList[random];
        }
    },
    computed: {
        textArray: function() {
            return this.text.split(' ');
        }
    }
}
</script>

<style scoped>
.facade {
    font-family: Facade;
}

.karrik {
    font-family: Karrik;
}

.pilowlava {
    font-family: Pilowlava;
}

.victorianna {
    font-family: Victorianna;
}

.respira {
    font-family: Respira;
}

@font-face {
    font-family: Facade;
    src: url("/Facade-Sud.otf") format("opentype");
}

@font-face {
    font-family: Karrik;
    src: url("/Karrik-Regular.otf") format("opentype");
}

@font-face {
    font-family: Pilowlava;
    src: url("/Pilowlava-Regular.otf") format("opentype");
}

@font-face {
    font-family: Victorianna;
    src: url("/VTF victorianna thin.otf") format("opentype");
}

@font-face {
    font-family: Respira;
    src: url("/Respira-Black.ttf") format("opentype");
}
</style>