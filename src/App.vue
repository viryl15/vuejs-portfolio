<template>
  <transition name="fade" tag="div" class="wrapper" mode="out-in">
    <div class="wrapper" v-if="isLoaded" id="app">
      <LandingPage :user="userDataComputed.user" />
      <Description
        :user="userDataComputed.user"
        :content="userDataComputed.description"
        :links="userDataComputed.links"
      />
      <Experience :content="userDataComputed.experiences" />
      <Skills
        v-if="userDataComputed.skills.length"
        :skills="userDataComputed.skills"
      />
      <Projects :projects="userDataComputed.projects" />
      <Footer :user="userDataComputed.user" :links="userDataComputed.links" />
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import LandingPage from "./components/LandingPage.vue";
import Description from "./components/Description.vue";
import Experience from "./components/Experience.vue";
import Skills from "./components/Skills.vue";
import Projects from "./components/Projects.vue";
import Footer from "./components/Footer.vue";

import userData from "./data.js";

const isLoaded = ref(true);

const userDataComputed = computed(() => {
  return userData;
});
</script>

<style scoped lang="scss">
#app {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrapper {
  height: 100%;
}
</style>
