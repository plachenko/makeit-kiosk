<template>
  <div class="home">

    <!-- Title Screen -->
    <div id="title" v-if="!bShowNotice" class="overlay">
      <Time ref="time" v-if="bShowTime" />

      <Logo
        ref="logo"
        id="logo"
        v-if="bShowLogo"
        @doneAnimating="onLogoFinish" />

      <Welcome
        v-if="bLogged"
        ref="welcome"
        :user="{name: 'denis'}" />
    </div>

    <!-- Agreement screen -->
    <AgreementScreen v-if="bShowNotice" @agreement="handleAgreement($event)" />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gsap from 'gsap';

// @ is an alias to /src
import AgreementScreen from '@/components/AgreementScreen.vue'

import Logo from '@/components/Logo.vue'
import Time from '@/components/Time.vue'
import Welcome from '@/components/Welcome.vue'

@Component({
  name: "Home",
  components:{
    Logo,
    Time,
    Welcome,
    AgreementScreen
  }
})
export default class Home extends Vue{
  private bLogged = false;
  private bShowTime = false;
  private bShowLogo = false;
  private bShowNotice = 1;
  private user?: any = null;

  $refs!: {
    logo: Logo;
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
          if(!this.bLogged){
            this.onEnter();
          }
          break;
      }
    })
  }

  private handleAgreement(e: boolean){
    console.log(e);
  }

  private onEnter(){

    this.$refs.logo.glow();

    setTimeout(() => {
      this.bLogged = true;
      gsap.to("#logo", {autoAlpha: 0, marginTop: "-=80"});
      gsap.to("#title", {top: ( -1 * window.innerHeight ), delay: 5, onComplete: () => {
        this.bShowNotice = true;
      }});
    }, 1000)

  }

  private onLogoFinish(){
    this.bShowTime = true;
  }

}
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
