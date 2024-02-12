 <template>
  <div class="social-wrap">
    <ul class="social-bar">
      <li>
        <a href="https://twitter.com/Viryl3" target="_blank">
          <svg style="margin-bottom: 1.1rem;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
          </svg>
        </a>
      </li>
      <li>
        <a :href="links.facebook" target="_blank">
          <font-awesome-icon class="icon" :icon="['fab', 'facebook-square']" />
        </a>
      </li>
      <li>
        <a :href="links.instagram" target="_blank">
          <font-awesome-icon class="icon" :icon="['fab', 'instagram-square']" />
        </a>
      </li>
      <li>
        <a :href="links.linkedin" target="_blank">
          <font-awesome-icon class="icon" :icon="['fab', 'linkedin']" />
        </a>
      </li>
      <li>
        <a :href="links.github" target="_blank">
          <font-awesome-icon class="icon" :icon="['fab', 'github-square']" />
        </a>
      </li>
      <li>
        <a :href="links.stackoverflow" target="_blank">
          <svg style="margin-bottom: 1.4rem;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512">
            <path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"/>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'SocialBar',
        props: ['links'],
    }
</script>

<style scoped lang="scss">
  @import '@/styles/constants.scss';
 .social-wrap {
    li {
      display: inline-block;
      margin-right: 10px;
    }
    .icon {
      font-size: 3rem;
    }
  }
</style>