<template>
  <div class="home">

    <!-- Title Screen -->
    <!--
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
        
        <div v-show="!bLogged" id="memberNotice">Tag in to start!</div>

        <div v-if="bNetworkError" id="networkError">Cannot contact auth server</div>
      </div>
    </div>
    -->
    <Picture />

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

import Picture from '@/components/Picture.vue'

@Component({
  name: "Home",
  components:{
    Logo,
    Time,
    Welcome,
    Picture,
    AgreementScreen
  }
})
export default class Home extends Vue{
  private bLogged = false;
  private bShowTime = false;
  private bShowLogo = false;
  private bShowNotice = false;
  private user?: any = null;
  private bNetworkError = false;

  $refs!: {
    logo: Logo;
    time: HTMLElement;
    welcome: HTMLElement;
  }

  mounted(){
    this.bShowLogo = true;

    if(this.bShowNotice){
      gsap.to('#title', {y: -1 * window.innerHeight})
    }

    gsap.to('#memberNotice', {autoAlpha: 1, delay: 3});
    setTimeout(() => {
      gsap.fromTo("#memberNotice", .8, {y: 0, autoAlpha: 1}, {y: 20, autoAlpha: .1, repeat: -1, yoyo: true});
    }, 3500);
    
    let id = "";
    document.addEventListener('keydown', (e)=>{
      if(!this.bLogged && this.$refs.logo){
        if(e.key == "Enter" && id.length) {
          this.handleAuthentication(id);
        } else {
          if(e.key !== "Enter"){
            id += e.key;
          }
          setTimeout(() => {
            id = "";
          }, 300);
        }
      }
    });
  }

  private handleAuthentication(id: string){
    if(process.env.VUE_APP_SECRET){
      const url = 'https://auth.makeitlabs.com/authit/api/v1/resources/frontdoor/fob/';
      const secret = process.env.VUE_APP_SECRET;
      const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' +btoa('entrykiosk:'+secret)
      });

      fetch(url + id, { headers: headers }).then(res => res.json())
      .then(user => {
        this.bNetworkError = false;
        this.onEnter(user);
      })
      .catch((e) => {
        console.log(e);
        this.bNetworkError = true;
      });
    }
  }

  private handleSendPost(user: any){
    const url = 'https://auth.makeitlabs.com/authit/api/v1/kiosklog';
    const secret = process.env.VUE_APP_SECRET;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' +btoa('entrykiosk:'+secret)
    });

    fetch(url, {
      headers: headers,
      body: JSON.stringify({
        user: user.member,
        event: user.status,
        visibleimage: user.picture,
        irimage: user.ir
      }),
      method: "POST"
    })
    .then(res => res.json())
    .then(data => {
      this.bNetworkError = false;
    })
    .catch((e) => {
      console.log(e);
      this.bNetworkError = true;
    });
  }

  private handleAgreement(e: any){
    this.bLogged = false;
    this.bShowTime = false;

    this.user.agree = e.val;
    if(e.picture){
      this.user.picture = e.picture[0].replace(/^data:image\/(png|jpeg);base64,/, "");

      if(e.picture.length > 1){
        this.user.ir = e.picture[1].replace(/^data:image\/(png|jpeg);base64,/, "");
      }else{
        this.user.ir = e.picture[0].replace(/^data:image\/(png|jpeg);base64,/, "");
      }
    }else{
      this.user.picture = null;
      this.user.ir = null;
    }

    this.user.status = e.status;

    this.handleSendPost(this.user);

    gsap.to("#title", {y: 0, delay: 1, onComplete: () => {
      this.bShowNotice = false;
      this.user = null;
    }});
  }

  private onEnter(user: any){

    this.$refs.logo.glow();

    this.user = {
      name: user.member.replace('.', ' '),
      member: user.member,
      time: new Date(),
      status: 'FAILED',
      agree: false,
      picture: null
    }

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

#networkError{
  background-color:#F00;
  padding: 5px;
  border-radius: 10px;
  font-size: .7em;
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 400px;
}


#memberNotice{
  padding: 15px;
  border-radius: 10px;
  font-size: 1em;
  position: absolute;
  bottom: 130px;
  text-align: center;
  width: 400px;
  border: 2px solid;
  opacity: 0;
}


</style>
