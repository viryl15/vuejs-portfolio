<template>
  <div class="timeline-update">
    <div class="timeline-update-inner">
      <div class="timeline-update-header">
        <div class="timeline-update-time">
          <div class="timeline-icon" :style="{ background: colorGradient }">
            <font-awesome-icon :icon="['fas', 'code']" />
          </div>
          <span class="time-text">{{ timeAgo }}</span>
        </div>
        <div class="timeline-update-tags">
          <span
            v-for="tag in tagArray"
            :key="tag"
            class="tag"
            :style="{ background: colorGradient }"
            >{{ tag.trim() }}</span
          >
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
    colorGradient() {
      const colorMap = {
        blue: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
        green: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        orange: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        purple: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
        yellow: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
        white: "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)",
        grey: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
        gray: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
      };
      return colorMap[this.color] || colorMap.blue;
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
    margin-left: 80px;
  }

  .timeline-update-header {
    position: relative;

    .timeline-update-time {
      position: absolute;
      left: -100px;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .timeline-icon {
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
        font-size: 1.2rem;
        color: rgba(173, 216, 255, 0.95);
        text-align: center;
        white-space: nowrap;
        font-weight: 500;
      }
    }

    .timeline-update-tags {
      margin-bottom: 1rem;

      .tag {
        display: inline-block;
        color: white;
        padding: 0.4rem 1rem;
        border-radius: 15px;
        font-size: 1rem;
        font-weight: 600;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .timeline-update-title {
      font-size: 2rem;
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
    font-size: 1.6rem;

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
