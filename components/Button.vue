<template>
  <button v-bind="$props"><slot /></button>
</template>

<style lang="scss" scoped>
button {
  transition-duration: 0.4s;
  background-color: #2e2e2e;
  color: white;
  padding: 1em;
  border-radius: 15px;
  width: auto;
  border: none;
  font-weight: 700;
  font-size: 15px;
}

.captcha-button {
    background-color: rgb(65, 133, 210);
    border-radius: 2px;
    font-weight: normal;
    font-family: Arial, Helvetica, sans-serif;
    padding: 1.2em;
}

.captcha-button:hover {
    background-color: rgb(47, 97, 154);
}

.captcha-button:active {
    background-color: rgb(47, 97, 154);;
}

button:hover {
  background-color: #000000;
  cursor: pointer;
}

button:active {
    background-color: #000000;
}
</style>