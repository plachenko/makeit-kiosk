<template>
  <div id="Agreement">
    <div id="notice">
      <stophand style="position: absolute; top: 15px; left: 30px" />
      <span>Covid Notice!</span>
      <stophand style="position: absolute; top: 15px; right: 30px" />
    </div>

    <Slides ref="slides" :slideIdx="idx" />

    <div id="btnContainer">
      <div class="btn" id="prev">&#x2B05; Back</div>
      <div style="padding-top: 10px;">
        <span class="arrow">&#x25BC;</span>
        <span class="numTxt">({{this.idx+1}} / 3)</span>
        <span class="ftBtnTxt">Please use the feet buttons below the kiosk.</span>
        <span class="arrow">&#x25BC;</span>
      </div>
      <div class="btn" id="next">Next &#x27A1;</div>
    </div>
    <!--
    <div id="AgreementTxt">
      <h1>MakeIt Labs Agreement</h1>
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
    -->
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue } from 'vue-property-decorator';

import stophand from '@/assets/Stop_hand.svg';
import Slides from '@/components/Slides.vue';

@Component({
  components:{
    stophand,
    Slides
  }
})
export default class AgreementScreen extends Vue {
  @Prop() private msg!: string;
  $refs!: {
    can: HTMLCanvasElement[];
    vid: HTMLVideoElement;
    slides: Slides;
  }

  vid!: HTMLVideoElement;
  slide!: HTMLElement;
  ctx: CanvasRenderingContext2D[] = [];
  lastImageData?: ImageData;

  bScreen = true;
  idx = 0;

  timeOut = 120;

  mounted(){
    gsap.from("#notice", {top: -100});
    gsap.from("#btnContainer", {bottom: -100});
    gsap.fromTo(".arrow", .4, {y: -2}, {y: 10, repeat: -1, yoyo: true});

    gsap.from("#prev", .4, {left: "-=10", autoAlpha:0, delay: 1.5});
    gsap.from("#next", .4, {right: "-=10", autoAlpha:0, delay: 1.5});

    setInterval(() => {
      if(this.timeOut > 0){
        this.timeOut --;
      } else{
        this.agree(false);
      }
    }, 1000);
    /*
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

    */
    document.addEventListener('keydown', (e) => {
      switch(e.which){
        // Y Key
        case 89:
          if(this.idx < this.$refs.slides.slides.length - 1){
            gsap.to("#next", .3, {backgroundColor: "#0F0", boxShadow: "#0F0 0px 0px 10px"})
          }
          break;

        // N Key
        case 78:
          if(this.idx){
            gsap.to("#prev", .3, {backgroundColor: "#F00", boxShadow: "#F00 0px 0px 10px"})
          }
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch(e.which){
        // Y Key
        case 89:
          if(this.idx < this.$refs.slides.slides.length - 1){
            this.timeOut = 120;
            this.idx++;
          } else {
            this.agree(true);
          }
          gsap.to("#next", {backgroundColor: "#070", boxShadow: "#0F0 0px 0px 0px"})
          break;

        // N Key
        case 78:
          if(this.idx){
            this.timeOut = 120;
            this.idx--;
          }else{
            this.agree(false);
          }
          gsap.to("#prev", {backgroundColor: "#700", boxShadow: "#F00 0px 0px 0px"})
          break;
      }
    });
  }

  private update() {
    this.ctx[0].drawImage(this.vid, 0, 0);

    window.requestAnimationFrame(this.update);
  }

  private agree(val: boolean) {
    console.log(val);
    // this.$emit('agreement', val);
    // this.bScreen = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
  position: absolute;
}

#notice{
  background-color: rgb(255, 0, 0);
  text-shadow: 0px 2px 0px #000;
  color: #FFF;
  text-align: center;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  position: absolute;
  font-family: 'Arial Rounded MT Bold';
  font-size: 2em;
  top: 0px;
  }

#btnContainer{
  height: 50px;
  /* background-color:#F00; */
  position: absolute;
  bottom: 0px;
  width: 100%;
  margin-top: 0px;
  text-align: center;
  box-sizing: border-box;
}
.btn{
  border-radius: 10px;
  width: 120px;
  top: -20px;
  padding: 10px;
  position: absolute;
  font-weight: bold;
  color:#FFF;
  }
#prev{
  background-color:#700;
  left: 50px;
}
#next{
  background-color:#070;
  right: 50px;
}
.ftBtnTxt{
  font-size: 1.4em;
}

.numTxt{
  position: absolute;
  bottom: 80px;
  left: calc(50% - 20px);
  display: inline-block;
}

.arrow{
  display: inline-block;
  padding: 0px 10px;
}

video{
  display: none;
  }
  #Agreement{
    display: flex;
    flex: 1;
    position: absolute;
    height: 100%;
    width: 100%;
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
