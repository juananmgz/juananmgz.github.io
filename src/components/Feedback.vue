<template>
  <div id="feedback-container" class="container-fluid section">
    <div id="feedback-data" class="row d-flex align-items-center">
      <div id="feedback-title" class="d-xl-none d-block">
        <h2 class="title" v-html="this.title"></h2>
        <p v-html="this.paragraph"></p>
      </div>
      <div class="col-4 offset-1 text-end d-none d-xl-block">
        <div id="feedback-title">
          <h2 class="title" v-html="this.title"></h2>
          <p v-html="this.paragraph"></p>
        </div>
        <div id="feedback-list">
          <div v-for="item in listElements" :key="item" @mouseover="select(item.position)" class="d-flex justify-end align-items-center">
            <p :class="[isSelected(item.position) ? 'selected' : '', 'text-uppercase highlight']">
              {{ item.position }} <br />
              <span class="small">({{ item.company }})</span>
            </p>
            <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" class="selected-mark">
              <rect v-if="isSelected(item.position)" width="15" height="15" x="46.5" y="-32.75" />
            </svg>
          </div>
        </div>
      </div>
      <div id="feedback-text" class="d-none d-xl-block col-xl-5 offset-xl-1">
        <Box :header="this.headerSelected" :text="this.selected.desc" corners="top-right"></Box>
      </div>
      <div id="feedback-text-small" v-for="item in comments" :key="item" class="d-xl-none d-block col-12">
        <Box
          :header="{
            imgURL: item.imgURL,
            headline: item.author,
            subheadline: item.company,
            subcomment: item.position,
          }"
          :text="item.desc"
          corners="top-right"
          :isAlwaysOpened="true"
        ></Box>
      </div>
    </div>
  </div>

  <!-- <div id="feedback-title-shadow" class="title-shadow">
    <h1 v-html="this.title"></h1>
  </div> -->
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";

/* Messages */
import feedback from "@/assets/messages/feedback.js";

export default {
  name: "Feedback",
  components: {
    Box,
  },
  data: function () {
    return {
      title: feedback.en.title,
      paragraph: feedback.en.paragraph,
      comments: feedback.en.comments,
      selected: { position: "" },
    };
  },
  mounted() {
    this.selected = this.comments[0];
  },
  computed: {
    /* Formats selectable elements of list */
    listElements() {
      return this.comments
        ? this.comments.map((el) => ({
            position: el.position,
            company: el.company,
          }))
        : [];
    },
    headerSelected() {
      return {
        imgURL: this.selected.imgURL,
        headline: this.selected.author,
        subheadline: this.selected.company,
        subcomment: this.selected.position,
      };
    },
  },
  methods: {
    isSelected(item) {
      return this.selected.position == item;
    },
    select(item) {
      this.selected = this.comments.filter((el) => el.position == item)[0];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/feedback";
</style>
