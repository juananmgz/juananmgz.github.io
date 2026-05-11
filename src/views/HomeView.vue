<template class="home">
  <ScrollBar :number="numberOfSections" :current="currentSectionIndex" @update-current="updateCurrent" />
  <Hero @update-current="updateCurrent" />
  <AboutMe />
  <Summary />
  <Background />
  <Feedback />
  <Contact />
</template>

<script>
import Hero from "@/components/Hero.vue";
import AboutMe from "@/components/AboutMe.vue";
import Summary from "@/components/Summary.vue";
import Background from "@/components/Background.vue";
import Contact from "@/components/Contact.vue";
import Feedback from "@/components/Feedback.vue";
import ScrollBar from "@/components/subcomponents/ScrollBar.vue";

export default {
  name: "HomeView",
  components: {
    Hero,
    AboutMe,
    Summary,
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

      this.observer = new IntersectionObserver(
        (entries) => {
          let bestRatio = 0;
          let bestIdx = -1;
          entries.forEach((entry) => {
            if (entry.intersectionRatio > bestRatio) {
              const idx = sections.indexOf(entry.target);
              if (idx !== -1) {
                bestRatio = entry.intersectionRatio;
                bestIdx = idx;
              }
            }
          });
          if (bestIdx !== -1 && bestRatio > 0.5) {
            this.currentSectionIndex = bestIdx;
          }
        },
        { threshold: [0.5, 0.75, 1] }
      );

      sections.forEach((s) => this.observer.observe(s));
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/main";
</style>
