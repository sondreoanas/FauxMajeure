<template>
  <footer>
    <div class="footer-container">
        <div>© {{thisYear}} faux Majeure</div>
        <!-- <a href="https://www.instagram.com/fauxmajeure/">IG</a> -->
        <img src="/faux-majeure-logo.png" alt="faux majeure logo" />
    </div>
  </footer>
</template>

<script lang="ts">
export default {
    data() {
        return {
            thisYear: new Date(Date.now()).getFullYear()
        }
    }
}
</script>


<style lang="scss" scoped>
footer {
    font-family: Montserrat;
    min-width: 100vw;
    width: 100%;
    max-height: 15vh;
    height: 100%;
    
    .footer-container {
        max-height: 15vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1em;

        img {
            max-width: 70px;
            width: 100%;
        }
    }

    a {
        color: black;
        text-decoration: none;
    }
}

@font-face {
    font-family: Montserrat;
    src: url("/Montserrat-Medium.ttf");
}
</style>