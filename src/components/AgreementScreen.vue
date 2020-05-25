<template>
  <div id="Agreement">
    <div id="AgreementTxt">
      <h1>MakeIt Labs Agreement</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur vero rem voluptatum ipsam. Nesciunt at, delectus aliquid reprehenderit hic ex perferendis, animi aliquam dolorem tempora, asperiores qui natus ipsum!
        Lorem ipsum dolor sit amet reprehenderit
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur vero rem voluptatum ipsam. Nesciunt at, delectus aliquid reprehenderit hic ex perferendis, animi aliquam dolorem tempora, asperiores qui natus ipsum!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur vero rem voluptatum ipsam. Nesciunt at, delectus aliquid reprehenderit hic ex perferendis, animi aliquam dolorem tempora, asperiores qui natus ipsum!
      </p>
      <p>
        Have fun!
      </p>
    </div>


    <div id="Slider">
      <div id="Slide"></div>
      <div id="OK" @click="agree(true)" class="end" />
      <div id="NO" @click="agree(false)" class="end" />
    </div>


    <canvas v-for="(i, idx) in 2" :key="idx" ref="can"></canvas>
    <video autoplay ref="vid" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AgreementScreen extends Vue {
  @Prop() private msg!: string;
  $refs!: {
    can: HTMLCanvasElement[];
    vid: HTMLVideoElement;
  }

  vid!: HTMLVideoElement;
  slide!: HTMLElement;
  ctx: CanvasRenderingContext2D[] = [];
  lastImageData?: ImageData;
  bScreen = false;

  mounted(){
    this.vid = this.$refs.vid;
    for(const can of this.$refs.can) {
      const ctx = can.getContext('2d') as CanvasRenderingContext2D;
      can.width = window.innerWidth;
      can.height = window.innerHeight;

      ctx.translate(can.width, 0);
      ctx.scale(-1, 1);
      this.ctx.push(ctx);
    }

    this.slide = document.querySelector('#Slide') as HTMLElement;
    this.slide.style.top = (window.innerHeight / 2) - 50 + "px";

    setTimeout(()=>{
      this.bScreen = true;
      navigator.mediaDevices.getUserMedia({video: {width: window.innerWidth, height: window.innerHeight}})
      .then((stream) => {
        this.vid.srcObject = stream;

        this.update();
      })
      .catch((error) => {
        console.log(error);
      });
    },1000);

    document.addEventListener('keydown', (e) => {
      if(this.bScreen){
        switch(e.which){
          // Y Key
          case 89:
            this.agree(true);
            break;

          // N Key
          case 78:
            this.agree(false);
            break;
        }
      }
    })
  }

  private update() {
    this.ctx[0].drawImage(this.vid, 0, 0);
    this.blend();
    this.checkAreas();

    window.requestAnimationFrame(this.update);
  }

  private agree(val: boolean) {
    this.$emit('agreement', val);
    this.bScreen = false;
  }

  private checkAreas(){
    const width = 100;
    const height = window.innerHeight;
    const h = height / 8;

    for(let r = 0; r < 8; ++r){
      const y = Math.round(r * h);

      const blended = this.ctx[1].getImageData(0, y, width, h);
      let i = 0;
      let average = 0;
      while(i < (blended.data.length / 4)){
        average += (blended.data[i*4] + blended.data[i*4+1] + blended.data[i*4+2]) / 3;
        ++i;
      }

      average = Math.round(average / (blended.data.length / 4));
      if(average > 10){
        this.slide.style.top = y + "px";
      }

    }
  }

  private blend(){
    const width = 100;
    const height = window.innerHeight;
    const xOffset = window.innerWidth - width;

    const sourceData = this.ctx[0].getImageData(xOffset, 0, width, height);
    const blendedData = this.ctx[0].createImageData(width, height);
    if(!this.lastImageData) this.lastImageData = this.ctx[0].getImageData(xOffset, 0, width, height);

    this.differenceAccuracy(blendedData.data, sourceData.data, this.lastImageData.data);
    this.ctx[1].putImageData(blendedData, xOffset, 0);
    this.lastImageData = sourceData;
  }

  /* -- Utility -- */
  private difference(target: Uint8ClampedArray, data1: Uint8ClampedArray, data2: Uint8ClampedArray) {
    if(data1.length != data2.length) return null;
    let i = 0;
    while (i < (data1.length * 0.25)) {
      target[4*i] = data1[4*i] == 0 ? 0 : this.fastAbs(data1[4*i] - data2[4*i]);
      target[4*i+1] = data1[4*i+1] == 0 ? 0 : this.fastAbs(data1[4*i+1] - data2[4*i+1]);
      target[4*i+2] = data1[4*i+2] == 0 ? 0 : this.fastAbs(data1[4*i+2] - data2[4*i+2]);
      target[4*i+3] = 0xFF;
      ++i;
    }
  }

  private differenceAccuracy(target: Uint8ClampedArray, data1: Uint8ClampedArray, data2: Uint8ClampedArray) {
		if (data1.length != data2.length) return null;
		let i = 0;
		while (i < (data1.length * 0.25)) {
			const average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			const average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			const diff = this.threshold(this.fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
  }

  private threshold(value: number): number {
    return (value > 0x15) ? 0xFF : 0;
  }

  private fastAbs(value: number): number {
    return (value ^ (value >> 31)) - (value >> 31);
  }
  /* -- */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

canvas{
  position: absolute;
}
video{
  display: none;
  }
  #Agreement{
    display: flex;
    flex: 1;
    position: absolute;
    height: 100%;
    overflow: hidden;
    }
    #AgreementTxt{
      flex: 1;
      text-shadow: 1 1 1;
      color:#FFF;
      text-align: center;
      font-size: 2em;
      z-index: 9995;
      padding-right: 50px;
      background-color:rgba(0, 0, 0, .6);
      }
      #AgreementTxt h1{
        display: inline-block;
        border-bottom: 3px solid;
        margin-bottom: 15px;
      }
      #Slider{
        width: 100px;
        z-index: 9995;
        border-left: #FFF 2px solid;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        }
        #Slide{
          position: absolute;
          width: 75px;
          border: #FFF 2px solid;
          height: 100px;
          top: 0px;
          border-radius: 10px;
          background-color:#AAA;
          }

          .end{
            position: absolute;
            border-radius: 70px;
            width: 75px;
            height: 75px;
          }
          #OK {
            top: 20px;
            background-color:#0F0;
          }
          #NO {
            bottom: 20px;
            background-color:#F00;
          }

</style>
