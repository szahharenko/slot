<template>
  <div class="home">
    <slotMachine />
  </div>
</template>

<script>
import slotMachine from '../components/slotMachine'
export default {
  name: 'Home',
  components: {
    slotMachine
  }
}
</script>
