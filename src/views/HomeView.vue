<template class="home">
  <ScrollBar :number="numberOfSections" :current="currentSectionIndex" @update-current="updateCurrent" />
  <div id="sections-wrapper" ref="wrapper">
    <div class="slide"><Hero @update-current="updateCurrent" /></div>
    <div class="slide"><AboutMe /></div>
    <div class="slide"><Summary /></div>
    <div class="slide"><Background /></div>
    <div class="slide"><Feedback /></div>
    <div class="slide"><Contact /></div>
  </div>
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
    this.attachWheel();
    this.attachParallax();
    this.updateParallax();
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("resize", this.updateParallax);
    const wrapper = this.$refs.wrapper;
    if (wrapper) {
      wrapper.removeEventListener("scroll", this.updateParallax);
    }
  },
  methods: {
    updateCurrent(newSectionIndex) {
      this.currentSectionIndex = newSectionIndex;
    },
    observeSections() {
      const wrapper = this.$refs.wrapper;
      const sections = Array.from(wrapper.querySelectorAll(".section"));
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
        { root: wrapper, threshold: [0.5, 0.75, 1] },
      );

      sections.forEach((s) => this.observer.observe(s));
    },
    attachWheel() {
      const wrapper = this.$refs.wrapper;
      this.wheelLock = false;
      this.wheelAccum = 0;
      this.idleTimer = null;
      const THRESHOLD = 30;
      const IDLE_MS = 200;

      this.normalizeDelta = (e) => {
        let dy = e.deltaY;
        let dx = e.deltaX;
        if (e.deltaMode === 1) {
          dy *= 16;
          dx *= 16;
        } else if (e.deltaMode === 2) {
          dy *= window.innerHeight;
          dx *= window.innerWidth;
        }
        return { dy, dx };
      };

      this.onWheel = (e) => {
        const { dy, dx } = this.normalizeDelta(e);
        if (Math.abs(dy) <= Math.abs(dx)) return;
        if (e.cancelable) e.preventDefault();

        clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => {
          this.wheelLock = false;
          this.wheelAccum = 0;
        }, IDLE_MS);

        if (this.wheelLock) return;

        this.wheelAccum += dy;
        if (Math.abs(this.wheelAccum) < THRESHOLD) return;

        const dir = this.wheelAccum > 0 ? 1 : -1;
        this.wheelAccum = 0;
        this.wheelLock = true;

        const vw = wrapper.clientWidth;
        const slides = wrapper.querySelectorAll(".slide").length;
        const currentIdx = Math.round(wrapper.scrollLeft / vw);
        const targetIdx = Math.max(0, Math.min(slides - 1, currentIdx + dir));
        const targetLeft = targetIdx * vw;

        if (typeof wrapper.scrollTo === "function") {
          wrapper.scrollTo({ left: targetLeft, behavior: "smooth" });
        } else {
          wrapper.scrollLeft = targetLeft;
        }
      };
      window.addEventListener("wheel", this.onWheel, { passive: false });
    },
    attachParallax() {
      const wrapper = this.$refs.wrapper;
      wrapper.addEventListener("scroll", this.updateParallax, { passive: true });
      window.addEventListener("resize", this.updateParallax);
    },
    updateParallax() {
      const wrapper = this.$refs.wrapper;
      if (!wrapper) return;
      const slides = wrapper.querySelectorAll(".slide");
      const sl = wrapper.scrollLeft;
      const vw = wrapper.clientWidth || 1;
      slides.forEach((slide, i) => {
        const slideLeft = i * vw;
        const p = (slideLeft - sl) / vw;
        slide.style.setProperty("--parallax-y", `${-p * 100}vh`);
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/main";
</style>
