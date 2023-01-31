<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  
  created() {
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    if (user && token) {
      this.$store.commit('SET_USER', {
        user: user,
        token: token
      })
    }
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
body {
  margin: 0;
}
.app {
  font-family: 'Shadows Into Light', cursive;
  min-height: 100vh;
  width: 100%;
  font-size: clamp(2rem,4vw,4rem);
  background: rgb(29,29,29);
  background: linear-gradient(360deg, rgba(180, 180, 180, 0.767891) 0.01%, rgba(255, 255, 255, 0) 0.02%, rgba(164, 164, 164, 0.521475) 0.03%, rgba(121, 121, 121, 0.317708) 0.04%, #A292D0 0.05%, rgba(205, 148, 148, 0.972454) 99.94%, rgba(174, 173, 175, 0.720504) 99.95%, rgba(97, 97, 97, 0.59) 99.96%, #817E89 99.97%);
}
</style>
