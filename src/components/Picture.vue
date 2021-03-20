<template>
  <div id="picture">
    <!--
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
    -->
    <!--
    <div style="place-content: center; display: flex; position: relative;">
      <div id="flash" />
      <div id="photoContainer">
      </div>
      <canvas width="640" height="640" v-for="(can,idx) in 2" :key="idx" ref="can"></canvas>
      <span v-show="!pictureTaken" style="align-self: center; text-align: center; color: #FFF; z-index: 9999; position: absolute; font-size: 3em; background-color:rgba(0,0,0,.4); padding: 10px;">Press any foot button to take a picture</span>
      <div v-if="error" id="error">
        {{error}}. Please contact board@makeitlabs.com
      </div>
    </div>
    <video width="500" height="500" v-for="(can,idx) in 2" :key="idx" playsinline autoplay ref="vid" />
    -->
    <canvas ref="can" v-for="(can,idx) in 2" :key="'can'+idx" width="640" height="640" />
    <video ref="vid" v-for="(vid,idx) in 2" :key="'v'+idx" width="500" height="500" playsinline autoplay />

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gsap from 'gsap';
@Component
export default class Picture extends Vue{
  $refs!: {
    vid: HTMLVideoElement[];
    can: HTMLCanvasElement[];
  }
  pictureCnt = 5;
  vid?: HTMLVideoElement[];
  ctx?: CanvasRenderingContext2D[] = [];
  can?: HTMLCanvasElement[];
  req?: any;
  interval?: any;
  localStreams?: MediaStream[] = [];
  error = "";
  devices: string[] = [];
  deviceIdx = 1;
  pictures: string[] = [];
  pictureTaken = false;
  bCanTakePicture = false;

  mounted(){
    this.vid = this.$refs.vid;
    this.can = this.$refs.can;

    this.can.forEach((canEl: HTMLCanvasElement) =>{
      this.ctx.push(canEl.getContext('2d'));
    })
    setTimeout(()=>{
      navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device, idx) => {
          const exists = this.devices.some(_device => device.deviceId == _device);
          if(device.kind == "videoinput" && !exists){
            this.devices.push(device.deviceId);
            this.setVideo(device.deviceId, idx);
          }
        })
      })
      .then(() => {
        // this.setVideo(this.devices[this.deviceIdx]);
      })
      .catch((error) => {
        console.log(error.name, error.message);
      })
    }, 3000)

    // document.addEventListener('keyup', (e) => {
    //   if(this.bCanTakePicture){
    //     this.bCanTakePicture = false;
    //     this.takePicture();
    //   }
    // })
  }

  private setVideo(id: string, idx: number){
    navigator.mediaDevices.getUserMedia({video: {deviceId: id ? {exact: id} : undefined, width: 640, height: 640}})
    .then((stream) => {
      this.localStreams.push(stream);
      this.vid[idx-1].srcObject = stream;
      console.log(this.vid[idx-1], stream)
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
    this.ctx[0].drawImage(this.vid[0], 0, 0, this.vid[0].videoWidth, this.vid[0].videoHeight, 0, 0, 640, 640);
    this.ctx[1].drawImage(this.vid[1], 0, 0, this.vid[1].videoWidth, this.vid[1].videoHeight, 0, 0, 640, 640);

    this.req = window.requestAnimationFrame(this.update);
  }

  public takePicture(){
    if(!this.pictureTaken){
      this.vid[0].pause();
      this.vid[1].pause();
      // this.flash();
      this.pictureTaken = true;
      if(this.deviceIdx >= 0){
        // this.localStream.getTracks()[0].stop();
        // this.localStream.getTracks()[1].stop();
        this.pictures.push(this.can[0].toDataURL('image/jpeg'));
        this.pictures.push(this.can[1].toDataURL('image/jpeg'));
        this.$emit('pictureTaken', this.pictures);

        this.deviceIdx--;
        setTimeout(()=>{
          this.pictureCnt = 5;
          // clearInterval(this.interval);
          this.pictureTaken = false;
        }, 400);
        this.setVideo(this.devices[this.deviceIdx], 0);
        this.setVideo(this.devices[this.deviceIdx], 1);
        this.vid[0].play();
        this.vid[1].play();

      }else{
        window.cancelAnimationFrame(this.req);
        setTimeout(()=>{
          this.$emit('pictureTaken', this.pictures);
        }, 3000);
      }
    }
  }

  private flash(){
    // document.getElementById('flash').style.opacity = '1';
    // gsap.to("#flash", .3, {opacity: 0});
  }

  beforeDestroy(){
    this.vid[0].src = "";
    this.vid[1].src = "";
    if(this.localStreams.length){
      this.localStreams[0].getTracks()[0].stop();
      this.localStreams[1].getTracks()[0].stop();
    }
  }
}
</script>
<style>
video{
  transform: scaleX(-1);
  /* display: none; */
  }
#picture{
  position: absolute;
  display: flex;
  /* flex-flow: column; */
  justify-content: center;
  top: 92px;
  color:#000;
  width: 50%;
  height: 50%;
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
