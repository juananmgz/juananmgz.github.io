<template>
  <div id="feedback-container" class="container-fluid section">
    <div id="feedback-title-shadow" class="title-shadow">
      <h1 v-html="this.title"></h1>
    </div>
    <div id="feedback-main" class="row">
      <div id="feedback-left" class="col-5">
        <div id="feedback-title">
          <h2 class="title" v-html="this.title"></h2>
          <div class="paragraph-cluster">
            <p v-for="(p, i) in this.paragraph" :key="i" v-html="p"></p>
          </div>
        </div>
        <Menu id="feedback-list" :categories="categories" @select="onSelect" />
      </div>
      <div id="feedback-text" class="col-7">
        <Box :header="this.header" :text="this.selected && this.selected.desc" corners="top-right"></Box>
      </div>
    </div>
  </div>
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";
import Menu from "@/components/subcomponents/Menu.vue";

/* Messages */
import feedback from "@/assets/messages/feedback.js";

export default {
  name: "Feedback",
  components: {
    Box,
    Menu,
  },
  data: function () {
    return {
      title: feedback.en.title,
      paragraph: feedback.en.paragraph,
      categories: feedback.en.categories,
      selected: null,
    };
  },
  computed: {
    header() {
      if (!this.selected) return null;
      return {
        imgURL: this.selected.imgURL,
        headline: this.selected.title,
        subheadline: this.selected.position,
        subcomment: this.selected.duration,
      };
    },
  },
  methods: {
    onSelect(item) {
      this.selected = item;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/feedback";
</style>
