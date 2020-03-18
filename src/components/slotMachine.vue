<template>
  <div>
    <div class="slot-machine">
      {{this.props}}
      <div class="slot" v-for="slot in this.allSlots"  ref='slots' v-bind:key="slot.id">
        <div class="slot-viewport" v-bind:style="[slotViewport]">
          <div class="slot-row">
            <div class="slot-item" v-bind:style="[slotItem]" :class="{[opt] : true}" v-for="opt in slot.items" v-bind:key="opt.id"></div>
            <div class="slot-item slot-item-clone" v-bind:style="[slotItem]" :class="{[opt] : true}" v-for="opt in [...slot.items]" v-bind:key="opt.a"></div>
            <div class="slot-item slot-item-clone" v-bind:style="[slotItem]" :class="{[opt] : true}" v-for="opt in [...slot.items]" v-bind:key="opt.b"></div>
          </div>
        </div>
      </div>
    </div>
    <a class="btn" @click.prevent="start()">GO!</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const next = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60) }
const slotMachine = {
  data () {
    return {
      slotSize: 120,
      baseDuration: 2000,
      timeOffest: 1500,
      opts: null,
      startTime: null
    }
  },
  computed: {
    ...mapGetters(['allSlots']),
    slotViewport () {
      return {
        height: `${this.slotSize * 2}px`
      }
    },
    slotItem () {
      return {
        height: `${this.slotSize}px`
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchSlots')
  },
  methods: {
    start () {
      if (this.opts) {
        return
      }
      this.opts = this.allSlots.map((data, i) => {
        const slotSize = this.slotSize
        const baseDuration = this.baseDuration
        const timeOffest = this.timeOffest
        const slot = this.$refs.slots[i]
        const choice = Math.floor(Math.random() * data.items.length) // select spin middle symbol - get server side info
        const halhLine = Math.random() >= 0.5 // if spin stops on half of line
        const opts = {
          id: i,
          el: slot.querySelector('.slot-row'),
          finalPos: (choice * slotSize) + (halhLine ? slotSize / 2 : 0),
          startOffset: baseDuration + Math.random() * timeOffest + i * timeOffest,
          height: data.items.length * slotSize,
          duration: baseDuration + i * timeOffest, // milliseconds
          halhLine: halhLine,
          isFinished: false
        }
        console.log(`choice: ${i}`, data.items[choice], 'opts:', opts)
        return opts
      })
      next(this.animate)
    },
    animate: function (timestamp) {
      if (this.startTime == null) {
        this.startTime = timestamp
      }
      const timeDiff = timestamp - this.startTime
      this.opts.forEach(opt => {
        if (opt.isFinished) {
          return
        }
        const timeRemaining = Math.max(opt.duration - timeDiff, 0)
        const power = 3
        const offset = (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) * opt.startOffset

        // negative, such that slots move from top to bottom
        const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height)
        opt.el.style.transform = 'translateY(' + pos + 'px)'
        if (timeDiff > opt.duration) {
          console.log('finished', opt, pos, opt.finalPost)
          opt.isFinished = true
        }
      })
      if (this.opts.every(o => o.isFinished)) {
        this.opts = null
        this.startTime = null
        console.log('finished')
      } else {
        next(this.animate)
      }
    }
  }
}

export default {
  name: 'slotMachine',
  ...slotMachine
}
</script>

<style lang="scss">
.slot-machine {
  display: flex;
  width: 80vmin;
  max-width: 550px;
  overflow: hidden;
  position: relative;
  margin: 5vmin auto;

  .slot {
    flex: 1;
    margin: 0 auto;
    background: url('/img/slot-machine-row.png') center center no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('/img/slot-machine-overlay.png') center center no-repeat;
      background-size: 100% 100%;
    }

    .slot-viewport {
      margin: 5px auto;
      width: 100%;
      overflow: hidden;

      .slot-item {
        width: 100%;
        text-align: center;
        background: center center no-repeat;
        background-size: 75% auto;
      }
      .slot-item.bar {
        background-image: url('/img/bar.png');
      }
      .slot-item.bar2 {
        background-image: url('/img/bar2.png');
      }
      .slot-item.bar3 {
        background-image: url('/img/bar3.png');
      }
      .slot-item.cherry {
        background-image: url('/img/cherry.png');
      }
      .slot-item.seven {
        background-image: url('/img/seven.png');
      }
    }
  }
}
</style>
