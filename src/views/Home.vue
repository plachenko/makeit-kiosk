<template>
  <div class="home">

    <!-- Title Screen -->
    <div id="title" class="overlay">
      <Time ref="time" v-if="bShowTime" />

      <Logo
        ref="logo"
        id="logo"
        v-if="bShowLogo"
        @doneAnimating="onLogoFinish" />

      <Welcome ref="welcome" v-if="bLogged" :user="user" />
    </div>

    <!-- Agreement screen -->
    <!-- <AgreementScreen v-if="logged" @agreement="handleAgreement($event)" /> -->

    <!--
    <div id="agree" class="overlay">
      <div>Agreed! Free to use the space.</div>
    </div>

    <div id="disagree" class="overlay">
      <div>Sorry, you can't use the space without agreeing. Please talk to a makeit member.</div>
    </div>

    -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gsap from 'gsap';

// @ is an alias to /src
import AgreementScreen from '@/components/AgeementScreen.vue'

import Logo from '@/components/Logo.vue'
import Time from '@/components/Time.vue'
import Welcome from '@/components/Welcome.vue'

@Component({
  components:{
    Logo,
    Time,
    Welcome
  }
})
export default class Home extends Vue{
  private bLogged = false;
  private bShowTime = false;
  private bShowLogo = false;
  private user?: any = null;

  $refs!: {
    logo: HTMLElement;
    time: HTMLElement;
    welcome: HTMLElement;
  }

  mounted(){
    this.user = {
      name: 'Denis Perchenko'
    }

    this.bShowLogo = true;

    document.addEventListener('keydown', (e)=>{
      switch(e.which){
        case 32:
          this.onEnter();
          break;
      }
    })
  }

  private onEnter(){
    // const logo = this.$refs.logo.$el;
    // gsap.to(logo, {autoAlpha: 0, top: "-=20"});
    // this.bLogged = true;
  }

  private onLogoFinish(){
    this.bShowTime = true;
  }

}

/*
export default {
  name: 'Home',
  components: {
    // AgreementScreen,
    Time,
    Logo
  },
  data: function(){
    return{
      logged: false,
      showTime: false,
      showLogo: false,
      txt: "Denis Perchenko"
    }
  },
  methods: {
    testBack(){
      this.showTime = true;
    },
    enter: function(){
      // this.logged = true;
      // gsap.to('#title', {bottom: window.innerHeight, delay: 4})
      // this.$refs.time.exit();
      // this.$refs.logo.glow();
      this.showLogo = !this.showLogo;
    },
    exit: function(){
      this.logged = false;

      gsap.to('#title', {bottom: 0, delay: 4, onComplete:()=>{
        document.querySelector("#agree").style.top = "-100%";
        document.querySelector("#disagree").style.top = "100%";
      }});
    },
    handleAgreement: function(e){
      if(e == true){
        gsap.to('#agree', {top: 0})
      } else {
        gsap.to('#disagree', {top: 0})
      }
      this.exit();
    }
  },
  mounted(){
  }
}
*/

</script>
<style>
@font-face {
  font-family: "Arial Rounded MT Bold";
  src: url("~@/assets/font/ARMTB.eot");
  src: url("~@/assets/font/ARMTB.woff2") format("woff2"),
  url("~@/assets/font/ARMTB.woff") format("woff"),
  url("~@/assets/font/ARMTB.ttf") format("truetype");
}

.overlay{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  place-items: center;
  font-size: 2em;
}
#title{
  background-color:#000;
  color:#FFF;
  z-index: 9999;
}
#agree{
  background-color:#060;
  color:#000;
  top: -100%;
  z-index: 9996;
}
#disagree{
  background-color:#600;
  color:#000;
  top: 100%;
  z-index: 9996;
}

</style>
