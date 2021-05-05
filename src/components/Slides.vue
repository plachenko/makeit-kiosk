<template>
  <div id="slide">
    <div class="slide" style="display: flex; flex: 1; padding-top: 80px;">

      <!-- Left Side -->
      <div style="flex: 1;">

        <div style="float:left; height: 100%;">
          <div style="margin: 20px; border-bottom: 2px solid;">
            <p>MakeItLabs is taking the safety of everyone serious enough to make this kiosk to inform and ensure compliance. Our measures are to keep Everyone Else safe and are not negotiable for a member’s own level of personal safety.</p>
            <p>To maintain a touchless experience please press the foot switches located UNDER the kiosk. Press right if you <span style="color: #0C0; text-decoration: underline">CAN</span> comply with the terms. Press left if you <span style="text-decoration: underline; color: #C00;">CAN'T</span> comply.</p>
          </div>
          <div style="margin: 20px;">
            <p>You do not have any of the following symptoms to Covid-19:</p>
            <ul>
              <li>Fever</li>
              <li>cough</li>
              <li>exposure</li>
            </ul>
          </div>
          <div style="margin: 20px;">
            <p>Proper Mask, hand washing, and cleaning is MANDATORY for everyone. Please show your masked face in the camera preview on the next screen. A photo will be taken after a 5 second delay, then an IR photo will be taken after an 9 second delay. After using the kiosk, please make sure to wash your hands.</p>
          </div>
        </div>

      </div>

      <!-- Right Side -->
      <div style="flex: 1">

        <!-- <Picture ref="pictureCont" @handleError="onError" @pictureTaken="onPicture" /> -->
        <PictureTest ref="pictureCont" @handleError="onError" @pictureTaken="onPicture" />

      </div>
    </div>

    <!-- <div class="slide" style="margin-top: 40px; width: 450px; float: left; padding: 10px; position: relative;"> -->
      <!--
      -->
      <!--
      <div class="slide">
        <p>MakeItLabs is taking the safety of everyone serious enough to make this kiosk to inform and ensure compliance. Our measures are to keep Everyone Else safe and are not negotiable for a member’s own level of personal safety.</p>
        <p>To maintain a touchless experience please press the foot switches located UNDER the kiosk. Press right if you <span style="color: #0C0; text-decoration: underline">CAN</span> comply with the terms. Press left if you <span style="text-decoration: underline; color: #C00;">CAN'T</span> comply.</p>
      </div>
      <p class="slide">You do not have any of the following symptoms to Covid-19:
        <ul>
          <li>Fever</li>
          <li>cough</li>
          <li>exposure</li>
        </ul>
      </p>
      <p class="slide">Proper Mask, hand washing, and cleaning is MANDATORY for everyone. Please show your masked face in the camera preview on the next screen. A photo will be taken after a 5 second delay, then an IR photo will be taken after an 9 second delay. After using the kiosk, please make sure to wash your hands.</p>
      -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import PictureTest from '@/components/PictureTest.vue';
import Picture from '@/components/Picture.vue';

@Component({
  components: {
    PictureTest,
    Picture
  }
})
export default class Slides extends Vue {
  public slides?: HTMLCollection;
  $refs!: {
    pictureCont: Picture;
  }

  @Prop({type: Number, default: 0}) slideIdx?: number;
  @Watch('slideIdx')
  onIdxChange(n: number, p: number){
    const prev = this.slides[p];
    const next = this.slides[n];

    if(prev){
      gsap.to(prev, {autoAlpha: 0, x: 40 * (p - n)});
    }

    if(next){
      gsap.fromTo(next, {x: 40 * (n - p)}, {x: "0", autoAlpha: 1});
    }
  }
  mounted(){
    this.slides = document.getElementsByClassName('slide');

    gsap.from("#slide", {autoAlpha: 0, delay: .5});
    gsap.to(this.slides[0], {autoAlpha: 1});
  }

  public takePicture(){
    this.$refs.pictureCont.takePicture();
  }

  private onPicture(picture: any){
    this.$emit('pictureTaken', picture);
  }

  private onError(error: any){
    this.$emit('handleError', error);
  }
}

</script>

<style>
#slide{
  /* background-color: #F00; */
  font-family: 'Arial Rounded MT Bold';
  /* font-size: 1.8em; */
  /* line-height: 34px; */
  flex: 1;
  /* text-align: justify; */
  /* justify-content: center; */
  /* align-items: center; */
  display: flex;

  padding-top: 100px;
}
.slide{
  position: absolute;
  opacity: 0;
}

</style>
