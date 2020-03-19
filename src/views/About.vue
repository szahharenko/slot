<template>
  <div class="about">
    <h1>Test assigment details</h1>
    <p>This project developed using VUE.js</p>
    <h2>Data</h2>
    <p
      >Reel and payout details are loaded as JSON, as a part of integration with backend.
      <br/> All data is stored using <strong>VUEX</strong></p>
    <ul>
      <li>Reel data examle <a target="_blank"  href="https://dev.code-essence.eu/json/slots/">JSON</a></li>
      <li>Payout data examle <a target="_blank" href="https://dev.code-essence.eu/json/slots/?fetch=paytable">JSON</a></li>
      <li>Balance data is simpy VUEX storage instance</li>
    </ul>
    <h2>For fun</h2>
    <ul>
      <li>Some css animation</li>
      <li>Some sprite animation</li>
      <li>Vue routing for Notes page</li>
    </ul>
    <h2>Source code:</h2>
    <a href="https://github.com/szahharenko/slot" target="_blank">https://github.com/szahharenko/slot</a>
    <h2>Lates build demo</h2>
    <a href="https://slot.code-essence.eu/" target="_blank">https://slot.code-essence.eu/</a>
  </div>
</template>
<style lang="scss" scoped>
  .about {
    margin: 0 auto;
    width: 80%;
    max-width: 550px;
    text-align: left;
  }
</style>
