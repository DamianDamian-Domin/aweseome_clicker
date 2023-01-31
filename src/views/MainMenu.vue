<template>
    <div>
        <div class="set-name-backdrop" v-if="newUser">
            <div class="set-name-items">
                <span style="color: #9fa8da;"> Almost done! Please set your username: </span>
                <InputText style="width: 30%" v-model="nickname" type="text" class="p-inputtext-sm" placeholder="Username" />
                <Button @click="setNickname()" label="Save!" class="p-button-rounded p-button-success" />
            </div>
        </div>
        <div class="fruits">
            <div v-for="num in 7" :key="num" :class="`fruit${num}`"> {{emojis[num]}}</div>
        </div>
        <div class="menu-container">
            <div class="menu-header"> Welcome back {{nickName}} </div>
            <div class="menu-buttons-wrapper">
                <Button @click="routerTo('/game')" label="New game" class="p-button-outlined p-button-rounded p-button-success" />
                <Button @click="routerTo('/leaderboard')" label="Leaderboard" class="p-button-outlined p-button-rounded p-button-info" />
                <Button @click="routerTo('/shop')" label="Shop" class="p-button-outlined p-button-rounded p-button-help green-button" />
                <Button @click="routerTo('/profile')" label="Your profile" class="p-button-outlined p-button-rounded p-button-warning" />
                <Button @click="logoutUser()" label="Logout" class="p-button-outlined p-button-rounded p-button-danger" />
            </div>
        </div>
    </div>    
</template>

<script>
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    export default {
        components: {
            Button,
            InputText
        },
        data() {
            return {
                emojis: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓"],
                nickname: ''
            }
        },
        methods: {
            logoutUser() {
                this.$store.dispatch('LOGOUT_USER')
            },
            routerTo(to) {
                this.$router.push(to)
            },
            async setNickname() {
                await this.$store.dispatch('SET_USERNAME', {nickname: this.nickname})
                await this.$store.dispatch('GET_PROFILE_INFO')
            },
        },
        computed: {
            nickName() {
                return this.$store.getters.nickName
            },
            newUser() {
                return this.$store.getters.newUser
            }
        },
        mounted() {
            this.$store.dispatch('GET_PROFILE_INFO')
            this.$store.dispatch('GET_BOUGHT_ITEMS')
        }
    }
</script>

<style scoped>
.menu-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100%;
    z-index: 999;
}
.menu-header {
    color: #cfd2e4;
}
.menu-buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
}
.menu-buttons-wrapper > * {
    width: 10rem;
    margin: 0.2rem;
}
/*newly added items start faded out and translated 400px upwards on the y-axis*/
.fruit1 {
    opacity: 0;
    animation: new-item-animation 1s linear forwards infinite;
}
.fruit2 {
    opacity: 0;
    animation: new-item-animation 0.8s linear forwards infinite;
}
.fruit3 {
    opacity: 0;
    animation: new-item-animation 1.5s linear forwards infinite;
}
.fruit4 {
    opacity: 0;
    animation: new-item-animation 2s linear forwards infinite;
}
.fruit5 {
    opacity: 0;
    animation: new-item-animation 1.1s linear forwards infinite;
}
.fruit6 {
    animation: new-item-animation 3s linear forwards infinite;
}
.fruit7 {
    opacity: 0;
    animation: new-item-animation 1.2s linear forwards infinite;
}

@keyframes new-item-animation {
    from {
        opacity: 0;
        transform: translateY(0);
}

    to {
        opacity: 1;
        transform : translateY(99vh);
    }
}
.fruits {
    display: flex;
    position: absolute;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    justify-content: space-between;
}
.set-name-backdrop {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(46, 46, 46, 0.911);
    width: 100vw;
    height: 100vh;
    z-index: 999;
}
.set-name-items {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15rem;
}
.set-name-items > * {
    margin: 1rem 0;
}
.green-button {
    color: rgb(231, 182, 19) !important;
    border-color: rgb(231, 182, 19) !important;
}
</style>