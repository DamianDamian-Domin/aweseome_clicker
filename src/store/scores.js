import firebase from "@/firebaseInit";
export default {
    state: {
        highest_score: null,
        coins: null,
        experience: null,
        highscores: null,
        highscores_loading: null,
        new_user: null,
        nickname: null,
        avatar: null,
        profile_info_loading: null,
        bought_items: null,
        geolocation: null
    },
    mutations: {
        setProfileInfo(state, payload) {
            state.highest_score = payload.highest_score
            state.coins = payload.coins
            state.experience = payload.experience
            state.nickname = payload.nickname
            state.avatar = payload.avatar
            state.bought_items = payload.bought_items
            state.geolocation = payload.geolocation
        },
        setProfileInfoLoading(state, payload) {
            state.profile_info_loading = payload.profile_info_loading
        },
        setHighscores(state, payload) {
            state.highscores = payload.highscores.sort((a,b) =>  b.highest_score-a.highest_score)
        },
        setHighscoresLoading(state, payload) {
            state.highscores_loading = payload.highscores_loading
        },
        setNewUserFlag(state, payload) {
            state.new_user = payload.flag
        }
    },
    actions: {
        SAVE_SCORE({getters}, payload) {
            const db = firebase.firestore();
            db.collection("user_scores").doc(getters.userName).get()
                .then((doc) => {
                    if (doc.exists) {
                        const experience = doc.data().experience
                        const coins = doc.data().coins
                        const highest_score = payload.score > doc.data().highest_score ? payload.score : doc.data().highest_score
                        db.collection("user_scores")
                            .doc(getters.userName)
                            .update({ 
                                coins: payload.coins + coins,
                                experience: payload.score + experience,
                                highest_score: highest_score
                            })
                            .then(() => {
                                console.log("Document successfully written!");
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                    } 
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
        },
        GET_PROFILE_INFO({getters, commit}) {
            commit('setProfileInfoLoading', {profile_info_loading: true})
            const db = firebase.firestore();
            db.collection("user_scores").doc(getters.userName).get()
            .then((doc) => {
                if (doc.exists) {
                    commit('setNewUserFlag', {flag: false})
                    const experience = doc.data().experience
                    const coins = doc.data().coins
                    const highest_score = doc.data().highest_score
                    const nickname = doc.data().nickname
                    const avatar = doc.data().avatar
                    const bought_items = doc.data().bought_items
                    const geolocation = doc.data().geolocation
                    commit('setProfileInfo', {
                        highest_score: highest_score,
                        coins: coins,
                        experience: experience,
                        nickname: nickname,
                        avatar: avatar,
                        bought_items: bought_items,
                        geolocation: geolocation
                    })
                    commit('setProfileInfoLoading', {profile_info_loading: false})
                } else {
                    commit('setNewUserFlag', {flag: true})
                }
            })
        },
        GET_HIGHSCORES({commit}) {
            const db = firebase.firestore();
            var highscores = [];
            commit('setHighscoresLoading', {highscores_loading: true})
            db.collection("user_scores")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        highscores.push(doc.data())
                    })
                })
                .then(() => {
                    commit('setHighscores', {highscores: highscores})
                    commit('setHighscoresLoading', {highscores_loading: false})
                })
        }
    },
    getters: {
        testValue(state) {
            return state.random
        },
        profileInfo(state) {
            return {
                highest_score: state.highest_score,
                coins: state.coins,
                experience: state.experience,
                avatar: state.avatar,
                bought_items: state.bought_items,
                geolocation: state.geolocation
            }
        },
        profileInfoLoading(state) {
            return state.profile_info_loading
        },
        highScores(state) {
            return state.highscores
        },
        highScoresLoading(state) {
            return state.highscores_loading
        },
        newUser(state) {
            return state.new_user
        },
        nickName(state) {
            return state.nickname
        }
    }
}
