<template>
  <section id="skills">
    <AnimateOnVisible name="fadeDown" :duration="1">
      <Title :title="'SKILLS'" :description="'HERE IS MY ARMAMENT'" />
    </AnimateOnVisible>

    <div class="section-content">
      <div class="container-fluid">
        <div
          class="row d-flex flex-wrap align-items-center"
          ref="skillsContainer"
        >
          <div
            class="col-md-2 m-auto pb-4 stagger-item"
            v-for="(skill, index) in skills"
            :key="index"
            :style="{ '--stagger-delay': index }"
          >
            <AnimateOnVisible name="bounce">
              <div class="skill-item skill-hover">
                <div class="skill-logo img-hover">
                  <img
                    id="imgLogo"
                    class="img-responsive mx-auto d-block"
                    :src="getImgUrl(skill.img)"
                    :alt="skill.title"
                  />
                </div>
                <div id="divAlt" class="skill-text altCaption text-center">
                  {{ skill.title }}
                </div>
              </div>
            </AnimateOnVisible>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import Title from "./Title.vue";
import { useStaggerAnimation } from "../composables/useStaggerAnimation.js";

export default {
  name: "Skills",
  components: {
    Title,
  },
  props: ["skills"],
  setup() {
    const skillsContainer = ref(null);

    // Initialize stagger animation
    const { containerRef } = useStaggerAnimation({
      delay: 100,
      duration: 600,
      selector: ".stagger-item",
    });

    onMounted(() => {
      containerRef.value = skillsContainer.value;
    });

    return {
      skillsContainer,
    };
  },
  methods: {
    getImgUrl(img) {
      return new URL(`../assets/img/logo/${img}`, import.meta.url).href;
    },
  },
};
</script>

<style scoped lang="scss">
#skills {
  background-color: color.adjust(map.get($colors, dark), $lightness: 100%);
}

// Enhanced skill items with stagger and hover effects
.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: calc(var(--stagger-delay, 0) * 100ms);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-item {
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
}

.skill-logo {
  margin-bottom: 12px;
  transition: transform 0.3s ease;

  img {
    max-width: 64px;
    height: auto;
    transition: all 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

    &:hover {
      transform: scale(1.1) rotate(5deg);
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
    }
  }
}

.skill-text {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  .skill-item:hover & {
    color: #667eea;
    transform: translateY(-2px);
  }
}

@media (min-width: #{map.get($breakpoints, medium)}) {
  .section-content {
    width: 80%;
    margin: 0 auto;
  }
}

// Mobile responsive adjustments
@media (max-width: 768px) {
  .skill-item {
    padding: 16px;
    margin-bottom: 16px;

    &:hover {
      transform: translateY(-4px) scale(1.02);
    }
  }

  .skill-logo img {
    max-width: 48px;
  }

  .skill-text {
    font-size: 12px;
  }
}

img {
  max-width: 120px;
}

.altCaption {
  color: map.get($colors, secondary);
  margin-top: 1rem;
}
</style>
