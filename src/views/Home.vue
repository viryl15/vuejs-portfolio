<template>
  <!-- Loading state -->
  <div v-if="!isLoaded" class="loading-container">
    <LoadingSpinner size="large" text="Loading Portfolio..." />
  </div>

  <!-- Main content with enhanced transitions -->
  <EnhancedTransition name="fade" mode="out-in" :duration="500" v-else>
    <div class="wrapper" id="app">
      <LandingPage :user="userDataComputed.user" />

      <EnhancedTransition name="slide-up" :delay="200">
        <Description
          :user="userDataComputed.user"
          :content="userDataComputed.description"
          :links="userDataComputed.links"
          class="section-animate"
        />
      </EnhancedTransition>

      <EnhancedTransition name="slide-up" :delay="400">
        <Experience
          :content="userDataComputed.experiences"
          class="section-animate"
        />
      </EnhancedTransition>

      <EnhancedTransition
        name="slide-up"
        :delay="600"
        v-if="userDataComputed.skills.length"
      >
        <Skills :skills="userDataComputed.skills" class="section-animate" />
      </EnhancedTransition>

      <EnhancedTransition name="slide-up" :delay="800">
        <Projects
          :projects="userDataComputed.projects"
          class="section-animate"
        />
      </EnhancedTransition>

      <EnhancedTransition name="fade" :delay="1000">
        <Footer
          :user="userDataComputed.user"
          :links="userDataComputed.links"
          class="section-animate"
        />
      </EnhancedTransition>
    </div>
  </EnhancedTransition>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import EnhancedTransition from "../components/EnhancedTransition.vue";
import LandingPage from "../components/LandingPage.vue";
import Description from "../components/Description.vue";
import Experience from "../components/Experience.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import Footer from "../components/Footer.vue";

import userData from "../data.js";

const isLoaded = ref(false);

// Simulate realistic loading time
onMounted(() => {
  // Simulate data loading, image preloading, etc.
  setTimeout(() => {
    isLoaded.value = true;
  }, 1500); // 1.5 second loading
});

const userDataComputed = computed(() => {
  return userData;
});
</script>

<style scoped lang="scss">
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 9999;
}

#app {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrapper {
  height: 100%;
}

.section-animate {
  opacity: 1;
  transform: translateY(0);
}

// Enhanced page transitions
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
