<template>
  <div id="welcome">
    <svg ref="welcome" xlink="http://www.w3.org/1999/xlink" style="width: 100%">
      <text id="txtGroup" text-anchor="middle" x="50%" y="50%">
        <tspan id="welcomeTxt" class="text" font-family="Arial Rounded MT Bold" style="display: inline-block; margin-right: 20px">Welcome </tspan>
        <tspan id="user" class="text" font-family="Arial Rounded MT Bold">{{user.name}}</tspan>
      </text>
      <!-- <text font-family="Arial Rounded MT Bold" text-anchor="middle" x="50%" y="50%" id="user" class="text">{{user.name}}</text> -->
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
    const nameEl= document.getElementById('user');
    // const welcomeEl = document.getElementById('welcome');

    gsap.to("#welcome", {autoAlpha: 1, marginTop: 35});
    gsap.to('#user', 3.5, {strokeDashoffset: 0});
    gsap.to('#user', {fillOpacity: 1, strokeOpacity: 0, delay: 1.2})
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

#welcomeTxt{
  fill:#293b96;
  }
.text{
  font-size: 2em;
  }
</style>
