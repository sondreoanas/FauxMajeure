<template>
    <header v-if="name">
        <div class="name-container">Logged in as <span class="name">{{name}}</span></div>
    </header>
</template>

<style lang="scss" scoped>
header {
    margin: 1em;
    display: flex;
    justify-content: flex-end;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;

    .name {
        font-weight: bold;
    }
}
</style>

<script>
import { getAuth } from '@firebase/auth'
export default {
    data() {
        return {
            name: null
        }
    },
    mounted() {
        const auth = getAuth();
        if (auth.currentUser?.displayName) {
            this.name = auth.currentUser.displayName;
        }
    }
}
</script>

