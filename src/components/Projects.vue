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
        <div class="timeline-container mx-auto">
          <AnimateOnVisible
            v-for="(post, index) in projects"
            :key="index"
            name="fadeLeft"
            :duration="0.5"
          >
            <Timeline
              :date="new Date(post.delivery_date)"
              :title="post.title"
              :description="post.description"
              :thumbnail="getImgUrl(post.image)"
              :color="post.color"
              :category="post.tag"
              icon="code"
            />
          </AnimateOnVisible>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import Title from "./Title.vue";
import Timeline from "./Timeline.vue";

export default {
  name: "Projects",
  props: ["projects"],
  components: {
    Title,
    Timeline,
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
