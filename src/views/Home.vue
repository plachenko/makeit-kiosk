<template>
  <div class="home">

    <!-- Title Screen -->
    <div id="title" class="overlay">
      <div v-if="!bShowNotice" class="innerTitle">
        <Time ref="time" v-if="bShowTime" />

        <Logo
          ref="logo"
          id="logo"
          v-if="bShowLogo"
          @doneAnimating="onLogoFinish" />

        <Welcome
          v-if="bLogged"
          ref="welcome"
          :user="user" />

      </div>
    </div>

    <!-- Agreement screen -->
    <AgreementScreen
      v-if="bShowNotice"
      @agreement="handleAgreement($event)" />

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
import json from '@/assets/_private/acl.json'

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
  private bShowNotice = false;
  private user?: any = null;

  $refs!: {
    logo: Logo;
    time: HTMLElement;
    welcome: HTMLElement;
  }

  mounted(){

    let _user = null;
    this.bShowLogo = true;

    if(this.bShowNotice){
      gsap.to('#title', {y: -1 * window.innerHeight})
    }

    let id = "";

    document.addEventListener('keydown', (e)=>{

      if(!this.bLogged && this.$refs.logo){
        if(e.key == "Enter") {

          _user = json.filter(e => e.raw_tag_id == id);
          this.onEnter(_user[0]);

        } else {
          id += e.key;

          setTimeout(() => {
            id = "";
          }, 300);

        }
      }
    });
  }

  private handleAgreement(e: any){
    this.bLogged = false;
    this.bShowTime = false;
    this.user.agree = e.val;
    this.user.picture = e.picture;

    gsap.to("#title", {y: 0, delay: 1, onComplete: () => {
      this.bShowNotice = false;
      this.user = null;
    }});
  }

  private onEnter(user: any){

    this.$refs.logo.glow();

    console.log(user);

    this.user = {
      name: user.member.replace('.', ' '),
      time: new Date(),
      agree: false,
      picture: null
    }

    console.log(this.user);

    setTimeout(() => {
      this.bLogged = true;
      gsap.to("#logo", {autoAlpha: 0, marginTop: "-=80"});
      gsap.to("#title", {y: ( -1 * window.innerHeight ), delay: 3, onComplete: () => {
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
  font-size: 2em;
}
#title, #test{
  background-color:#000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  color:#FFF;
  z-index: 9999;
}

.innerTitle{
  display: flex;
  flex: 1;
  position: absolute;
  justify-content: center;
  place-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
