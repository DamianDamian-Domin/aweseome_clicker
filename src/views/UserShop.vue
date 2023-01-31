<template>
    <div class="login-container">
        <div class="header-text">
            <span style="color:#FF0000">S</span>
            <span style="color:#66CC66">h</span>
            <span style="color:#FF9966">o</span>
            <span style="color:#FFCCCC">p</span>
        </div>
        <div> 
            <span style="color:white"> Your money: 💸: </span>
            <span style="color:#66CC66"> {{userMoney}} </span>
        </div>
        <div class="set-avatar-backdrop">
            <div class="set-avatar-items parent">
                <Card class="avatar-card" :class="{green_border: isBought('lifes_up')}">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/hearts.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Life up!
                    </template>
                    <template #subtitle>
                        Start game with 3 more lifes.
                    </template>
                    <template #footer>
                        <Button @click="buyItem('lifes_up', 20)" :disabled="isBought('lifes_up') || userMoney < 20" icon="pi pi-money-bill" label="20" />
                    </template>
                </Card>
                <Card class="avatar-card" :class="{green_border: isBought('money_up')}">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/money-bag.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                        Riiiich
                    </template>
                    <template #subtitle>
                        More money will apear.
                    </template>
                    <template #footer>
                        <Button @click="buyItem('money_up', 50)" :disabled="isBought('money_up') || userMoney < 50" icon="pi pi-money-bill" label="50" />
                    </template>
                </Card>
                <Card class="avatar-card" :class="{green_border: isBought('no_bombs')}">
                    <template #header>
                        <div class="p-card-header">
                            <img src="@/assets/no-bomb.png" style="width: 50px;height: 50px" />
                        </div>
                    </template>
                    <template #title>
                       No Bombs!
                    </template>
                    <template #subtitle>
                        No bombs in next game.
                    </template>
                    <template #footer>
                        <Button @click="buyItem('no_bombs', 100)" :disabled="isBought('no_bombs') || userMoney < 100" icon="pi pi-money-bill" label="100" />
                    </template>
                </Card>
            </div>
        </div>
        <div class="form-socials-wrapper">
            <Button @click="routerTo('/menu')" label="Back to main menu" class="p-button-outlined p-button-rounded p-button-success" />
        </div>
    </div>
</template>

<script>
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    export default {
        components: {
            Button,
            Card
        },
        data() {
            return {
                bought_items: []
            }
        },
        methods: {
            routerTo(to) {
                this.$router.push(to)
            },
            setBoughtItems() {
                this.bought_items = this.$store.getters.boughtItems
            },
            buyItem(item, coins) {
                this.$store.dispatch('BUY_ITEM', {
                    bought_item: item,
                    coins: coins
                    })
            },
            isBought(item) {
                return this.bought_items.includes(item)
            } 
        },
        computed: {
            userLevel() {
                return Math.floor(this.$store.getters.profileInfo.experience/1000) + 1
            },
            boughtItemsLoading() {
                return this.$store.getters.boughtItemsLoading
            },
            userMoney() {
                return this.$store.getters.profileInfo.coins
            }
        },
        mounted() {
            this.$store.dispatch("GET_BOUGHT_ITEMS")
            this.$store.dispatch("GET_PROFILE_INFO")
        },
        watch: {
            boughtItemsLoading(loading) {
                if (!loading) {
                    this.setBoughtItems()
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
    width: 100%;
}
.set-avatar-backdrop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
.avatar-card:deep(.p-card-title), .avatar-card:deep(.p-card-subtitle), .avatar-card:deep(.p-card-footer) {
    text-align: center !important;
}
.header-text {
    font-size: 5rem;
}
.green_border {
    border: 1px solid green;
}
@media (max-width: 1400px) {
    .profile-wrapper {
        flex-direction: column;
    }
}
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
}

@media (max-width: 820px) {
    .parent {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }
    .set-avatar-items {
        overflow: auto;
    }
}

</style>