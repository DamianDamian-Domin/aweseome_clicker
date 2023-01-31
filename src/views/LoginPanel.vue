<template>
    <div class="login-container">
        <Toast position="bottom-right" />
        <div class="header-text">
            <span> Welcome to </span>
            <span style="color:#FF0000">F</span>
            <span style="color:#66CC66">r</span>
            <span style="color:#FF9966">u</span>
            <span style="color:#FFCCCC">i</span>
            <span style="color:#FF0066">t</span>
            <span> clicker! </span>
        </div>
        <div class="form-wrapper">
            <InputText v-model="login" type="text" class="p-inputtext-sm" placeholder="E-mail or username" />
            <InputText v-model="password" type="text" class="p-inputtext-sm" placeholder="Password" />
        </div>
        <div class="form-buttons-wrapper">
            <Button @click="loginAccount()" label="Sign in" class="p-button-outlined p-button-rounded p-button-success" />
            <Button @click="registerAccount()" label="Sign up" class="p-button-outlined p-button-rounded p-button-warning" />
        </div>
        <div class="or-text">
            or login with:
        </div>
        <div class="form-socials-wrapper">
            <Button @click="handleFacebookLogin()" icon="pi pi-facebook" class="p-button-rounded p-button-info" />
            <Button @click="handleGoogleLogin()" icon="pi pi-google" class="p-button-rounded p-button-warning" />
        </div>
    </div>
</template>

<script>
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import Toast from 'primevue/toast';
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import "firebaseui/dist/firebaseui.css";
    export default {
        components: {
            InputText,
            Button,
            Toast
        },
        data() {
            return {
                login: null,
                password: null
            }
        },
        methods: {
            async registerAccount() {
                try {
                    if (this.login.indexOf('@') === -1) {
                        let error = new Error('Email is not valid')
                        throw error
                    } 
                    if (this.password.length < 5) {
                        let error = new Error('Password is to short!')
                        throw error
                    }
                    await this.$store.dispatch('REGISTER_ACCOUNT', {
                        login: this.login,
                        password: this.password
                    })
                    this.$toast.add({severity:'success', summary: 'Success', detail:'Account created, login to continue', life: 3000}); 
                }
                catch(err) {
                    this.$toast.add({severity:'error', summary: 'Danger', detail: err, life: 3000});
                }
            },
            async loginAccount() {
                await this.$store.dispatch('LOGIN_USER', {
                    login: this.login,
                    password: this.password,
                    vm: this
                })

            },
            handleFacebookLogin() {
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        /** @type {firebase.auth.OAuthCredential} */
                        this.$store.commit('SET_USER', {
                            user: result.user.displayName,
                            token: result.credential.accessToken
                        })
                        this.$router.push('/menu')
                    }).catch((error) => {
                    console.log(error)
                });
            },
            handleGoogleLogin() {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        this.$store.commit('SET_USER', {
                            user: result.user.displayName,
                            token: result.credential.accessToken
                        })
                        this.$router.push('/menu')
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    }
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100%;
}
.header-text {
    font-size: 1em;
}
.form-wrapper {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
}
.form-wrapper > * {
    font-family: 'Courier New', Courier, monospace;
    color: white !important;
    width: 25em;
    margin-top: 0.5rem;
}
.form-buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5rem;
}
.form-buttons-wrapper > * {
    font-family: 'Courier New', Courier, monospace;
    color: white;
    width: 10rem;
    margin: 0 1rem;
}
.or-text {
    display: flex;
    align-items: center;
    height: 2rem;
    font-family: 'Courier New', Courier, monospace;
    color: white;
    font-size: 1rem;
}
.form-socials-wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form-socials-wrapper > * {
    margin: 0 1rem;
}
.p-inputtext {
    background: rgba(37, 37, 37, 0.158);
}
</style>