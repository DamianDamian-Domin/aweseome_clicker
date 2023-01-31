<template>
    <div class="highscores-container">
        <div class="header-text">
            <span style="color:#FF0000">H</span>
            <span style="color:#66CC66">i</span>
            <span style="color:#FF9966">g</span>
            <span style="color:#FFCCCC">h</span>
            <span style="color:#FF0066">s</span>
            <span style="color:#FF0000">c</span>
            <span style="color:#66CC66">o</span>
            <span style="color:#FF9966">r</span>
            <span style="color:#FFCCCC">e</span>
            <span style="color:#FF0066">s</span>
        </div>
        <div class="profile-container">
            <DataTable class="data-table" rows=10 :value="highscores">
                <Column field="place" header="🥇 Place"></Column>
                <Column field="avatar" header="Avatar">
                    <template #body="slotProps">
                        <img style="width: 25px;height: 25px" :src="require(`@/assets/${slotProps.data.avatar}.png`)" />
                    </template>
                </Column>
                <Column field="nickname" header="🧍 Player"></Column>
                <Column field="level" header="🆙 Level"></Column>
                <Column field="highest_score" header="💯 Highest score"></Column>
            </DataTable>
        </div>
        <div class="form-socials-wrapper">
            <Button @click="routerTo('/menu')" label="Back to main menu" class="p-button-outlined p-button-rounded p-button-success" />
        </div>
    </div>
</template>

<script>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import Button from 'primevue/button';
    export default {
        components: {
            Button,
            DataTable,
            Column
        },
        data() {
            return {
                highscores: null
            }
        },
        methods: {
            routerTo(to) {
                this.$router.push(to)
            }
        },
        computed: {
            userLevel() {
                return Math.floor(this.$store.getters.profileInfo.experience/1000) + 1
            },
            highScoresLoading() {
                return this.$store.getters.highScoresLoading
            }
        },
        mounted() {
            this.$store.dispatch("GET_HIGHSCORES")
        },
        watch: {
            highScoresLoading(loaded) {
                if (!loaded) {
                    var highscores_ordered = []
                    let place = 1
                        for (const highscore of this.$store.getters.highScores) {
                            if (place <= 10) {
                                let user = highscore
                                user['place'] = place
                                user['level'] = Math.floor(user.experience/1000) + 1
                                highscores_ordered.push(user)
                                place++ 
                            } else {
                                return
                            }
                            this.highscores = highscores_ordered
                        }   
                }
            }
        }
    }
</script>

<style scoped>
.highscores-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 2rem;
    height: auto;
}
.profile-container {
    position: relative;
    margin-top: 2rem;
    width: 100%;
    border: 1px dotted rgb(255, 255, 255);
}
.data-table {
    min-height: 10rem;
}
.form-socials-wrapper {
    display: flex;
    margin-top: 1rem;
}

</style>