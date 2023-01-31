<template>
  <div class="app-container"> 
  <div v-if="!show_endgame" class="counter" :class="{ show_plus_score: score_plus, show_minus_score: score_minus }">score: {{counter}}</div>
  <div v-if="!show_endgame" class="counter">Lifes left: ❤️{{lifes}}</div>
  <div class="playground">
      <div v-for="sprit in 6" :key="sprit">
        <SpritItem v-if="active_sprits[sprit]"
        :xAxis="generateX()"
        :loseTime="speed * 1000"
        :fruitSpeed="speed"
        :moneyUp="money_up"
        :noBombs="no_bombs"
        @healthUp="healthUp()"
        @moneyUp="moneyUp()"
        @clickAction="resetSprit(sprit)"
        @fruitFailed="fruitFailed(sprit)"
        @dragstart.prevent
        >
        </SpritItem>
      </div>
  </div>
  <div class="endgame" v-if="show_endgame">
      <div class="buttons-wrapper">
          <div> End of lifes </div>
          <div> Your score: <span style="color: orange"> {{counter}} </span> </div>
          <div> Money gained: <span style="color: green"> {{coins}} </span> </div>
          <Button @click="routerTo('/menu')" label="Back to main menu" class="p-button-outlined p-button-rounded p-button-success" />
      </div>
  </div>

  </div>
</template>

<script>

import SpritItem from '@/components/SpritItem.vue'
import Button from 'primevue/button';
export default {
  name: 'HomeView',
  components: {
    SpritItem,
    Button
  },
  data() {
    return {
      counter: 0,
      show_sprit: true,
      timeleft: 50,
      show_endgame: false,
      active_sprits: [true, true, true, true, true, true],
      score_plus: false,
      score_minus: false,
      lifes: 5,
      coins: 0,
      speed: 5,
      speed_flag: 0,
      money_up: false,
      no_bombs: false
    }
  },
  methods: {
    resetSprit(count) {
      this.active_sprits[count] = false
      if (!this.show_endgame) {
        this.counter++
        navigator.vibrate(100);
      }
      this.$nextTick(() => {
        this.active_sprits[count] = true
      })
    },
    fruitFailed(count) {
      this.lifes -= 1
      this.active_sprits[count] = false
      this.$nextTick(() => {
        this.active_sprits[count] = true
      })
    },
    healthUp() {
      this.lifes++
    },
    moneyUp() {
      this.coins++
    },
    generateX() {
      return Math.floor(Math.random() * 70)
    },
    saveScore() {
      this.$store.dispatch('SAVE_SCORE', {score: this.counter, coins: this.coins})
    },
    routerTo(to) {
      this.$router.push(to)
    }
  },
  beforeMount() {
    for (const boost of this.$store.getters.boughtItems) {
        if (boost === 'lifes_up') {
            this.lifes += 3
            this.$store.dispatch('REMOVE_ITEM', {item: 'lifes_up'})
        } else if (boost === 'money_up') {
            this.money_up = true
            this.$store.dispatch('REMOVE_ITEM', {item: 'money_up'})
        } else if (boost === 'no_bombs') {
            this.no_bombs = true
            this.$store.dispatch('REMOVE_ITEM', {item: 'no_bombs'})
        }
    }
  },
  mounted() {
      var downloadTimer = setInterval(() => {
        if (this.timeleft === 0){
          clearInterval(downloadTimer);
        }
        else {
          this.timeleft -= 1;
        }
      }, 1000);
  },
  watch: {
    lifes(newValue) {
      if (newValue === 0) {
        this.show_endgame = true
        this.saveScore()
      }
    },
    counter(newValue, oldValue) {
      if (newValue > oldValue) {
        if (this.speed > 2) {
        this.speed_flag++
        }
        if (this.speed_flag === 10) {
          this.speed -= 0.2
          this.speed_flag = 0
        }
        this.score_plus = true
        setTimeout(() => {
          this.score_plus = false
        }, 300);
      } else if ( oldValue > newValue ) {
        this.score_minus = true
        setTimeout(() => {
          this.score_minus = false
        }, 300);
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.counter{
  color: white;
  font-size: 5rem;
  margin-bottom: 5rem;
}
.playground {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.endgame {
  position: absolute;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.185);
  font-size: 2.5rem;
}
.buttons-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.show_plus_score {
  animation: score_plus .3s ease;
}
.show_minus_score {
  animation: score_minus .3s ease;
}
.counter {
  font-size: 3rem;
}
@media (max-width: 600px) {
  .counter {
    font-size: 2rem;
  }
}
@keyframes score_plus {
  0% {
    color: inherit;
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    color: rgb(1, 155, 1);
    transform: scale(1);
  }
}
@keyframes score_minus {
  0% {
    color: inherit;
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    color: rgb(158, 0, 0);
    transform: scale(1);
  }
}

</style>
