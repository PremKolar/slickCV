<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <SlickCV :resume="resume"></SlickCV>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import resumeData from "@/assets/resume.json";
import SlickCV from "@/components/slickCV/SlickCV.vue";

export default defineComponent({
  name: "App",
  components: {
    SlickCV,
  },
  setup() {
    console.log(resumeData);
    const resume = resumeData;
    return { resume };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
