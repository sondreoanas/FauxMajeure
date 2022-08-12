<template>
    <div class="login-container">
        <div v-if="isSignedIn">
            <NuxtLink to="/edit">edit</NuxtLink>
            <Button @click.native="signout">Sign out</Button>
        </div>
        <div v-else class="login-box">
            <div v-if="error" class="error">{{ error }}</div>
            <Button @click.native="login">Login</Button>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { GetAdmins } from "../services/firebase";
import Button from '@/components/Button.vue';
export default {
    layout: 'editLayout',
    components: { Button },
    data() {
        return {
            auth: null,
            isSignedIn: false,
            error: '',
            provider: null,
            admins: []
        }
    },
    head() {
        return {
            title: 'Login'
        }
    },
    methods: {
        async login() {
            signInWithPopup(this.auth, this.provider)
                .then((result) => {
                    if (result != null) {
                        // This gives you a Google Access Token. You can use it to access Google APIs.
                        GoogleAuthProvider.credentialFromResult(result);
                        // The signed-in user info.
                        this.checkAccess();
                    }
                }).catch((error) => {
                    this.error = 'Error: something went wrong...';
                });
        },
        signout() {
            signOut(this.auth)
                .then(() => this.$router.push("/"))
                .catch(() => {
                    this.error = 'Not able to sign out try again...';
                })
        },
        checkAccess() {
            console.log(this.auth.currentUser.email, this.admins);
            if (this.admins && this.admins.includes(this.auth.currentUser.email)) {
                this.isSignedIn = true;
            }
            if (this.auth.currentUser && (!this.admins || !this.admins.includes(this.auth.currentUser.email))) {
                this.signout();
            }
        }
    },
    mounted() {
        this.auth = getAuth();
        GetAdmins().then((result) => {
            this.admins = result.data().emails;
            this.checkAccess();
        });
        this.provider = new GoogleAuthProvider();
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-box {
        display: flex;
        flex-direction: column;
        max-width: 80vw;
        width: 100%;

        @media only screen and (min-width: 1000px) {
            max-width: 400px
        }

        .error {
            margin-bottom: 2em;
            font-size: 24px;
        }
    }

    

    a {
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
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

    a:hover {
    background-color: #000000;
    cursor: pointer;
    }

    a:active {
        background-color: #000000;
    }
}
</style>