<template>
    <div class="exit-container">
        <img src="/exit.jpg" />
    </div>
</template>

<script>
export default {
    layout: 'emptyLayout'
}
</script>

<style lang="scss" scoped>
.exit-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    img {
        width: 100%;
        max-width: 80vw;

        @media only screen and (min-width: 1000px) {
            max-width: 400px
        }
    }
}
</style>