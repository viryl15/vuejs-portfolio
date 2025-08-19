import { ref, onMounted, nextTick } from 'vue'

export function useStaggerAnimation(options = {}) {
  const {
    delay = 100,
    duration = 600,
    selector = '.stagger-item',
    rootMargin = '0px 0px -100px 0px'
  } = options

  const containerRef = ref(null)
  const isVisible = ref(false)
  const observer = ref(null)

  const initializeStagger = () => {
    if (!containerRef.value) return

    const items = containerRef.value.querySelectorAll(selector)
    
    items.forEach((item, index) => {
      // Set initial state
      item.style.opacity = '0'
      item.style.transform = 'translateY(30px)'
      item.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      item.style.transitionDelay = `${index * delay}ms`
    })
  }

  const animateIn = () => {
    if (!containerRef.value || isVisible.value) return

    isVisible.value = true
    const items = containerRef.value.querySelectorAll(selector)
    
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1'
        item.style.transform = 'translateY(0)'
      }, index * delay)
    })
  }

  const animateOut = () => {
    if (!containerRef.value || !isVisible.value) return

    isVisible.value = false
    const items = containerRef.value.querySelectorAll(selector)
    
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '0'
        item.style.transform = 'translateY(-30px)'
      }, index * (delay / 2))
    })
  }

  const setupIntersectionObserver = () => {
    if (!containerRef.value) return

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateIn()
          }
        })
      },
      {
        rootMargin,
        threshold: 0.1
      }
    )

    observer.value.observe(containerRef.value)
  }

  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  onMounted(async () => {
    await nextTick()
    initializeStagger()
    setupIntersectionObserver()
  })

  return {
    containerRef,
    isVisible,
    animateIn,
    animateOut,
    cleanup
  }
}

// Utility function for manual stagger animations
export function staggerElements(elements, options = {}) {
  const {
    delay = 100,
    duration = 600,
    from = { opacity: 0, transform: 'translateY(30px)' },
    to = { opacity: 1, transform: 'translateY(0)' }
  } = options

  elements.forEach((element, index) => {
    // Set initial state
    Object.assign(element.style, {
      ...from,
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${index * delay}ms`
    })

    // Trigger animation
    setTimeout(() => {
      Object.assign(element.style, to)
    }, 50)
  })
}

// Preset animations
export const staggerPresets = {
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  fadeDown: {
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  fadeLeft: {
    from: { opacity: 0, transform: 'translateX(-30px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  },
  fadeRight: {
    from: { opacity: 0, transform: 'translateX(30px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  },
  scale: {
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' }
  },
  rotate: {
    from: { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
    to: { opacity: 1, transform: 'rotate(0deg) scale(1)' }
  }
}
