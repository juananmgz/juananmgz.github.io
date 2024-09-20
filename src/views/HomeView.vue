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
import Background from "@/components/Career.vue";
import Contact from "@/components/Contact.vue";
import Feedback from "@/components/Feedback.vue";
import ScrollBar from "@/components/subcomponents/ScrollBar.vue";

/* Enums */
import ScreenSizesEnum from "@/enums/ScreenSizesEnum.js";

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
    window.innerWidth < ScreenSizesEnum.XL ? this.addScrollEvent_SmallScreenSize() : this.addScrollEvent_BigScreenSize();
  },
  beforeDestroy() {
    this.removeScrollEvent();
  },
  methods: {
    updateCurrent(newSectionIndex) {
      this.currentSectionIndex = newSectionIndex;
    },
    addScrollEvent_SmallScreenSize() {
      const sections = document.querySelectorAll(".section");
      this.numberOfSections = sections.length;
      let isScrolling = false;

      const handleScroll = (event) => {
        // Find the current section
        const tempCurrentSectionIndex = Array.from(sections).findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top >= window.innerHeight / 2 && rect.top < window.innerHeight * 1.5;
        });

        this.currentSectionIndex = tempCurrentSectionIndex - 1;

        if (this.currentSectionIndex < 0) {
          this.currentSectionIndex = this.numberOfSections - 1;
        }
      };

      window.addEventListener("wheel", handleScroll, { passive: false });
      this.$options.handleScroll = handleScroll; // Store the handler for cleanup
    },
    addScrollEvent_BigScreenSize() {
      const sections = document.querySelectorAll(".section");
      this.numberOfSections = sections.length;
      let isScrolling = false;

      const handleScroll = (event) => {
        let target = event.target;
        while (target && target !== document) {
          if (target.classList.contains("margened")) {
            return;
          }
          target = target.parentNode;
        }
        // Prevent default scroll behavior
        event.preventDefault();
        if (isScrolling) {
          return;
        }
        isScrolling = true;
        // Determine scroll direction
        const delta = event.deltaY;
        // Find the current section
        const tempCurrentSectionIndex = Array.from(sections).findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top >= 0 && rect.top < window.innerHeight;
        });
        let targetSectionIndex = tempCurrentSectionIndex;
        // Scroll up or down
        if (delta > 0 && tempCurrentSectionIndex < sections.length - 1) {
          // Scroll down
          targetSectionIndex++;
        } else if (delta < 0 && tempCurrentSectionIndex > 0) {
          // Scroll up
          targetSectionIndex--;
        }
        // Scroll to the target section
        sections[targetSectionIndex].scrollIntoView({ behavior: "smooth" });
        this.currentSectionIndex = targetSectionIndex;
        // Delay further scrolling until the current one finishes
        setTimeout(() => {
          isScrolling = false;
        }, 1500);
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
