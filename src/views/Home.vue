<template>
  <div class="home">
    <slotMachine />
  </div>
</template>

<script>
// @ is an alias to /src
import slotMachine from '../components/slotMachine'

export default {
  name: 'Home',
  components: {
    slotMachine
  }
}
</script>
