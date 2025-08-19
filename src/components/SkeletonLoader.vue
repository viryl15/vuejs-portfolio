<template>
  <div class="skeleton-loader" :class="{ animate: animate }">
    <!-- Text skeletons -->
    <div
      v-if="type === 'text'"
      class="skeleton-text"
      :style="{ width: width, height: height }"
    ></div>

    <!-- Card skeleton -->
    <div v-else-if="type === 'card'" class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-text skeleton-title"></div>
        <div class="skeleton-text skeleton-subtitle"></div>
        <div class="skeleton-text skeleton-description"></div>
      </div>
    </div>

    <!-- Project card skeleton -->
    <div v-else-if="type === 'project'" class="skeleton-project">
      <div class="skeleton-project-image"></div>
      <div class="skeleton-project-content">
        <div class="skeleton-text skeleton-project-title"></div>
        <div class="skeleton-text skeleton-project-tech"></div>
        <div class="skeleton-text skeleton-project-desc"></div>
        <div class="skeleton-project-buttons">
          <div class="skeleton-button"></div>
          <div class="skeleton-button"></div>
        </div>
      </div>
    </div>

    <!-- Experience item skeleton -->
    <div v-else-if="type === 'experience'" class="skeleton-experience">
      <div class="skeleton-experience-icon"></div>
      <div class="skeleton-experience-content">
        <div class="skeleton-text skeleton-exp-title"></div>
        <div class="skeleton-text skeleton-exp-company"></div>
        <div class="skeleton-text skeleton-exp-date"></div>
        <div class="skeleton-text skeleton-exp-desc"></div>
      </div>
    </div>

    <!-- Custom skeleton -->
    <div
      v-else
      class="skeleton-custom"
      :style="{ width: width, height: height, borderRadius: borderRadius }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "text", // 'text', 'card', 'project', 'experience', 'custom'
    validator: (value) =>
      ["text", "card", "project", "experience", "custom"].includes(value),
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "20px",
  },
  borderRadius: {
    type: String,
    default: "4px",
  },
  animate: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss">
.skeleton-loader {
  .skeleton-text,
  .skeleton-custom,
  .skeleton-image,
  .skeleton-project-image,
  .skeleton-experience-icon,
  .skeleton-button {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    border-radius: 4px;
  }

  &.animate {
    .skeleton-text,
    .skeleton-custom,
    .skeleton-image,
    .skeleton-project-image,
    .skeleton-experience-icon,
    .skeleton-button {
      animation: shimmer 2s infinite;
    }
  }
}

// Text skeleton
.skeleton-text {
  height: 20px;
  margin: 8px 0;

  &.skeleton-title {
    height: 24px;
    width: 70%;
    margin-bottom: 12px;
  }

  &.skeleton-subtitle {
    height: 18px;
    width: 50%;
    margin-bottom: 8px;
  }

  &.skeleton-description {
    height: 16px;
    width: 90%;
  }
}

// Card skeleton
.skeleton-card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;

  .skeleton-image {
    height: 150px;
    margin-bottom: 16px;
    border-radius: 8px;
  }

  .skeleton-content {
    .skeleton-title {
      height: 20px;
      width: 60%;
      margin-bottom: 12px;
    }

    .skeleton-subtitle {
      height: 16px;
      width: 40%;
      margin-bottom: 8px;
    }

    .skeleton-description {
      height: 14px;
      width: 85%;
    }
  }
}

// Project skeleton
.skeleton-project {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  .skeleton-project-image {
    height: 200px;
    border-radius: 0;
  }

  .skeleton-project-content {
    padding: 20px;

    .skeleton-project-title {
      height: 24px;
      width: 70%;
      margin-bottom: 12px;
    }

    .skeleton-project-tech {
      height: 16px;
      width: 80%;
      margin-bottom: 8px;
    }

    .skeleton-project-desc {
      height: 14px;
      width: 95%;
      margin-bottom: 16px;
    }

    .skeleton-project-buttons {
      display: flex;
      gap: 12px;

      .skeleton-button {
        height: 36px;
        width: 100px;
        border-radius: 6px;
      }
    }
  }
}

// Experience skeleton
.skeleton-experience {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  border-left: 4px solid #e5e5e5;

  .skeleton-experience-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .skeleton-experience-content {
    flex: 1;

    .skeleton-exp-title {
      height: 20px;
      width: 60%;
      margin-bottom: 8px;
    }

    .skeleton-exp-company {
      height: 16px;
      width: 40%;
      margin-bottom: 6px;
    }

    .skeleton-exp-date {
      height: 14px;
      width: 30%;
      margin-bottom: 12px;
    }

    .skeleton-exp-desc {
      height: 14px;
      width: 90%;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .skeleton-loader {
    .skeleton-text,
    .skeleton-custom,
    .skeleton-image,
    .skeleton-project-image,
    .skeleton-experience-icon,
    .skeleton-button {
      background: linear-gradient(90deg, #2a2a2a 25%, #1a1a1a 50%, #2a2a2a 75%);
      background-size: 200% 100%;
    }
  }

  .skeleton-card {
    border-color: #404040;
  }

  .skeleton-experience {
    border-left-color: #404040;
  }
}
</style>
