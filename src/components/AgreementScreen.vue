<template>
  <div id="Agreement">
    <div id="notice">
      <stophand style="position: absolute; top: 15px; left: 20px" />
      <span>Covid Notice!</span>
      <stophand style="position: absolute; top: 15px; right: 20px" />
    </div>
    <!-- <Slides /> -->
    <!--
    <div id="AgreementTxt">
      <h1>MakeIt Labs Agreement</h1>
      <p><strong>Why:</strong> MakeIt Labs is taking the safety of everyone serious enough to make this kiosk to inform and ensure compliance. Our measures are to keep Everyone Else safe and are not negotiable for a member’s own level of personal safety. Tap RIGHT (Y) to continue, LEFT(N) to go back</p>
      <p>Do you have COVID symptoms? Fever, cough, exposure? Tap RIGHT (Y) to continue, LEFT(N) to go back.</p>
      <p><strong>What:</strong> Proper Mask, hand washing, and cleaning is MANDATORY for everyone. Tap RIGHT (Y) to continue, LEFT(N) to go back</p>
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
  }

  vid!: HTMLVideoElement;
  slide!: HTMLElement;
  ctx: CanvasRenderingContext2D[] = [];
  lastImageData?: ImageData;
  bScreen = false;

  mounted(){
    gsap.from("#notice", {top: -100, delay: .4});
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
    */
  }

  private update() {
    this.ctx[0].drawImage(this.vid, 0, 0);

    window.requestAnimationFrame(this.update);
  }

  private agree(val: boolean) {
    this.$emit('agreement', val);
    this.bScreen = false;
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
