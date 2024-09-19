<template>
  <div id="about-me-container" class="container-fluid section">
    <div class="row d-flex align-items-center">
      <div id="coding-sec" class="col-12 col-xl-7 offset-xl-4">
        <h2 v-html="this.coding.title" class="title d-xl-none d-block"></h2>
        <Box :text="this.coding.desc" corners="top-left" class="desc"></Box>
        <h2 v-html="this.coding.title" class="title d-none d-xl-block"></h2>
      </div>
      <div id="design-sec" class="col-12 col-xl-7 offset-xl-1">
        <h2 v-html="this.design.title" class="title d-xl-none d-block"></h2>
        <h2 v-html="this.design.title" class="title d-none d-xl-block"></h2>
        <Box :text="this.design.desc" :corners="designCorners"></Box>
      </div>
    </div>
  </div>
  <div id="about-me-title-shadow" class="d-none d-xl-block">
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

/* Enums */
import ScreenSizesEnum from "@/enums/ScreenSizesEnum.js";

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
  computed: {
    designCorners() {
      return window.innerWidth < ScreenSizesEnum.XL ? "top-right" : "bottom-right";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/about-me";
</style>
