<template>
    <div class="sidebar" v-bind:style="{backgroundImage: 'url(' + albumpic_big + ')'}">
    </div>
</template>

<script>
export default {
  data () {
    return {
      albumpic_big: '../../../static/img/background/bg3.jpg'
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: absolute;
  width: 250px;
  left: 0;
  top: 0px;
  bottom: 0;
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
  transition: background-position 2s;
  -webkit-transition: background-position 2s; /* Safari */
}
.sidebar:hover {
  background-position: right center;
}
</style>
