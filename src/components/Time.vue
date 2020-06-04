<template>
  <div id="timeContainer">
    <span>{{time}}</span>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import moment, { Moment } from 'moment';
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Time extends Vue {
  private time: Moment | string = moment().format('hh:mm:ss a');
  private offset = 190;

  mounted(){
    gsap.from("#timeContainer", { autoAlpha: 0, y: "-="+this.offset});
    setInterval(() => {
      this.time = moment().format('hh:mm:ss A');
    }, 1000);
  }

  public exit(){
    gsap.to("#timeContainer", {autoAlpha: 0, y: "+="+this.offset})
  }

}

</script>

<style>
#timeContainer{
  color:#FFF;
  padding: 20px;
  width: 200px;
  text-align: center;
  border: #555 2px solid;
  border-radius: 20px;
  /* width: 100px; */
  top: 20px;
  /* height: 100px; */
  position: absolute;
}

</style>
