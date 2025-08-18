<template>
  <div class="timeline-update">
    <div class="timeline-update-inner">
      <div class="timeline-update-header">
        <div class="timeline-update-time">
          <div class="timeline-icon">
            <font-awesome-icon :icon="['fas', 'code']" />
          </div>
          <span class="time-text">{{ timeAgo }}</span>
        </div>
        <div class="timeline-update-tags">
          <span v-for="tag in tagArray" :key="tag" class="tag">{{
            tag.trim()
          }}</span>
        </div>
        <h3 class="timeline-update-title">{{ title }}</h3>
      </div>

      <div class="timeline-update-image" v-if="thumbnail">
        <img :src="thumbnail" :alt="title" />
      </div>

      <div class="timeline-update-description" v-html="description"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  props: {
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "blue",
    },
    icon: {
      type: String,
      default: "code",
    },
  },
  computed: {
    timeAgo() {
      const now = new Date();
      const diffTime = Math.abs(now - this.date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);

      if (diffYears > 0) {
        return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
      } else if (diffMonths > 0) {
        return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
      } else {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      }
    },
    tagArray() {
      return this.category ? this.category.split("|") : [];
    },
  },
};
</script>

<style scoped lang="scss">
.timeline-update {
  margin-bottom: 3rem;
  position: relative;

  &:not(:last-child):after {
    content: "";
    position: absolute;
    left: 20px;
    top: 100%;
    width: 2px;
    height: 3rem;
    background: linear-gradient(
      to bottom,
      map.get($colors, primary),
      transparent
    );
  }

  .timeline-update-inner {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 60px;
  }

  .timeline-update-header {
    position: relative;

    .timeline-update-time {
      position: absolute;
      left: -80px;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .timeline-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      .time-text {
        font-size: 0.8rem;
        color: map.get($colors, secondary);
        text-align: center;
        white-space: nowrap;
      }
    }

    .timeline-update-tags {
      margin-bottom: 1rem;

      .tag {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.7rem;
        font-weight: 600;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .timeline-update-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: map.get($colors, light);
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .timeline-update-image {
    margin-bottom: 1.5rem;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
  }

  .timeline-update-description {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.8;
    font-size: 0.95rem;

    :deep(a) {
      color: #667eea;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    :deep(br) {
      margin-bottom: 0.5rem;
    }
  }
}

// Mobile responsive
@media (max-width: #{map.get($breakpoints, small)}) {
  .timeline-update {
    .timeline-update-inner {
      margin-left: 0;
      padding: 1.5rem;
    }

    .timeline-update-header .timeline-update-time {
      position: static;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 1rem;

      .timeline-icon {
        margin-right: 1rem;
        margin-bottom: 0;
      }
    }

    &:not(:last-child):after {
      display: none;
    }
  }
}
</style>
