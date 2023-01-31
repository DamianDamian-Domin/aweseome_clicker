<template>
    <div class="login-container">
        <div class="set-avatar-backdrop" v-if="show_set_avatar" @click="showSetAvatar()">
            <div class="set-avatar-items parent">
                <Card class="avatar-card">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/apple.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Apple
                    </template>
                    <template #subtitle>
                        Lvl required: 1
                    </template>
                    <template #footer>
                        <Button @click="setAvatar('apple')" icon="pi pi-check" label="Set avatar" />
                    </template>
                </Card>
                <Card class="avatar-card">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/grapes.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Grapes
                    </template>
                    <template #subtitle>
                        Lvl required: 5
                    </template>
                    <template #footer>
                        <Button @click="setAvatar('grapes')" :disabled="userLevel < 5" icon="pi pi-check" label="Set avatar" />
                    </template>
                </Card>
                <Card class="avatar-card">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/lemon.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                       Lemon
                    </template>
                    <template #subtitle>
                        Lvl required: 10
                    </template>
                    <template #footer>
                        <Button @click="setAvatar('lemon')" :disabled="userLevel < 10" icon="pi pi-check" label="Set avatar" />
                    </template>
                </Card>
                <Card class="avatar-card">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/strawberry.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Strawberry
                    </template>
                    <template #subtitle>
                        Lvl required: 20
                    </template>
                    <template #footer>
                        <Button @click="setAvatar('starwberry')" :disabled="userLevel < 20" icon="pi pi-check" label="Set avatar" />
                    </template>
                </Card>
                <Card class="avatar-card">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/watermelon.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Watermelon
                    </template>
                    <template #subtitle>
                        Lvl required: 40
                    </template>
                    <template #footer>
                        <Button @click="setAvatar('watermelon')" :disabled="userLevel < 40" icon="pi pi-check" label="Set avatar" />
                    </template>
                </Card>
                <Card class="avatar-card">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/bomb.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Bomb
                    </template>
                    <template #subtitle>
                        Lvl required: 50
                    </template>
                    <template #footer>
                        <Button @click="setAvatar('bomb')" :disabled="userLevel < 40" icon="pi pi-check" label="Set avatar" />
                    </template>
                </Card>
            </div>
        </div>
        <div class="profile-container">
            <div class="profile-wrapper">
                <div class="avatar-wrapper">
                    <div class="avatar-row">
                        <Avatar v-if="url" :image="url" size="xlarge" class="avatar-item" />
                        <Button @click="showSetAvatar()" icon="pi pi-user-edit" class="edit-button p-button-outlined p-button-rounded p-button-success" />
                    </div>
                    <span class="user-name">{{nickName}}</span>
                </div>
                <div class="statistics-wrapper">
                    <span> 🥇: {{userLevel}} lvl </span>
                    <span> 💸: {{$store.getters.profileInfo.coins}} coins</span>
                    <span> 🏆: {{$store.getters.profileInfo.highest_score}} highest</span>
                </div>
            </div>
            <div class="bar-wrapper">
                <span class="experience-left"> {{userLevel * 1000 - $store.getters.profileInfo.experience}} XP to next Level </span>
                <ProgressBar :value="50" class="progress-bar" />
            </div>
        </div>
        <div class="form-socials-wrapper">
            <Button @click="routerTo('/menu')" label="Back to main menu" class="p-button-outlined p-button-rounded p-button-success" />
        </div>
    </div>
</template>

<script>
    import Button from 'primevue/button';
    import Avatar from 'primevue/avatar';
    import Card from 'primevue/card';
    import ProgressBar from 'primevue/progressbar';
    import firebase from "@/firebaseInit";
    export default {
        components: {
            Button,
            Avatar,
            ProgressBar,
            Card
        },
        data() {
            return {
                login: null,
                password: null,
                url: null,
                show_set_avatar: false
            }
        },
        methods: {
            routerTo(to) {
                this.$router.push(to)
            },
            getUserImage() {
                const storage = firebase.storage();
                console.log(this.userAvatar)
                storage.ref(`${this.userAvatar}.png`).getDownloadURL()
                    .then((url) => {
                        this.url = url
                    })
            },
            showSetAvatar() {
                this.show_set_avatar = !this.show_set_avatar
            },
            setAvatar(avatar) {
                this.$store.dispatch('SET_AVATAR', {avatar: avatar})
            }
        },
        computed: {
            userLevel() {
                return Math.floor(this.$store.getters.profileInfo.experience/1000) + 1
            },
            nickName() {
                return this.$store.getters.nickName
            },
            userAvatar() {
                return this.$store.getters.profileInfo.avatar
            },
            profileInfoLoading() {
                return this.$store.getters.profileInfoLoading
            }
        },
        mounted() {
            this.$store.dispatch("GET_PROFILE_INFO")
        },
        watch: {
            profileInfoLoading(loading) {
                if (!loading) {
                    this.getUserImage()
                }
            }
        }
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
.profile-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10rem;
    display: flex;
    width: max(20rem,40%);
    background-color: #1e1e1e;
    border: 1px dotted rgb(255, 255, 255);
    padding: 3rem 0;
}
.header-text {
    font-size: 1em;
}
.profile-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-around;
    display: flex;
}
.avatar-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.statistics-wrapper {
    display: flex;
    flex-direction: column;
}
.statistics-wrapper > * {
    color: #9fa8da;
    font-size: 2.3rem;
}
.bar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5rem;
}
.progress-bar {
    margin-top: 1rem;
    width: 60%;
}
.experience-left {
    font-size: 2rem;
    color: #9fa8da;
}
.user-name {
    font-size: 3rem;
    color: #9fa8da;
}
.avatar-item {
    padding: 5px;
    border-radius: 20px;
    border: 1px solid #9fa8da;;
}
.avatar-row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-left: 4rem;
}
.edit-button {
    margin-left: 1rem;
}
.set-avatar-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(46, 46, 46, 0.911);
    width: 100vw;
    height: 100vh;
    z-index: 999;
}
.set-avatar-items {
    position: relative;
    display: flex;
}
.avatar-card {
    width: 250px;
    height: 300px;
}
.p-card-title {
    width: 50px;
    height: 50px;
}
.p-card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
.location {
    font-size: 1.2rem;
}
.avatar-card:deep(.p-card-title), .avatar-card:deep(.p-card-subtitle), .avatar-card:deep(.p-card-footer) {
    text-align: center !important;
}
@media (max-width: 1400px) {
    .profile-wrapper {
        flex-direction: column;
    }
}
.parent {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}

@media (max-width: 1580px) {
    .parent {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
}
@media (max-width: 800px) {
    .parent {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }
    .set-avatar-items {
        overflow: auto;
    }
}
@media (max-width: 540px) {
    .parent {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }
    .set-avatar-items {
        overflow: auto;
    }
}

</style>