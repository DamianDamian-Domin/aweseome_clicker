
<template>
  <div class="sprit" :style="{left: `${x_axis}%`,'animation': fruitAnimation}" @mouseover="clickAction()">
      <span class="icon">{{emoji}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        x_axis: null,
        emojis: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉","🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓","❤️","💸","💸","💸","💸","💣","💣","💣","💣"],
        emoji: null,
        time_to_fail: null,
        fruit_speed: null,
        cut_sound: new Audio(require('@/assets/fruit_cut.mp3')),
        bomb_sound: new Audio(require('@/assets/bomb.mp3')),
      }
    },
    props: {
      xAxis: Number,
      spritIcon: Number,
      loseTime: Number,
      fruitSpeed: Number,
      noBombs: Boolean,
      moneyUp: Boolean
    },
    methods: {
      clickAction() {
        if ( this.emoji == "💣") {
          this.bomb_sound.play()
          clearInterval(this.time_to_fail)
          this.$emit('fruit-failed')
        } else if ( this.emoji == "❤️") {
          this.cut_sound.play()
          clearInterval(this.time_to_fail)
          this.$emit('click-action')
          this.$emit('health-up')
        } else if ( this.emoji == "💸") {
          this.cut_sound.play()
          clearInterval(this.time_to_fail)
          this.$emit('click-action')
          this.$emit('money-up') 
        } else {
          this.cut_sound.play()
          clearInterval(this.time_to_fail)
          this.$emit('click-action')
        }   
      }
    },
    computed: {
      fruitAnimation() {
        return `new-item-animation ${this.fruit_speed}s linear forwards infinite`
      }
    },
    beforeMount() {
      if (this.noBombs) {
        this.emojis = this.emojis.slice(0,21)
      }
      if (this.moneyUp) {
        this.emojis.push("💸","💸","💸","💸")
      }
      this.emoji = this.emojis[Math.floor(Math.random()*this.emojis.length)]
    },
    mounted() {
      this.fruit_speed = this.fruitSpeed
      this.time_to_fail = setTimeout(() => {
        if ( this.emoji !== "💣") {
          this.$emit('fruit-failed')
        }
        else {
          this.$emit('click-action')
        }
      }, this.loseTime);
    },
    created() {
      this.x_axis = this.xAxis
      this.emoji = this.emojis[this.spritIcon]
    },
  }
</script>

<style>
.sprit {
  position: relative;
  width: 50px;
  height: 50px;
  top: -2%;
}
.icon {
  font-size: 50px;
  user-select: none;
}
.icon:hover {
  cursor: pointer;
}

@keyframes new-item-animation {
    0% {
        opacity: 0.7;
        transform: translateY(-20vh);
    }
    100% {
        opacity: 1;
        transform : translateY(101vh);
    }
}

</style>