<template>
  <div id="welcome">
    <svg ref="welcome" xlink="http://www.w3.org/1999/xlink" style="width: 100%">
      <text y="50%" :x="xOffset" id="welcome" class="text" font-family="Arial Rounded MT Bold">Welcome</text>
      <text font-family="Arial Rounded MT Bold" x="50%" y="50%" id="user" class="text">User Test</text>
    </svg>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Welcome extends Vue {

  @Prop({type: Object}) user!: object;
  private xOffset = 0;

  $refs!: {
    welcome: SVGElement;
  };

  mounted(){
    this.xOffset = window.innerWidth / 2 - 300;

    gsap.to("#welcome", {autoAlpha: 1, marginTop: "40"});
    gsap.to('#user', 3, {strokeDashoffset: 0});
    gsap.to('#user', {fillOpacity: 1, strokeOpacity: 0, delay: 2})
  }
}
</script>

<style>
#welcome{
  width: 100%;
  opacity: 0;
  margin-top: 80px;
  position: absolute;
  }

#user{
  fill:#e68726;
  stroke-dasharray: 340;
  stroke-dashoffset: 340;
  stroke: #FFF;
  fill-opacity: 0;
}

#welcome{
  fill:#293b96;
  }
.text{
  font-size: 2em;
  }
</style>
