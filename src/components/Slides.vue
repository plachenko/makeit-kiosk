<template>
  <div id="slide">
    <div style="width: 300px; float: left; padding: 10px;">
      <p>{{slideTxt}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Slides extends Vue {
  @Prop(String) slideTxt = "test text";
}

</script>

<style>
#slide{
  background-color: #F00;
  margin-top: 100px;
  flex: 1;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
}

</style>
