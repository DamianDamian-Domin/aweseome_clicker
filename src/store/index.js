import { createStore } from 'vuex'
import firebase from "@/firebaseInit";
import router from "@/router/index.js"
import scores from "./scores.js"
import shop from "./shop.js"

export default createStore({
  state: {
    user: null,
    token: null
  },
  getters: {
    userName(state) {
      return state.user
    },
    isAuthnticated(state) {
      return !!state.token
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.user
      state.token = payload.token
      localStorage.setItem("user", payload.user)
      localStorage.setItem("token", payload.token)
    },
    CLEAR_USER(state) {
      state.user = null
      state.token = null
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  },
  actions: {
    REGISTER_ACCOUNT(_, payload) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(payload.login, payload.password)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    LOGIN_USER({commit}, payload) {
      firebase
      .auth()
      .signInWithEmailAndPassword(payload.login, payload.password)
      .then(() => {
        commit('SET_USER', {
          user: firebase.auth().currentUser.email,
          token: firebase.auth().currentUser.uid
        })
        payload.vm.$toast.add({severity:'success', summary: 'Success', detail:'Login succesfull', life: 3000}); 
      })
      .then (() => {
        router.push('/menu');
      })
      .catch(err => {
        payload.vm.$toast.add({severity:'error', summary: 'Something went wrong', detail:'Login failed - check your login and email', life: 3000}); 
        console.log(err)
      }) 

    },
    LOGOUT_USER({commit}) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/')
        });
        commit('CLEAR_USER')
    },
    SET_USERNAME({getters}, payload) {
      const db = firebase.firestore();
      db.collection("user_scores")
          .doc(getters.userName)
          .set({
              coins: 0,
              experience: 0,
              highest_score: 0,
              avatar: 'apple',
              nickname: payload.nickname,
              bought_items: [],
              geolocation: ''
          })
          .then(() => {
              console.log("Document successfully written!");
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
    },
    SET_AVATAR({getters, dispatch}, payload) {
      const db = firebase.firestore();
      db.collection("user_scores").doc(getters.userName)
        .update({ 
            avatar: payload.avatar
        })
        .then(() => {
          dispatch('GET_PROFILE_INFO')
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    },
    SAVE_GEOLOCALISATION({getters}, payload) {
      const db = firebase.firestore();
      db.collection("user_scores")
          .doc(getters.userName)
          .update({
              geolocation: `X: ${payload.longitude} Y: ${payload.lattitude}`
          })
          .then(() => {
              console.log("Document successfully written!");
          })
    }
  },
  modules: {
    scores: scores,
    shop: shop
  }
})
