<template>
  <div>
    <div class="slot-machine">
      <div class="slot" v-for="slot in this.allSlots"  ref="slots" v-bind:key="slot.id">
        <div class="slot-viewport" v-bind:style="[slotViewport]">
          <div class="slot-row">
            <div class="slot-item" v-bind:style="[slotItem]" :class="{[opt] : true}" v-for="opt in slot.items" v-bind:key="opt.id"></div>
            <div class="slot-item slot-item-clone" v-bind:style="[slotItem]" :class="{[opt] : true}" v-for="opt in [...slot.items]" v-bind:key="opt.a"></div>
            <div class="slot-item slot-item-clone" v-bind:style="[slotItem]" :class="{[opt] : true}" v-for="opt in [...slot.items]" v-bind:key="opt.b"></div>
          </div>
        </div>
      </div>
    </div>
    <span v-if="this.currentBalance > 0">
      <a class="btn" @click.prevent="start()">GO!</a>
      <span class="current-balance">
        <span class="coin medium"></span>
        <animated-number
          :round="1"
          :value="this.currentBalance"
          :duration="500"
        />
      </span>
    </span>
    <span v-else>
      <a class="btn" @click.prevent="changeBallance(10,'buy button')">Buy 10 <span class="coin small"></span></a>
    </span>
    <div class="app-details">
      <PayTable/>
      <div>
          <h3>Debug and log</h3>
          <a class="btn small light" @click.prevent="changeBallance(10, 'add button')">Add 10 <span class="coin tiny"></span></a>
          <a class="btn small light" @click.prevent="changeBallance(-10, 'add button')">Spent 10 <span class="coin tiny"></span></a>
          <br/><br/>
          <h3>Custom result</h3>
          <div class="debug">
            <div>
              <label>Column 1</label>
              <select v-model="debug.slot[0]">
                <option value="">symbol</option>
                <option v-for="item in this.symobList" :value="[item]" v-bind:key="item">{{item}}</option>
              </select>
              <select v-model="debug.line[0]">
                <option value="">line</option>
                <option v-for="n in 3" :value="[n]" v-bind:key="n">{{n+10}}</option>
              </select>
            </div>
            <div>
              <label>Column 2</label>
              <select v-model="debug.slot[1]">
                <option value="">symbol</option>
                <option v-for="item in this.symobList" :value="[item]" v-bind:key="item">{{item}}</option>
              </select>
              <select v-model="debug.line[1]" >
                <option value="">line</option>
                <option v-for="n in 3" :value="[n]" v-bind:key="n">{{n+20}}</option>
              </select>
            </div>
            <div>
              <label>Column 3</label>
              <select v-model="debug.slot[2]">
                <option value="">symbol</option>
                <option v-for="item in this.symobList" :value="[item]" v-bind:key="item">{{item}}</option>
              </select>
              <select v-model="debug.line[2]">
                <option value="">line</option>
                <option v-for="n in 3" :value="[n]" v-bind:key="n+30">{{n}}</option>
              </select>
            </div>
          </div>
          <h3>Balance changes</h3>
          <div v-for="bc in this.balanceRecords.records" v-bind:key="bc.id">
            <strong>{{bc.type}} :</strong>  <span class="coin tiny"></span> {{bc.changes}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AnimatedNumber from 'animated-number-vue'
import PayTable from './payTable'

const next = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) { window.setTimeout(cb, 1000 / 60) }
const slotMachine = {
  data () {
    return {
      debug: {
        line: ['', '', ''],
        slot: ['', '', '']
      },
      slotSize: 120,
      baseDuration: 1000,
      timeOffest: 250,
      opts: null,
      startTime: null
    }
  },
  computed: {
    ...mapGetters(['allSlots', 'payTables', 'currentBalance', 'balanceRecords']),
    symobList () {
      const list = this.allSlots[0]
      return list ? list.items : []
    },
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
    this.$store.dispatch('fetcBalance')
  },
  methods: {
    changeBallance (val, description = 'ballance change') {
      this.$store.dispatch('changeBalance', { diff: val, type: description })
    },
    start () {
      if (this.opts || this.currentBalance < 1) {
        return
      }
      this.$store.dispatch('changeBalance', { diff: -1, type: 'press button' })
      this.opts = this.allSlots.map((data, i) => {
        const slotSize = this.slotSize
        const baseDuration = this.baseDuration
        const timeOffest = this.timeOffest
        const slot = this.$refs.slots[i]
        let choice = Math.floor(Math.random() * data.items.length) // select spin middle symbol - get server side info
        let halhLine = Math.random() >= 0.5 // if spin stops on half of line
        // DEBUG output
        const force = this.debug.slot[i]
        const forceLine = this.debug.line[i] || 1
        if (force) {
          choice = data.items.indexOf(force[0])
          switch (forceLine[0]) {
            case 2:
              halhLine = true
              break
            case 3:
              halhLine = false
              choice = choice - 1
              break
            default:
              halhLine = false
              break
          }
          if (choice < 0) choice = data.items.length - 1
        }
        const opts = {
          id: i,
          el: slot.querySelector('.slot-row'),
          finalPos: (choice * slotSize) - (halhLine ? slotSize / 2 : 0) + (data.items.length * slotSize),
          startOffset: baseDuration + Math.random() * timeOffest + i * timeOffest,
          height: data.items.length * slotSize,
          duration: baseDuration + i * timeOffest, // milliseconds
          items: data.items,
          choice: choice,
          halhLine: halhLine,
          isFinished: false
        }
        return opts
      })
      next(this.animate)
    },
    animate (timestamp) {
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
          opt.isFinished = true
        }
      })
      if (this.opts.every(o => o.isFinished)) {
        this.checkPayTable(this.opts)
        this.opts = null
        this.startTime = null
      } else {
        next(this.animate)
      }
    },
    checkPayTable (opts) {
      const payTotals = this.payTables.filter((v) => v.type === 'total') // payout only for total symbols
      const payLines = this.payTables.filter((v) => v.type === 'line') // payout only for lines matches
      // Creating result lines
      const result = [[], [], []]
      opts.forEach(opt => {
        const a = opt.items[opt.choice]
        const b = opt.items[opt.choice + 1] || opt.items[0]
        // const c = opt.items[opt.choice - 1] || opt.items[opt.items.length - 1]
        result[0].push(opt.halhLine ? false : a)
        result[1].push(opt.halhLine ? a : false)
        result[2].push(opt.halhLine ? false : b)
      })
      // Go throught results
      result.forEach((resultLine, index) => {
        const fullLine = resultLine.filter((v) => v !== false).length === 3
        if (fullLine) {
          payLines.forEach(payout => {
            const matches = resultLine.filter((symbol) => payout.items.indexOf(symbol) !== -1) // filter only matching symbols
            const reward = payout.reward || payout.lines[index].reward // total reward
            const message = payout.count + ': ' + payout.items.join(',') // payout message
            if (matches.length === 3) { // if all 3 match win condition
              this.changeBallance(reward, message) // add coins
              resultLine = resultLine.map(() => false) // cleanup not to score twice
            }
          })
        }
      })
      // Checking total count rewards
      const allSymbols = [...result[0], ...result[1], ...result[2]]
      payTotals.forEach(payout => {
        const matches = allSymbols.filter((symbol) => payout.items.indexOf(symbol) !== -1) // filter only matching symbols
        const reward = payout.reward
        const message = payout.count + ': ' + payout.items.join(',') // payout message
        if (matches.length === 3) { // if all 3 match win condition
          this.changeBallance(reward, message) // add coins
        }
      })
    }
  }
}

export default {
  name: 'slotMachine',
  components: {
    PayTable,
    AnimatedNumber
  },
  ...slotMachine
}
</script>

<style lang="scss" scoped>
.app-details {
  margin: 5vmin auto;
  text-align: left;
  display: flex;
  width: 80vmin;
  max-width: 550px;
  & > div {
    flex: 1;
    width: 50%;
  }
}
.slot-machine {
  display: flex;
  width: 80vmin;
  max-width: 550px;
  overflow: hidden;
  position: relative;
  margin: 5vmin auto;
  border: solid 6px #000000;
  background: #000000;
  border-radius: 9px;
  border-right-width: 3px;
  border-left-width: 3px;
  box-shadow: 8px 8px 0px 0px #042e282e, 0px 0px 20px 0px #bbb;

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
.current-balance {margin: 0 20px;}
</style>
