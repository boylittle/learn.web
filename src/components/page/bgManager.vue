<template>
    <div>
        <div id="buttonPage">
            <el-button type="primary" @click="rotatePicture()" round>图片切换</el-button>
            <el-button type="primary" @click="reduceVague()" round>图片模糊减轻</el-button>
            <el-button type="primary" @click="addVague()" round>图片模糊加重</el-button>
        </div>
        <div id="playPage" class="blur" v-bind:style="{backgroundImage: 'url(' + albumpic_big + ')', filter: 'blur(' + vague + 'px)'}">
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
        albumpic_big:"../../../static/img/background/bg3.jpg",
        vague: 5,
        bgList: [
            "../../../static/img/background/bg1.jpg",
            "../../../static/img/background/bg2.jpg",
            "../../../static/img/background/bg3.jpg"
        ]
    }
  },
  methods: {
    rotatePicture () {
        this.albumpic_big = this.bgList[Math.floor(Math.random()*this.bgList.length)];
    },
    reduceVague () {
        this.vague = this.vague - 1
    },
    addVague () {
        console.log(this.value7)
        this.vague = this.vague + 1
    }
  }
}
</script>

<style>
    #playPage{
        width: 100%;
        height: 90%;
        position: relative;
    }
    #playPage.blur{
        position: absolute;
        top: 10%;
        left: 0;
        background-size:cover;
    }
</style>
