<template class="home">
  <ScrollBar :number="numberOfSections" :current="currentSectionIndex" @update-current="updateCurrent" />
  <Hero @update-current="updateCurrent" />
  <AboutMe />
  <!-- <Background /> -->
  <!-- <Feedback /> -->
  <Contact />
</template>

<script>
import Hero from "@/components/Hero.vue";
import AboutMe from "@/components/AboutMe.vue";
import Background from "@/components/Career.vue";
import Contact from "@/components/Contact.vue";
import Feedback from "@/components/Feedback.vue";
import ScrollBar from "@/components/subcomponents/ScrollBar.vue";

export default {
  name: "HomeView",
  components: {
    Hero,
    AboutMe,
    Background,
    Feedback,
    Contact,
    ScrollBar,
  },
  data: function () {
    return {
      numberOfSections: 0,
      currentSectionIndex: 0,
    };
  },
  mounted() {
    this.addScrollEvent();
  },
  beforeDestroy() {
    this.removeScrollEvent();
  },
  watch: {
    currentSectionIndex(newValue) {
      if (newValue < 0) {
        this.currentSectionIndex = this.numberOfSections - 1;
      }
    },
  },
  methods: {
    updateCurrent(newSectionIndex) {
      this.currentSectionIndex = newSectionIndex;
    },
    addScrollEvent() {
      const sections = document.querySelectorAll(".section");
      this.numberOfSections = sections.length;

      const handleScroll = (event) => {
        // Find the current section
        const tempCurrentSectionIndex = Array.from(sections).findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top >= window.innerHeight / 2 && rect.top < window.innerHeight * 1.5;
        });
        this.currentSectionIndex = tempCurrentSectionIndex - 1;
      };
      window.addEventListener("wheel", handleScroll, { passive: false });
      this.$options.handleScroll = handleScroll; // Store the handler for cleanup
    },
    removeScrollEvent() {
      if (this.$options.handleScroll) {
        window.removeEventListener("wheel", this.$options.handleScroll);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/main";
</style>
