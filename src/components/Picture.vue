<template>
  <div id="picture">
    <div v-if="deviceIdx == 1" style="position: absolute; top: -100px;">
      <span style="display: inline-block; width: 80px; text-align: center;font-size: 4em;">&#8593;</span>
      <br />
      <span>Look Here</span>
    </div>
    <div v-if="deviceIdx == 0" style="position: absolute; left: 10px; top: -50px;">
      <span style="display: inline-block; width: 80px; text-align: center;font-size: 4em;">&#8598;</span>
      <br />
      <span>Now Look Here</span>
    </div>
    <div style="place-content: center; display: flex; position: relative; margin-top: -100px">
      <div id="flash" />
      <canvas id="can" ref="can"></canvas>
      <span v-show="!pictureTaken" style="align-self: center; text-align: center; color: #FFF; z-index: 9999; position: absolute; font-size: 3em; background-color:rgba(0,0,0,.4); padding: 10px;">Press any foot button to take a picture</span>
      <div v-if="error" id="error">
        {{error}}. Please contact board@makeitlabs.com
      </div>
    </div>
    <video width="500" height="500" playsinline autoplay ref="vid" />
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
  pictureCnt = 5;
  vid?: HTMLVideoElement;
  ctx?: CanvasRenderingContext2D;
  can?: HTMLCanvasElement;
  req?: any;
  interval?: any;
  localStream?: MediaStream;
  error = "";
  devices: string[] = [];
  deviceIdx = 1;
  pictures: string[] = [];
  pictureTaken = false;
  bCanTakePicture = false;

  mounted(){
    this.vid = this.$refs.vid;
    this.can = this.$refs.can;
    this.can.width = 640;
    this.can.height = 640;
    this.ctx = this.can.getContext('2d');
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        const exists = this.devices.some(_device => device.deviceId == _device);
        if(device.kind == "videoinput" && !exists){
          this.devices.push(device.deviceId);
        }
      })
    })
    .then(() => {
      this.setVideo(this.devices[this.deviceIdx]);
    })
    .catch((error) => {
      console.log(error.name, error.message);
    })

    document.addEventListener('keyup', (e) => {
      if(this.bCanTakePicture){
        this.bCanTakePicture = false;
        this.takePicture();
      }
    })
  }

  private setVideo(id: string){
    navigator.mediaDevices.getUserMedia({video: {deviceId: id ? {exact: id} : undefined, width: 640, height: 640}})
    .then((stream) => {
      this.localStream = stream;
      this.vid.srcObject = stream;
      /*
      setTimeout(() => {
        this.interval = setInterval(()=>{
          if(this.pictureCnt > 0){
            this.pictureCnt --;
          } else {
            this.takePicture();
          }
        }, 1000);
      }, 4000);
      */
      this.bCanTakePicture = true;
      this.req = this.update();
    })
    .catch((error: Error) => {
      this.error = "Webcam not found";
      this.$emit('handleError');
    });
  }

  private update() {
    this.ctx.drawImage(this.vid, 0, 0, this.vid.videoWidth, this.vid.videoHeight, 0, 0, 640, 640);
    this.req = window.requestAnimationFrame(this.update);
  }

  private takePicture(){
    if(!this.pictureTaken){
      this.vid.pause();
      this.flash();
      this.pictureTaken = true;
      this.pictures.push(this.can.toDataURL('image/jpeg'));
      if(this.deviceIdx > 0){
        this.localStream.getTracks()[0].stop();
        this.deviceIdx--;
        setTimeout(()=>{
          this.pictureCnt = 5;
          // clearInterval(this.interval);
          this.pictureTaken = false;
        }, 400);
        this.setVideo(this.devices[this.deviceIdx]);
        this.vid.play();
      }else{
        window.cancelAnimationFrame(this.req);
        setTimeout(()=>{
          this.$emit('pictureTaken', this.pictures);
        }, 3000);
      }
    }
  }

  private flash(){
    document.getElementById('flash').style.opacity = '1';
    gsap.to("#flash", .3, {opacity: 0});
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
  transform: scaleX(-1);
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
