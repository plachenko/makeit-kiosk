<template>
  <div id="slide">
    <div style="width: 550px; float: left; padding: 10px;">
      <p v-if="slideIdx == 1">MakeIt Labs is taking the safety of everyone serious enough to make this kiosk to inform and ensure compliance. Our measures are to keep Everyone Else safe and are not negotiable for a member’s own level of personal safety.</p>
      <p v-if="slideIdx == 2">Do you have COVID symptoms? Fever, cough, exposure?</p>
      <p v-if="slideIdx == 3"><strong>What:</strong> Proper Mask, hand washing, and cleaning is MANDATORY for everyone.</p>
      <!--
      <div style="border-top: 2px solid; margin-top 20px;">
        <p >Tap LEFT(N) to go back, RIGHT (Y) to continue</p>
      </div>
      -->
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Slides extends Vue {
  @Prop({type: Number, default: 1}) slideIdx?: number;
  /*
  @Watch('slideIdx')
  onIdxChange(n){
    console.log(n)
  }
  */
  mounted(){
    gsap.from("#slide", {autoAlpha: 0, delay: 1});
  }
}

</script>

<style>
#slide{
  /* background-color: #F00; */
  font-family: 'Arial Rounded MT Bold';
  font-size: 1.8em;
  line-height: 34px;
  margin-top: 0px;
  flex: 1;
  text-align: justify;
  justify-content: center;
  align-items: center;
  display: flex;
}

</style>
