<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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

a.btn {
  cursor: pointer;
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
}
</style>
