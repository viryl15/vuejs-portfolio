<template>
  <section id="projects">
    <AnimateOnVisible name="fadeDown" :duration="1">
      <Title
        class="title"
        :title="'MY PROJECTS'"
        :description="'THIS IS MY STORY'"
      />
    </AnimateOnVisible>

    <div class="container-fluid center-block">
      <article class="content text-center">
        <div class="timeline-container mx-auto" ref="projectsContainer">
          <div
            v-for="(post, index) in projects"
            :key="index"
            class="stagger-item project-hover"
            :style="{ '--stagger-delay': index }"
          >
            <AnimateOnVisible name="fadeLeft" :duration="0.5">
              <Timeline
                :date="new Date(post.delivery_date)"
                :title="post.title"
                :description="post.description"
                :thumbnail="getImgUrl(post.image)"
                :color="post.color"
                :category="post.tag"
                icon="code"
                class="timeline-item-enhanced"
              />
            </AnimateOnVisible>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import Title from "./Title.vue";
import Timeline from "./Timeline.vue";
import { useStaggerAnimation } from "../composables/useStaggerAnimation.js";

export default {
  name: "Projects",
  props: ["projects"],
  components: {
    Title,
    Timeline,
  },
  setup() {
    const projectsContainer = ref(null);

    // Initialize stagger animation
    const { containerRef } = useStaggerAnimation({
      delay: 150,
      duration: 800,
      selector: ".stagger-item",
    });

    onMounted(() => {
      containerRef.value = projectsContainer.value;
    });

    return {
      projectsContainer,
    };
  },
  methods: {
    getImgUrl(img) {
      if (img === undefined || img === "") return "";
      if (/.*:\/\/.*/.exec(img) !== null) return img;
      return new URL(`../assets/img/projects/${img}`, import.meta.url).href;
    },
  },
};
</script>

<style scoped lang="scss">
$linear: map.get($colors, dark);

#projects {
  background-color: color.adjust(map.get($colors, primary), $lightness: 5%);
}

.title {
  color: map.get($colors, light);
}

:deep(.text-wrapper) {
  &:after {
    border-bottom: 1px solid map.get($colors, dark);
  }
}

// Enhanced project items with hover effects
.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: calc(var(--stagger-delay, 0) * 150ms);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-hover {
  // Inline hover-lift effect instead of @extend
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

    .timeline-item-enhanced {
      transform: scale(1.02);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.timeline-item-enhanced {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    .project-image {
      transform: scale(1.05);
    }
  }
}

article .inner {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  z-index: 1;
}

.content {
  color: map.get($colors, light);
  margin-top: 30px;
  header {
    height: 100%;
    width: 70%;
  }
  h1 {
    font-size: 3rem;
  }
}

.vertical-center {
  display: flex;
  align-items: center;
}

h1 {
  margin-top: 10px;
  margin-bottom: 20px;
}

.timeline-container {
  max-width: 800px;
  text-align: left;
}
</style>
