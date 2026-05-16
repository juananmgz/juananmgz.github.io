<template>
  <div id="summary-container" class="container-fluid section">
    <div id="summary-title-shadow" class="title-shadow">
      <h1 v-html="this.backgroundText.join('<br />')"></h1>
    </div>
    <div id="summary-main" class="row">
      <div id="summary-content" class="col-10 offset-1">
        <h2 class="title" v-html="this.title"></h2>
        <Box :text="this.paragraph" corners="top-left"></Box>
      </div>
    </div>
  </div>
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";

/* Messages */
import summary from "@/assets/messages/summary.js";

export default {
  name: "Summary",
  components: {
    Box,
  },
  data: function () {
    return {
      title: summary.en.title,
      backgroundText: summary.en.backgroundText,
      paragraph: summary.en.paragraph,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/summary";
</style>
