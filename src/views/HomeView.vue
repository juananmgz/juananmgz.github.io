<template class="home">
  <ScrollBar :number="numberOfSections" :current="currentSectionIndex" @update-current="updateCurrent" />
  <Hero @update-current="updateCurrent" />
  <AboutMe />
  <Background />
  <Feedback />
  <Contact />
</template>

<script>
import Hero from "@/components/Hero.vue";
import AboutMe from "@/components/AboutMe.vue";
import Background from "@/components/Background.vue";
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
      sectionRatios: [],
    };
  },
  mounted() {
    this.observeSections();
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    updateCurrent(newSectionIndex) {
      this.currentSectionIndex = newSectionIndex;
    },
    observeSections() {
      const sections = Array.from(document.querySelectorAll(".section"));
      this.numberOfSections = sections.length;
      this.sectionRatios = new Array(sections.length).fill(0);

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = sections.indexOf(entry.target);
            if (idx !== -1) {
              this.sectionRatios[idx] = entry.intersectionRatio;
            }
          });
          const maxIdx = this.sectionRatios.indexOf(Math.max(...this.sectionRatios));
          if (maxIdx !== -1) this.currentSectionIndex = maxIdx;
        },
        { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
      );

      sections.forEach((s) => this.observer.observe(s));
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/main";
</style>
