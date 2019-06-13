<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <CaesarEncoder/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CaesarEncoder from './components/CaesarEncoder.vue'

  @Component({
    components: {
      CaesarEncoder
    }
  })

export default class App extends Vue {}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
