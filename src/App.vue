<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      style: ''
    }
  }
}
</script>

<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css";
</style>
