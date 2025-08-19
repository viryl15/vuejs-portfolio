<template>
  <header class="header parallax">
    <div class="name">
      <div class="wrapper-name">
        <AnimateOnVisible name="fadeDown" ::duration="1">
          <h1>{{ user.name }}</h1>
        </AnimateOnVisible>
        <hr />
        <AnimateOnVisible name="fadeUp" ::duration="1">
          <p>{{ user.status }}</p>
        </AnimateOnVisible>
        <AnimateOnVisible name="fadeUp" ::duration="1.5">
          <div class="contact-actions">
            <router-link to="/contact" class="contact-btn">
              Get In Touch
            </router-link>
            <div class="resume-download-hero">
              <ResumeDownload variant="compact" />
            </div>
          </div>
        </AnimateOnVisible>
      </div>
    </div>
  </header>
</template>

<script>
import ResumeDownload from "./ResumeDownload.vue";

export default {
  name: "Landing-Page",
  props: ["user"],
  components: {
    ResumeDownload,
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 20px;
  background-color: map.get($colors, dark);
}

.parallax {
  background-image: url("../assets/img/bg.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 400;

  .wrapper-name {
    width: 250px;
  }

  h1 {
    font-size: 2.3rem;
    padding: 2px 10px;
    text-align: center;
    text-transform: uppercase;
    color: whitesmoke;
  }

  p {
    font-size: 1.5rem;
    text-align: center;
    margin: 5px auto;
    color: whitesmoke;
  }

  hr {
    border: 1px solid whitesmoke;
  }

  .contact-actions {
    text-align: center;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
      gap: 25px;
    }
  }

  .resume-download-hero {
    display: flex;
    justify-content: center;
  }

  .contact-btn {
    display: inline-block;
    padding: 15px 30px;
    background-color: transparent;
    color: whitesmoke;
    text-decoration: none;
    border: 2px solid whitesmoke;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;

    &:hover {
      background-color: whitesmoke;
      color: map.get($colors, dark);
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      text-decoration: none;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }
}

@media (min-width: #{map.get($breakpoints, small)}) {
  .name {
    .wrapper-name {
      width: 55%;
    }
    h1 {
      font-size: 2.8rem;
      padding: 4% 8%;
    }
    p {
      font-size: 2rem;
    }
  }
}
@media (min-width: #{map.get($breakpoints, medium)}) {
  .name {
    .wrapper-name {
      width: 450px;
    }
    h1 {
      font-size: 4rem;
      padding: 4% 10%;
    }
    p {
      font-size: 2.5rem;
    }
  }
}
@media only screen and (max-device-width: 1024px) {
  .parallax {
    background-attachment: scroll;
  }
}
</style>
