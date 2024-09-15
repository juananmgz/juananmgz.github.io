<template>
  <div id="about-me-container" class="container-fluid section">
    <div class="row vh-100 d-flex align-items-center">
      <div id="coding-sec" class="col-7 offset-4">
        <Box :text="this.coding.desc" corners="top-left" class="desc"></Box>
        <h2 class="title" v-html="this.coding.title"></h2>
      </div>
      <div id="design-sec" class="col-7 offset-1">
        <h2 class="title" v-html="this.design.title"></h2>
        <Box :text="this.design.desc" corners="bottom-right"></Box>
      </div>
    </div>
  </div>
  <div id="about-me-title-shadow">
    <div id="coding-title-shadow" class="title-shadow">
      <h1 v-html="this.coding.title"></h1>
    </div>
    <div id="design-title-shadow" class="title-shadow">
      <h1 v-html="this.design.title"></h1>
    </div>
  </div>
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";

/* Messages */
import aboutMe from "@/assets/messages/aboutMe.js";

export default {
  name: "AboutMe",
  components: {
    Box,
  },
  data: function () {
    return {
      coding: {
        title: aboutMe.en.coding.title,
        desc: aboutMe.en.coding.desc,
      },
      design: {
        title: aboutMe.en.design.title,
        desc: aboutMe.en.design.desc,
      },
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/about-me";
</style>
