<template>
  <h1 style="padding-top: 3em">Nikolaus Koopmann</h1>
  <a
    href="mailto:nikolauskoopmann@gmail.com"
    style="text-decoration: none; text-decoration-color: #000f32"
    >nikolauskoopmann@gmail.com</a
  >
  <SlickCV :resume="resume" class="slickcv"></SlickCV>
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
    console.log("resumeData");
    console.log(resumeData);
    const resume = resumeData;
    return { resume };
  },
});
</script>

<style>
#app {
  font-family: Montserrat, Lato, Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  background-color: #594f4f;
  background-image: linear-gradient(
    #e5fcc2,
    #9de0ad,
    #45ada8,
    #547980,
    #594f4f,
    #000f32
  );
}

@font-face {
  font-family: Montserrat;
  src: local("Montserrat"), url("./fonts/Montserrat-Regular.ttf");
}

.slickcv {
  padding-top: 5em;
}
</style>
