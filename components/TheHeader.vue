<template>
  <header>
    <NuxtLink to="/exit-sign">
      <img src="/faux-logo.png" alt="" />
    </NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;

  img {
      max-width: 30vw;

      @media only screen and (min-width: 750px) {
          max-width: 150px
      }
  }
}
</style>