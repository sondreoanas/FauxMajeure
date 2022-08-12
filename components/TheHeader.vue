<template>
  <header>
    <div class="header-container">
        <NuxtLink to="/">faux Majeure</NuxtLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  min-width: 100vw;
  width: 100%;
  font-size: 30px;
  background-color: white;
  max-height: 10vh;
  height: 100%;

  .header-container {
    display: flex;
    justify-content: space-between;
    margin: 0.5em;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: black;
  }
}
</style>