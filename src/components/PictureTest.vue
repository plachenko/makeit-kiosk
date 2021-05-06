<template>
  <div id="picture">
    <canvas ref="can" v-for="(can,idx) in 2" :key="'can'+idx" width="640" height="640" />
    <video ref="vid" v-for="(vid,idx) in 2" :key="'v'+idx" width="500" height="500" playsinline autoplay />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PictureTest extends Vue{
  $refs!: {
    vid: HTMLVideoElement[];
    can: HTMLCanvasElement[];
  }

  vid?: HTMLVideoElement[];
  ctx?: CanvasRenderingContext2D[] = [];
  can?: HTMLCanvasElement[];

  localStreams?: MediaStream[] = [];

  devices: string[] = [];
  deviceIdx: number[] = [];
  pictures: string[] = [];
  pictureTaken = false;
  req?: any;

  mounted(){
    this.vid = this.$refs.vid;
    this.can = this.$refs.can;

    this.can.forEach((canEl: HTMLCanvasElement) =>{
      this.ctx.push(canEl.getContext('2d'));
    })

    navigator.mediaDevices.enumerateDevices()
    .then((devices) =>{
      devices.forEach((device, idx) => {
        const exists = this.devices.some(_device => device.deviceId == _device);
        if(device.kind == "videoinput" && !exists){
          this.devices.push(device.deviceId);
          this.setVideo(device.deviceId, idx);
        }
      })
    })
    .catch((error) => {
      console.log(error.name, error.message);
    })
  }

  private update() {
    this.ctx[0]?.drawImage(this.vid[0], 0, 0, this.vid[0].videoWidth, this.vid[0].videoHeight, 0, 0, 640, 640);
    this.ctx[1]?.drawImage(this.vid[1], 0, 0, this.vid[1].videoWidth, this.vid[1].videoHeight, 0, 0, 640, 640);

    this.req = window.requestAnimationFrame(this.update);
  }

  private setVideo(id: string, idx: number){
    navigator.mediaDevices.getUserMedia({video: {deviceId: id ? {exact: id} : undefined, width: 640, height: 640}})
    .then((stream) => {
      this.localStreams.push(stream);
      this.vid[idx].srcObject = stream;
      this.req = this.update();
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  public takePicture(){
    if(!this.pictureTaken){
      this.vid[0].pause();
      this.vid[1].pause();

      this.pictureTaken = true;

      this.localStreams[0].getTracks()[0].stop();
      this.localStreams[1].getTracks()[0].stop();

      this.pictures.push(this.can[0].toDataURL('image/jpeg'));
      this.pictures.push(this.can[1].toDataURL('image/jpeg'));

      this.$emit('pictureTaken', this.pictures);

      // this.deviceIdx--;
      setTimeout(()=>{
        // this.pictureCnt = 5;
        // clearInterval(this.interval);
        this.pictureTaken = false;
      }, 400);
      // this.setVideo(this.devices[this.deviceIdx], 0);
      // this.setVideo(this.devices[this.deviceIdx], 1);
      this.vid[0].play();
      this.vid[1].play();
      /*
      if(this.deviceIdx >= 0){


      }else{
        window.cancelAnimationFrame(this.req);
        setTimeout(()=>{
          this.$emit('pictureTaken', this.pictures);
        }, 3000);
      }
      */
    }
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
  canvas{
    margin: 5px;
  }
  video{
    transform: scaleX(-1);
    display: none;
    }

  #picture{
    position: absolute;
    display: flex;

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
