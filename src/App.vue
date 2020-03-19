<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Play</router-link> |
      <router-link to="/about">Notes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #08554b;
    }
  }
}

.btn {
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  top:0;
  height: 40px;
  position: relative;
  padding: 16px 50px;
  font-size: 150%;
  border-radius: 10px;
  transition: all 0.2s;
  color: white;
  background: #08554b;
  box-shadow: 0px 8px 0px 0px #042e28, 0px 0px 20px 0px #bbb;
  &:active {
    top:13px;
    box-shadow: 0px 4px 0px 0px #042e28;
  }
  &.small {
    height: 20px;
    position: relative;
    padding: 8px 20px;
    font-size: 80%;
    border-radius: 5px;
    box-shadow: 0px 4px 0px 0px #042e28, 0px 0px 10px 0px #bbb;
    &:active {
      top:6px;
      box-shadow: 0px 2px 0px 0px #042e28;
    }
  }
  &.light {
    background: #98c3be;
    color: #042e28;
    box-shadow: 0px 8px 0px 0px #709490, 0px 0px 20px 0px #bbb;
  }
  &.light.small {
    box-shadow: 0px 4px 0px 0px #709490, 0px 0px 10px 0px #bbb;
  }
  .coin {
    margin-left: 0;
  }
}
.btn + .btn {margin: 0 7px;}
.current-balance {
  color: goldenrod;
  font-size: 120%;
  font-weight: bold;
}
.coin {
    width: 170px;
    height: 170px;
    display:inline-block;
    position:relative;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 20px;
  &::before {
    content:'';
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    padding-left: 600%;
    background-image:url(/img/coin-sprite.png);
    background-size: 100% auto;
    -webkit-animation: coin .6s steps(6) infinite;
       -moz-animation: coin .6s steps(6) infinite;
        -ms-animation: coin .6s steps(6) infinite;
         -o-animation: coin .6s steps(6) infinite;
            animation: coin .6s steps(6) infinite;
  }
  &.large {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
  &.medium {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
  &.small {
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
  &.tiny {
    width: 12px;
    height: 12px;
    vertical-align: baseline;
    margin-right: 0;
  }
}
@-webkit-keyframes coin {from {left: 0%;} to {left: -600%; }}
@-moz-keyframes coin {from {left: 0%;} to {left: -600%; }}
@-ms-keyframes coin {from {left: 0%;} to {left: -600%; }}
@-o-keyframes coin {from {left: 0%;} to {left: -600%; }}
@keyframes coin {from {left: 0%;} to {left: -600%; }}

</style>
