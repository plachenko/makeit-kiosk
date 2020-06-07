<template>
  <div id="picture">
    <canvas v-for="(i, idx) in 2" :key="idx" ref="can"></canvas>
    <video autoplay ref="vid" />
    <span>{{pictureCnt}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class Picture extends Vue{
  $refs!: {
    vid: HTMLVideoElement;
    can: HTMLCanvasElement;
  }

  pictureCnt = 2;
  vid?: HTMLVideoElement;
  ctx?: CanvasRenderingContext2D;

  mounted(){
    this.vid = this.$refs.vid;
    const can = this.$refs.can;
      can.width = 400;
      can.height = 400;
    this.ctx = can.getContext('2d');

    navigator.mediaDevices.getUserMedia({video: {width: window.innerWidth, height: window.innerHeight}})
    .then((stream) => {
      this.vid.srcObject = stream;

      this.update();
      setInterval(() => {
        this.pictureCnt --;
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  private update() {
    this.ctx.drawImage(this.vid, 0, 0);

    window.requestAnimationFrame(this.update);
  }

}
</script>
<style>
#picture{
  position: absolute;
  display: flex;
  /* flex-flow: column; */
  align-items: center;
  justify-content: center;
  place-content: center;
  top: 92px;
  background-color:#F00;
  color:#FFF;
  width: 100%;
  height: 100%;
}

</style>

