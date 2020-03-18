<template>
  <div class="pay-table">
      <h3>Payouts</h3>
      <div class="payout">
        <div class="reward" v-for="reward in this.payTables" v-bind:key="reward.id">
            <div v-if="reward.type == 'line'">
                 <strong>{{reward.count}}</strong>
                 <span class="icon" :class="[item]" v-for="item in reward.items" v-bind:key="item">
                     {{item}}
                 </span> you get:
                 <div v-if="reward.lines == 'any'">
                    <span class="coin tiny"></span> {{reward.reward}} any line
                 </div>
                 <div v-else v-for="l in reward.lines" v-bind:key="l.line">
                     <span class="coin tiny"></span>  {{l.reward}} {{lineName(l.line)}} line
                 </div>
            </div>
            <div v-else>
                <strong>{{reward.count}}</strong>
                 <span class="icon" :class="[item]" v-for="item in reward.items" v-bind:key="item">
                     {{item}}
                 </span>
                 anywhere you get <span class="coin tiny"></span>  {{reward.reward}}
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      lineNames: {
        0: 'top',
        1: 'middle',
        2: 'bottom'
      }
    }
  },
  methods: {
    lineName (i) {
      return this.lineNames[i]
    }
  },
  computed: mapGetters(['payTables']),
  mounted () {
    this.$store.dispatch('fetchPayTable')
  }
}
</script>
<style lang="scss" scoped>
    .icon {
        display:inline-block;
        width: 20px;
        height: 20px;
        font-size: 0;
        position:relative;
        overflow: hidden;
        vertical-align: middle;
        background: center center no-repeat;
        background-size: contain;

        &.bar {
            background-image: url('/img/bar.png');
        }
        &.bar2 {
            background-image: url('/img/bar2.png');
        }
        &.bar3 {
            background-image: url('/img/bar3.png');
        }
        &.cherry {
            background-image: url('/img/cherry.png');
        }
        &.seven {
            background-image: url('/img/seven.png');
        }
    }

    .reward {margin-top:15px;}
</style>
