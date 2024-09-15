<template>
  <div id="background-container" class="container-fluid section">
    <div id="background-title" class="row">
      <div class="col-10 offset-1">
        <h2 class="title" v-html="this.title"></h2>
        <p v-html="this.paragraph"></p>
      </div>
    </div>
    <div id="background-data" class="row d-flex align-items-center">
      <div id="background-list" class="col-3 offset-1 text-end">
        <div v-for="item in listElements" :key="item" @mouseover="select(item)" class="d-flex justify-end align-items-center">
          <p :class="[isSelected(item) ? 'selected' : '', 'text-uppercase highlight']">{{ item }}</p>
          <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" class="selected-mark">
            <rect v-if="isSelected(item)" width="15" height="15" x="46.5" y="-32.75" />
          </svg>
        </div>
      </div>
      <div id="background-text" class="col-5 offset-1">
        <Box :header="this.header" :text="this.selected.desc" corners="top-right"></Box>
      </div>
    </div>
  </div>

  <div id="background-title-shadow" class="title-shadow">
    <h1 v-html="this.title"></h1>
  </div>
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";

/* Messages */
import background from "@/assets/messages/background.js";

export default {
  name: "Background",
  components: {
    Box,
  },
  data: function () {
    return {
      title: background.en.title,
      paragraph: background.en.paragraph,
      background: this.backgroundFormat(),
      awards: background.en.awards,
      selected: { title: "" },
    };
  },
  mounted() {
    this.selected = this.background[0];
  },
  computed: {
    /* Formats selectable elements of list */
    listElements() {
      return this.background ? this.background.map((el) => el.title) : [];
    },
    header() {
      return {
        imgURL: this.selected.imgURL,
        headline: this.selected.title,
        subheadline: this.selected.position,
        subcomment: this.selected.duration,
      };
    },
  },
  methods: {
    /* Formats background (experience + education + awards) */
    backgroundFormat() {
      // Experience
      let formatted = [...background.en.experience];

      // Education
      var educationDesc = background.en.education.desc;

      if (background.en.education.courses.length > 0) {
        educationDesc += "<ul>";
        for (var course of background.en.education.courses) {
          educationDesc += "<li>" + course.title + "." + "<span class='font-italic'>" + course.entity + "</span> (" + course.year + ") </li>";
        }
        educationDesc += "</ul>";
      }

      let education = {
        title: background.en.education.title,
        imgURL: background.en.education.imgURL,
        position: background.en.education.position,
        duration: "",
        desc: educationDesc,
      };

      formatted.push(education);

      // Awards
      var awardDesc = background.en.awards.awardsEngineering.desc;

      if (background.en.awards.awardsMusic.awards.length > 0) {
        educationDesc += "<ul>";
        for (var award of background.en.awards.awardsEngineering.awards) {
          awardDesc += "<li><span class='highlight font-default'>" + award.title + "</span>. " + "<span class='font-italic'>" + award.organization + "</span> </li>";
        }
        educationDesc += "</ul>";
      }

      awardDesc += "<br/>" + background.en.awards.awardsMusic.desc;

      if (background.en.awards.awardsMusic.awards.length > 0) {
        educationDesc += "<ul>";
        for (var award of background.en.awards.awardsMusic.awards) {
          awardDesc += "<li>" + award.title + "." + award.organization + "</li>";
        }
        educationDesc += "</ul>";
      }

      let awards = {
        title: background.en.awards.title,
        imgURL: background.en.awards.imgURL,
        position: background.en.awards.position,
        duration: "",
        desc: awardDesc,
      };

      formatted.push(awards);

      return formatted;
    },
    isSelected(item) {
      return this.selected.title == item;
    },
    select(item) {
      this.selected = this.background.filter((el) => el.title == item)[0];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/background";
</style>
