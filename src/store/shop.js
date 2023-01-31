import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
export default {
    state: {
        bought_items: null,
        bought_items_loading: null
    },
    mutations: {
        setBoughtItems(state, payload) {
            state.bought_items = payload.bought_items
        },
        setBoughtItemsLoading(state, payload) {
            state.bought_items_loading = payload.bought_items_loading
        }
    },
    actions: {
        GET_BOUGHT_ITEMS({getters, commit}) {
            commit('setBoughtItemsLoading', {bought_items_loading: true})
            const db = firebase.firestore();
            db.collection("user_scores").doc(getters.userName).get()
            .then((doc) => {
                if (doc.exists) {
                    const bought_items = doc.data().bought_items
                    commit('setBoughtItems', {
                        bought_items: bought_items
                    })
                    commit('setBoughtItemsLoading', {bought_items_loading: false})
                }
            })
        },
        BUY_ITEM({getters, dispatch}, payload) {
            const db = firebase.firestore();
            db.collection("user_scores").doc(getters.userName).update({
                bought_items: firebase.firestore.FieldValue.arrayUnion(payload.bought_item),
                coins: firebase.firestore.FieldValue.increment(payload.coins * -1)
            })
            .then(() => {
                console.log("Document successfully written!");
                dispatch('GET_BOUGHT_ITEMS')
                dispatch('GET_PROFILE_INFO')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        },
        REMOVE_ITEM({getters, dispatch}, payload) {
            const db = firebase.firestore();
            db.collection("user_scores").doc(getters.userName).update({
                bought_items: firebase.firestore.FieldValue.arrayRemove(payload.item)
            })
            .then(() => {
                console.log("Document successfully written!");
                dispatch('GET_BOUGHT_ITEMS')
                dispatch('GET_PROFILE_INFO')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    },
    getters: {
        boughtItems(state) {
            return state.bought_items
        },
        boughtItemsLoading(state) {
            return state.bought_items_loading
        }
    }
}