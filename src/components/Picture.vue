<template>
  <div id="picture">
    <div style="place-content: center; display: flex; position: relative;">
      <div id="flash" />
      <canvas id="can" ref="can"></canvas>
      <span v-show="pictureCnt" style="align-self: center; color: #FFF; z-index: 9999; position: absolute; font-size: 3em;">{{pictureCnt}}</span>
      <div v-if="error" id="error">
        {{error}}. Please contact board@makeitlabs.com
      </div>
    </div>
    <video autoplay ref="vid" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gsap from 'gsap';

@Component
export default class Picture extends Vue{
  $refs!: {
    vid: HTMLVideoElement;
    can: HTMLCanvasElement;
  }

  pictureCnt = 3;
  vid?: HTMLVideoElement;
  ctx?: CanvasRenderingContext2D;
  req?: any;
  interval?: any;
  localStream?: MediaStream;
  error = "";

  mounted(){
    this.vid = this.$refs.vid;
    const can = this.$refs.can;
      can.width = 500;
      can.height = 500;

    this.ctx = can.getContext('2d');

    navigator.mediaDevices.getUserMedia({video: {width: 500, height: 500}})
    .then((stream) => {
      this.localStream = stream;
      this.vid.srcObject = stream;

      this.interval = setInterval(()=>{
        if(this.pictureCnt > 0){
          this.pictureCnt --;
        } else {
          this.takePicture();
        }
      }, 1000);

      this.req = this.update();
    })
    .catch((error: Error) => {
      this.error = error.message;
      this.$emit('handleError');
    });

  }

  private update() {
    this.ctx.drawImage(this.vid, 0, 0);

    this.req = window.requestAnimationFrame(this.update);
  }

  private takePicture(){
    this.vid.pause();
    document.getElementById('flash').style.opacity = '1';
    gsap.to("#flash", .3, {opacity: 0});
    clearInterval(this.interval);
    window.cancelAnimationFrame(this.req);
    setTimeout(()=>{
      this.$emit('pictureTaken');
    }, 3000);
  }

  beforeDestroy(){
    this.vid.src = "";
    if(this.localStream){
      this.localStream.getTracks()[0].stop();
    }
  }

}
</script>
<style>


video{
  display: none;
  }

#picture{
  position: absolute;
  display: flex;
  /* flex-flow: column; */
  align-items: center;
  justify-content: center;
  place-content: center;
  top: 92px;
  color:#000;
  width: 100%;
  height: 100%;
}
#can{
  position: relative;
}
#flash{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:#FFF;
  z-index: 9999;
  opacity: 0;
}
#error{
  position: absolute;
  background-color:#F00;
  color:#FFF;
  width: 100%;
  padding: 10px;
  text-align: center;
  top: 40px;
}
</style>

