<template>
  <div class="loading-spinner-container" :class="{ [`size-${size}`]: true }">
    <div class="spinner" :class="{ [`variant-${variant}`]: true }">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: "medium", // 'small', 'medium', 'large'
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  variant: {
    type: String,
    default: "primary", // 'primary', 'secondary', 'white'
    validator: (value) => ["primary", "secondary", "white"].includes(value),
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &.size-small {
    .spinner {
      width: 30px;
      height: 30px;
    }
    .loading-text {
      font-size: 12px;
    }
  }

  &.size-medium {
    .spinner {
      width: 40px;
      height: 40px;
    }
    .loading-text {
      font-size: 14px;
    }
  }

  &.size-large {
    .spinner {
      width: 60px;
      height: 60px;
    }
    .loading-text {
      font-size: 16px;
    }
  }
}

.spinner {
  position: relative;
  display: inline-block;

  .spinner-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  &.variant-primary {
    .spinner-ring {
      border-top-color: #667eea;
      border-right-color: #764ba2;
    }
  }

  &.variant-secondary {
    .spinner-ring {
      border-top-color: #4299e1;
      border-right-color: #553c9a;
    }
  }

  &.variant-white {
    .spinner-ring {
      border-top-color: #ffffff;
      border-right-color: rgba(255, 255, 255, 0.8);
    }
  }
}

.loading-text {
  color: #666;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
