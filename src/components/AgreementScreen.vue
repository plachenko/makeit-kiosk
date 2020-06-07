<template>
  <div id="Agreement">
    <div id="AgreementNotice">
      <div id="notice">
        <stophand style="position: absolute; top: 15px; left: 30px" />
        <span>Covid-19 Notice!</span>
        <stophand style="position: absolute; top: 15px; right: 30px" />
      </div>

      <Slides v-if="!bPicture" ref="slides" :slideIdx="idx"  />

      <div v-if="!bPicture" id="btnContainer">
        <div class="btn" id="prev">&#x2B05; Back</div>
        <div style="padding-top: 10px;">
          <span class="arrow">&#x25BC;</span>
          <span class="numTxt">({{this.idx+1}} / 3)</span>
          <span class="ftBtnTxt">Please use the feet buttons below the kiosk.</span>
          <span class="arrow">&#x25BC;</span>
        </div>
        <div class="btn" id="next">Next &#x27A1;</div>
      </div>

      <Picture v-if="bPicture" @handleError="onError" @pictureTaken="onPicture" />
    </div>

    <div id="AgreementTxt">
      <p v-if="bAgree">Make All the Things! Make sure you wash your hands before using the space. Thank you, enjoy your visit!</p>
      <p v-else>You may not use the space until you can fulfill the terms. Contact board@makeitlabs.com for any questions or concerns.</p>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue } from 'vue-property-decorator';

import stophand from '@/assets/Stop_hand.svg';
import Slides from '@/components/Slides.vue';
import Picture from '@/components/Picture.vue';

@Component({
  components:{
    stophand,
    Slides,
    Picture
  }
})
export default class AgreementScreen extends Vue {
  @Prop() private msg!: string;
  $refs!: {
    can: HTMLCanvasElement[];
    slides: Slides;
  }

  vid!: HTMLVideoElement;
  slide!: HTMLElement;
  ctx: CanvasRenderingContext2D[] = [];
  lastImageData?: ImageData;

  bAgree = false;
  bScreen = true;
  bPicture = false;
  idx = 0;

  slideNum = 0;

  timeOut = 120;

  interval?: any;

  mounted(){
    gsap.from("#notice", {top: -100});
    gsap.from("#btnContainer", {bottom: -100, delay: 1});
    gsap.fromTo(".arrow", .4, {y: -2}, {y: 10, repeat: -1, yoyo: true});
    gsap.from("#prev", .4, {left: "-=40", autoAlpha:0, delay: 1.8});
    gsap.from("#next", .4, {right: "-=40", autoAlpha:0, delay: 1.8});

    this.slideNum = this.$refs.slides.slides.length - 1;

    this.interval = setInterval(() => {
      if(this.timeOut > 0){
        this.timeOut --;
      } else{
        this.agree(false);
      }
    }, 1000);

    document.addEventListener('keydown', (e) => {
      switch(e.which){
        // Y Key
        case 89:
          if(this.idx < this.slideNum){
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
          if(this.idx < this.slideNum){
            this.timeOut = 120;
            this.idx++;
          } else {
            this.bPicture = true;
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

  private onPicture(){
    this.bPicture = false;
    this.agree(true);
  }

  private onError(){
    setTimeout(() => {
      this.agree(false);
    }, 5000);
  }

  private update() {
    this.ctx[0].drawImage(this.vid, 0, 0);

    window.requestAnimationFrame(this.update);
  }

  private agree(val: boolean) {
    this.bAgree = val;
    gsap.to("#AgreementNotice", {opacity: 0});

    setTimeout(() => {
      this.$emit('agreement', val);
    }, 6000);

    if(val){
      gsap.to('#AgreementTxt', {autoAlpha: 1, backgroundColor: "#0F0", delay: .5});
    }else{
      gsap.to('#AgreementTxt', {autoAlpha: 1, backgroundColor: "#F00", delay: .5});
    }
  }

  beforeDestroy(){
    clearInterval(this.interval);
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

  #Agreement, #AgreementNotice{
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
      position: absolute;
      color:#FFF;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      width: 100%;
      }
      #AgreementTxt p {
        font-size: 2em;
        text-align: justify;
        width: 460px;
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
