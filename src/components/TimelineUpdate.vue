<template>
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content" :style="{ 'border-left-color': color }">
      <div class="timeline-header">
        <h4>{{ title }}</h4>
        <span class="timeline-date">{{ formattedDate }}</span>
        <span v-if="category" class="timeline-category">{{ category }}</span>
      </div>
      <div v-if="thumbnail" class="timeline-thumbnail">
        <img :src="thumbnail" :alt="title" />
      </div>
      <div class="timeline-description">
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: Date,
  title: String,
  description: String,
  thumbnail: String,
  color: {
    type: String,
    default: '#3C6E71'
  },
  category: String,
  icon: String
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  return props.date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})
</script>

<style scoped lang="scss">
.timeline-item {
  position: relative;
  padding-left: 30px;
  margin-bottom: 30px;
  
  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: -30px;
    width: 2px;
    background: #ddd;
  }
  
  &:last-child::before {
    bottom: 20px;
  }
}

.timeline-marker {
  position: absolute;
  left: 5px;
  top: 10px;
  width: 12px;
  height: 12px;
  background: v-bind(color);
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #ddd;
}

.timeline-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid v-bind(color);
}

.timeline-header {
  margin-bottom: 15px;
  
  h4 {
    margin: 0 0 5px 0;
    color: #333;
  }
}

.timeline-date {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  color: #666;
}

.timeline-category {
  background: v-bind(color);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  margin-left: 10px;
}

.timeline-thumbnail {
  margin-bottom: 15px;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
}

.timeline-description {
  p {
    margin: 0;
    line-height: 1.6;
    color: #555;
  }
}
</style>
