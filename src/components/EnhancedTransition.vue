<template>
  <transition
    :name="name"
    :mode="mode"
    :duration="duration"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </transition>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "fade",
  },
  mode: {
    type: String,
    default: "out-in",
  },
  duration: {
    type: [Number, Object],
    default: 300,
  },
  delay: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  "before-enter",
  "enter",
  "after-enter",
  "before-leave",
  "leave",
  "after-leave",
]);

// Enhanced transition handlers
const onBeforeEnter = (el) => {
  if (props.delay > 0) {
    el.style.animationDelay = `${props.delay}ms`;
  }
  emit("before-enter", el);
};

const onEnter = (el, done) => {
  emit("enter", el, done);
  if (done) done();
};

const onAfterEnter = (el) => {
  emit("after-enter", el);
};

const onBeforeLeave = (el) => {
  emit("before-leave", el);
};

const onLeave = (el, done) => {
  emit("leave", el, done);
  if (done) done();
};

const onAfterLeave = (el) => {
  emit("after-leave", el);
};
</script>

<style lang="scss">
// Fade transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Slide transitions
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

// Scale transitions
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

// Zoom transitions
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.zoom-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

// Rotate transitions
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(-10deg) scale(0.9);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotate(10deg) scale(1.1);
}

// Bounce transitions
.bounce-enter-active {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.bounce-leave-active {
  animation: bounce-out 0.3s ease-in;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}

// Flip transitions
.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}

// Page transitions
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

// Stagger group
.stagger-item {
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stagger-enter-active {
  transition-delay: calc(var(--stagger-delay, 0) * 50ms);
}

.stagger-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
