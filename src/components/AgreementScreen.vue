<template>
  <div id="Agreement">
    <audio src="~@/assets/done-for-you.ogg" ref="nextSnd" />
    <audio src="~@/assets/back.mp3" ref="backSnd" />

    <div id="AgreementNotice">
      <div id="notice" v-if="!bPicture">
        <stophand style="position: absolute; top: 15px; left: 30px" />
        <span>Covid-19 Notice!</span>
        <stophand style="position: absolute; top: 15px; right: 30px" />
      </div>

      <Slides @handleError="onError" @pictureTaken="onPicture" ref="slides" :slideIdx="idx"  />

      <div v-if="!bPicture" id="btnContainer">
        <div class="btn" id="prev" style="border: 2px solid #F00;">
          <div style="background-color:#F00; border-radius: 8px 8px 0px 0px">
            Decline ... {{timeOut}}
          </div>
          <Arrow style="stroke: #000; transform: rotate(180deg)" />
        </div>
        <div style="padding-top: 10px;">
          <span class="arrow">&#x25BC;</span>
          <!-- <span class="numTxt">({{this.idx+1}} / 3)</span> -->
          <span class="ftBtnTxt">Please use the feet buttons below the kiosk.</span>
          <span class="arrow">&#x25BC;</span>
        </div>
        <div class="btn" id="next" style="border: 2px solid #060;">
          <div style="background-color:#060; border-radius: 8px 8px 0px 0px">
            Accept
          </div>
          <Arrow />
        </div>
      </div>

      <!-- <Picture v-if="bPicture" @handleError="onError" @pictureTaken="onPicture" /> -->
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

import Arrow from '@/assets/arrow.svg';
import stophand from '@/assets/Stop_hand.svg';
import Slides from '@/components/Slides.vue';
import Picture from '@/components/Picture.vue';

@Component({
  components:{
    stophand,
    Slides,
    Picture,
    Arrow
  }
})
export default class AgreementScreen extends Vue {
  @Prop() private msg!: string;
  $refs!: {
    can: HTMLCanvasElement[];
    slides: Slides;
    nextSnd: HTMLAudioElement;
    backSnd: HTMLAudioElement;
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

  timeOut = 60;

  interval?: any;

  status = "";

  mounted(){
    gsap.from("#notice", {top: -100});
    gsap.from("#btnContainer", {bottom: -100, delay: 1});
    gsap.fromTo(".arrow", .4, {y: -2}, {y: 10, repeat: -1, yoyo: true});
    gsap.from("#prev", .4, {left: "-=40", autoAlpha:0, delay: 1.8});
    gsap.from("#next", .4, {right: "-=40", autoAlpha:0, delay: 1.8});

    this.slideNum = this.$refs.slides.slides.length - 1;

    this.interval = setInterval(() => {
      if(this.timeOut > 1){
        this.timeOut --;
      } else{
        this.status = "FAILED";
        this.agree(false);
        clearInterval(this.interval)
      }
    }, 1000);

    document.addEventListener('keydown', (e) => {
      switch(e.which){
        // Y Key
        case 89:
          /*
          if(!this.bPicture){
            if(this.idx < this.slideNum){
              if(this.$refs.nextSnd){
                this.$refs.nextSnd.pause();
                this.$refs.nextSnd.currentTime = 0;
                this.$refs.nextSnd.play();
              }
              gsap.to("#next", .3, {backgroundColor: "#0F0", boxShadow: "#0F0 0px 0px 10px"})
            }
          }
          */
          break;

        // N Key
        case 78:
          /*
          if(!this.bPicture){
            if(this.idx){
              if(this.$refs.backSnd){
                this.$refs.backSnd.pause();
                this.$refs.backSnd.currentTime = 0;
                this.$refs.backSnd.play();
              }
              gsap.to("#prev", .3, {backgroundColor: "#F00", boxShadow: "#F00 0px 0px 10px"})
            }
          }
          */
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch(e.which){
        // Y Key
        case 89:
          this.$refs.slides.takePicture()
          /*
          if(!this.bPicture){
            if(this.idx < this.slideNum){
              this.timeOut = 120;
              this.idx++;
            } else {
              this.bPicture = true;
            }
            gsap.to("#next", {backgroundColor: "#CC0", boxShadow: "#0F0 0px 0px 0px"})
          }
          */
          break;

        // N Key
        case 78:
          if(!this.bPicture){
            this.agree(false);
            gsap.to("#prev", {backgroundColor: "#CC0", boxShadow: "#F00 0px 0px 0px"})
          }
          break;
      }
    });
  }

  private onPicture(picture: any){
    // this.bPicture = false;
    this.agree(true, picture);
  }

  private onError(){
    /*
    setTimeout(() => {
      this.status = "FAILED";
      this.agree(false);
    }, 5000);
    */
  }

  private update() {
    this.ctx[0].drawImage(this.vid, 0, 0);

    window.requestAnimationFrame(this.update);
  }

  private agree(val: boolean, picture: any = null) {
    this.bAgree = val;
    gsap.to("#AgreementNotice", {opacity: 0});

    clearInterval(this.interval)

    setTimeout(() => {
      let status = this.status;
      if(!status.length){
        status = val ? "ACCEPTED" : "DENIED";
      }

      this.$emit('agreement', {val: val, picture: picture, status: status });
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
  bottom: 30px;
  width: 100%;
  margin-top: 0px;
  text-align: center;
  box-sizing: border-box;
}
.btn{
  border-radius: 10px;
  width: 120px;
  top: -20px;
  /* padding: 10px; */
  position: absolute;
  font-weight: bold;
  color:#FFF;
  background-color: #CC0;
  }
#prev{
  /* background-color:#700; */
  left: 50px;
}
#next{
  /* background-color:#070; */
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
