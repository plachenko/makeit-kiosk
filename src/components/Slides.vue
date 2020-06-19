<template>
  <div id="slide">
    <div style="width: 550px; float: left; padding: 10px; position: relative;">
      <div class="slide">
        <p>MakeItLabs is taking the safety of everyone serious enough to make this kiosk to inform and ensure compliance. Our measures are to keep Everyone Else safe and are not negotiable for a member’s own level of personal safety.</p>
        <p>To maintain a touchless experience please press the foot switches located UNDER the kiosk. Press right if you <span style="color: #0C0; text-decoration: underline">CAN</span> comply with the terms. Press left if you <span style="text-decoration: underline; color: #C00;">CAN'T</span> comply.</p>
      </div>
      <p class="slide">I do not have any of the following symptoms to Covid-19:
        <ul>
          <li>Fever</li>
          <li>cough</li>
          <li>exposure</li>
        </ul>
      </p>
      <p class="slide">Proper Mask, hand washing, and cleaning is MANDATORY for everyone. Please show your masked face in the camera preview on the next screen. A photo will be taken after a 5 second delay, then an IR photo will be taken after an 9 second delay. After using the kiosk, please make sure to wash your hands.</p>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Slides extends Vue {
  public slides?: HTMLCollection;

  @Prop({type: Number, default: 0}) slideIdx?: number;
  @Watch('slideIdx')
  onIdxChange(n: number, p: number){
    const prev = this.slides[p];
    const next = this.slides[n];

    gsap.to(prev, {autoAlpha: 0, x: 40 * (p - n)});
    gsap.fromTo(next, {x: 40 * (n - p)}, {x: "0", autoAlpha: 1});
  }
  mounted(){
    this.slides = document.getElementsByClassName('slide');

    gsap.from("#slide", {autoAlpha: 0, delay: .5});
    gsap.to(this.slides[0], {autoAlpha: 1});
  }
}

</script>

<style>
#slide{
  /* background-color: #F00; */
  font-family: 'Arial Rounded MT Bold';
  font-size: 1.8em;
  line-height: 34px;
  flex: 1;
  text-align: justify;
  justify-content: center;
  align-items: center;
  display: flex;
}
.slide{
  position: absolute;
  top: -200px;
  opacity: 0;
}

</style>
