<template>
  <div>
    <h3>{{ user.name }}</h3>
    <div class="data"><strong>E-mail:</strong> {{ user.email }}</div>
    <div class="data"><strong>Phone:</strong> {{ user.phone }}</div>
    <div class="data"><strong>City:</strong> {{ user.city }}</div>
    <div class="data"><strong>Languages:</strong> {{ user.lang }}</div>

    <!-- Resume Download Button -->
    <div class="resume-section">
      <ResumeDownload />
    </div>

    <SocialBar :links="links" />
  </div>
</template>

<script>
import SocialBar from "./SocialBar.vue";
import ResumeDownload from "./ResumeDownload.vue";

export default {
  name: "PersonnalCard",
  props: ["user", "links"],
  components: {
    SocialBar,
    ResumeDownload,
  },
};
</script>

<style scoped lang="scss">
.data {
  margin-bottom: 15px;
}

.resume-section {
  margin: 25px 0;
  display: flex;
  justify-content: left;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
}
</style>
