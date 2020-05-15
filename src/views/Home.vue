<template>
  <div class="home">
    <div id="title" class="overlay">
      <div>MakeIt Labs</div>
      <div v-if="logged">Welcome UserName!</div>
    </div>

    <div id="agree" class="overlay">
      <div>Agreed! Free to use the space.</div>
    </div>

    <div id="disagree" class="overlay">
      <div>Sorry, you can't use the space without agreeing. Please talk to a makeit member.</div>
    </div>

    <AgreementScreen v-if="logged" @agreement="handleAgreement($event)" />
  </div>
</template>

<script>
import gsap from 'gsap';
// @ is an alias to /src
import AgreementScreen from '@/components/AgreementScreen.vue'

export default {
  name: 'Home',
  components: {
    AgreementScreen
  },
  data: function(){
    return{
      logged: false,
    }
  },
  methods: {
    enter: function(){
      this.logged = true;
      gsap.to('#title', {bottom: window.innerHeight, delay: 4})
    },
    exit: function(){
      this.logged = false;
    
      gsap.to('#title', {bottom: 0, delay: 4, onComplete:()=>{
        document.querySelector("#agree").style.top = "-100%";
        document.querySelector("#disagree").style.top = "100%";
      }})
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
    document.addEventListener('keydown', (e)=>{
      switch(e.which){
        case 32:
          this.enter();
          break;
      }
    })
  }
}
</script>
<style>
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
