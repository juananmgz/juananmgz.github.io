<template>
  <div id="career-container" class="container-fluid section">
    <div id="career-title" class="row">
      <div class="col-10 offset-1">
        <h2 class="title" v-html="this.title"></h2>
        <p v-html="this.paragraph"></p>
      </div>
    </div>
    <div id="career-data" class="row d-flex align-items-center">
      <div id="career-list" class="col-3 offset-1 text-end">
        <div v-for="item in listElements" :key="item" @mouseover="select(item)" class="d-flex justify-end align-items-center">
          <p :class="[isSelected(item) ? 'selected' : '', 'text-uppercase highlight']">{{ item }}</p>
          <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" class="selected-mark">
            <rect v-if="isSelected(item)" width="15" height="15" x="46.5" y="-32.75" />
          </svg>
        </div>
      </div>
      <div id="career-text" class="col-5 offset-1">
        <Box :header="this.header" :text="this.selected.desc" corners="top-right"></Box>
      </div>
    </div>
  </div>

  <div id="career-title-shadow" class="title-shadow">
    <h1 v-html="this.title"></h1>
  </div>
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";

/* Messages */
import career from "@/assets/messages/career.js";

export default {
  name: "career",
  components: {
    Box,
  },
  data: function () {
    return {
      title: career.en.title,
      paragraph: career.en.paragraph,
      career: this.careerFormat(),
      awards: career.en.awards,
      selected: { title: "" },
    };
  },
  mounted() {
    this.selected = this.career[0];
  },
  computed: {
    /* Formats selectable elements of list */
    listElements() {
      return this.career ? this.career.map((el) => el.title) : [];
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
    /* Formats career (experience + education + awards) */
    careerFormat() {
      // Experience
      let formatted = [...career.en.experience];

      // Education
      var educationDesc = career.en.education.desc;

      if (career.en.education.courses.length > 0) {
        educationDesc += "<ul>";
        for (var course of career.en.education.courses) {
          educationDesc += "<li>" + course.title + "." + "<span class='font-italic'>" + course.entity + "</span> (" + course.year + ") </li>";
        }
        educationDesc += "</ul>";
      }

      let education = {
        title: career.en.education.title,
        imgURL: career.en.education.imgURL,
        position: career.en.education.position,
        duration: "",
        desc: educationDesc,
      };

      formatted.push(education);

      // Awards
      var awardDesc = career.en.awards.awardsEngineering.desc;

      if (career.en.awards.awardsMusic.awards.length > 0) {
        educationDesc += "<ul>";
        for (var award of career.en.awards.awardsEngineering.awards) {
          awardDesc += "<li><span class='highlight font-default'>" + award.title + "</span>. " + "<span class='font-italic'>" + award.organization + "</span> </li>";
        }
        educationDesc += "</ul>";
      }

      awardDesc += "<br/>" + career.en.awards.awardsMusic.desc;

      if (career.en.awards.awardsMusic.awards.length > 0) {
        educationDesc += "<ul>";
        for (var award of career.en.awards.awardsMusic.awards) {
          awardDesc += "<li>" + award.title + "." + award.organization + "</li>";
        }
        educationDesc += "</ul>";
      }

      let awards = {
        title: career.en.awards.title,
        imgURL: career.en.awards.imgURL,
        position: career.en.awards.position,
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
      this.selected = this.career.filter((el) => el.title == item)[0];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/career";
</style>
