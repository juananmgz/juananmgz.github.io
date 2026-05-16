<template>
  <div id="background-container" class="container-fluid section">
    <div id="background-title-shadow" class="title-shadow">
      <h1 v-html="this.backgroundText.join('<br />')"></h1>
    </div>
    <div id="background-main" class="row">
      <div id="background-left" class="col-5">
        <div id="background-title">
          <h2 class="title" v-html="this.title"></h2>
          <div class="paragraph-cluster">
            <p v-for="(p, i) in this.paragraph" :key="i" v-html="p"></p>
          </div>
        </div>
        <Menu id="background-list" :categories="categories" @select="onSelect" />
      </div>
      <div id="background-text" class="col-6 offset-1">
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
import background from "@/assets/messages/background.js";

export default {
  name: "Background",
  components: {
    Box,
    Menu,
  },
  data: function () {
    return {
      title: background.en.title,
      backgroundText: background.en.backgroundText,
      paragraph: background.en.paragraph,
      categories: background.en.categories,
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
@import "@/scss/background";
</style>
