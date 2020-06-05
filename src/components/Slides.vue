<template>
  <div id="slide">
    <div style="width: 550px; float: left; padding: 10px; position: relative;">
      <p class="slide">MakeIt Labs is taking the safety of everyone serious enough to make this kiosk to inform and ensure compliance. Our measures are to keep Everyone Else safe and are not negotiable for a member’s own level of personal safety.</p>
      <p class="slide">Do you have COVID symptoms?
        <ul>
          <li>Fever</li>
          <li>cough</li>
          <li>exposure</li>
        </ul>
      </p>
      <p class="slide">Proper Mask, hand washing, and cleaning is MANDATORY for everyone. On the next screen we'll capture an image to make sure you're wearing a mask. After using the kiosk, please make sure to wash your hands.</p>
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

    gsap.from("#slide", {autoAlpha: 0, delay: 1});
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
  top: -100px;
  opacity: 0;
}

</style>
