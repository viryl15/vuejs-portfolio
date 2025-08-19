<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </div>
      <div class="footer-info">
        <font-awesome-icon class="copyright-icon" icon="copyright" />
        {{ new Date().getFullYear() }} {{ user.name }} | Get this template
        <a href="https://github.com/viryl15/vuejs-portfolio" target="_blank"
          >here</a
        >
        !
      </div>
      <SocialBar :links="links" />
    </div>
  </footer>
</template>

<script>
import SocialBar from "./SocialBar.vue";
export default {
  name: "Footer",
  props: ["user", "links"],
  components: {
    SocialBar,
  },
};
</script>

<style scoped lang="scss">
$bg-footer: map.get($colors, primary) !default;

.footer {
  padding: 20px;
  background-color: $bg-footer;
  color: map.get($colors, light);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-nav {
  display: flex;
  gap: 20px;

  .nav-link {
    color: map.get($colors, light);
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: map.get($colors, light);
      text-decoration: none;
    }

    &.router-link-active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}

.footer-info {
  flex: 1;
  text-align: center;

  a {
    color: map.get($colors, light);
    text-decoration: underline;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.copyright-icon {
  font-size: 1.5rem;
  vertical-align: middle;
}

:deep(.social-wrap) {
  .icon {
    font-size: 2.8rem;
    &:hover {
      color: map.get($colors, light);
    }
  }
}

:deep(li) {
  margin-bottom: 0 !important;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-nav {
    order: 3;
  }

  .footer-info {
    order: 1;
  }

  :deep(.social-wrap) {
    order: 2;
  }
}
</style>
