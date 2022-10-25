<template>
    <footer>
        <NuxtLink to="/wholeteamdiamondisreal" v-if="useLink">
            <img src="/exit-logo.png" alt="" />
        </NuxtLink>
        <img v-else src="/exit-logo.png" />
    </footer>
</template>

<script lang="ts">
export default {
    props: {
        useLink: {
            type: Boolean,
            default: true
        }
    }
 }
</script>

<style lang="scss" scoped>
footer {
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 2em;

    img {
        max-width: 20vw;
    }

    @media only screen and (min-width: 750px) {
        min-height: 150px;
        margin: 0;
        align-items: center;

        img {
            max-width: 100px
        }
    }
}
</style>