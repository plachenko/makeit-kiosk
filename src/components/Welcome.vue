<template>
  <div>
    <svg ref="welcome" xlink="http://www.w3.org/1999/xlink" style="width: 100%">
      <text font-family="Arial Rounded MT Bold">Welcome</text>
      <text font-family="Arial Rounded MT Bold" class="testText">{{user.name}}</text>
    </svg>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Welcome extends Vue {

  @Prop({type: Object}) user!: object;

  $refs!: {
    welcome: SVGElement;
  };

  mounted(){
    gsap.to('.testText', 5, {strokeDashoffset: 0});
    gsap.to('.testText', {fillOpacity: 1, strokeOpacity: 0, delay: 2})
  }
}
</script>

<style>
.userText{
  stroke-dasharray: 340;
  stroke-dashoffset: 340;
  fill:#e68726;
  fill-opacity: 0;
  font-size: 2em;
  stroke: #FFF;
  }
</style>
