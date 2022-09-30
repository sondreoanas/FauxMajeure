<template>
  <div class="page">
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<style lang="scss">
html, body {
    margin: 0;
    min-height: 100vh;
}

.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>