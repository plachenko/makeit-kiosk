<template>
  <div>
    <div id="logoContainer">
      <MakeItLogo class="logo" id="MakeItLogo" ref="logo" />
      <div id="bulbContainer">
        <MakeItBulb id="bulb" class="logo" />
        <MakeItBulb id="bulb2" class="logo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Vue } from "vue-property-decorator";
import MakeItLogo from '@/assets/MakeItLogo.svg'
import MakeItBulb from '@/assets/MakeItBulb.svg'

@Component({
  components:{
    MakeItLogo,
    MakeItBulb
  }
})
export default class Logo extends Vue {
  $refs!: {
    logo: SVGElement;
  };

  mounted(){
    const logo = this.$refs.logo;

    gsap.from("path", 1, {strokeDashoffset: -219, ease: "sine.out", onComplete: function() {
      gsap.to("path", {fillOpacity: 1, left: "-27px", strokeOpacity: 0, delay: .6});
      gsap.to("#bulb2", 1, {filter: "blur(50px)", left: "-=27", delay: 1.4});
      gsap.to("#bulb", {left: "-=27", delay: 1.5});
      gsap.to("#MakeItLogo", 2, {autoAlpha: "1", delay: 1.8});
      gsap.to("#bulb2", 1.5, {autoAlpha: 0, y: "-=40", fill:"#FF0000",  delay: 1.8});
    }});

    setTimeout(() => {
      this.sendDone();
    }, 3000);
  }

  public glow(){
      gsap.from("#bulb2", 1, {autoAlpha: 1, filter: "blur(0px)", y: "0"});
  }

  public exit(){
    gsap.to("#MakeItLogo", 1, {autoAlpha: 0, top: "-=20"})
  }

  sendDone(){
    this.$emit('doneAnimating');
  }

}
</script>

<style>
  #logoContainer{
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    width: 666px;
    height: 109px;
    }

    #bulbContainer{
      width: 60px;
      height: 100px;
      position: absolute;
      }

  .logo{
    position: absolute;
    }

  .blue {
    fill:#293b96;
    }
  .orng{
    fill:#e68726;
    }

  #MakeItLogo{
    opacity: 0;
  }

  #bulb, #bulb2{
    /* border: #FFF 1px solid; */
    /* fill: #FF0000; */
    /* left: -28px; */
    fill-opacity: 0 !important;
  }

  path{
    stroke:#FFF;
    stroke-width: 2;
    /* stroke:#e68726; */
    /* fill: none !important; */
    stroke-dasharray: 220;
    stroke-dashoffset: 0;
  }
</style>
