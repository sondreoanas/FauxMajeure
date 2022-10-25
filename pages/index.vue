<template>
    <div class="captcha-container">
        <Captcha />
    </div>
</template>

<script>
export default {
    layout: 'emptyLayout'
}
</script>

<style lang="scss" scoped>
.captcha-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 100vh;
}
</style>