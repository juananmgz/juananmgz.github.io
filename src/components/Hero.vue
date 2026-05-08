<template>
  <div id="hero-wrapper">
    <div id="hero-container" class="container-fluid section">
      <div class="row">
        <div id="text-column" class="col-6 offset-1">
          <div id="hero-title">
            <h1 class="hero-my-name">JUAN ANTONIO MUÑOZ GÓMEZ</h1>
            <h2><span class="hero-frontend">FRONTEND</span> <span class="hero-developer">DEVELOPER</span></h2>
            <div id="hero-buttons">
              <a href="/documents/CV.pdf" download="CV_Juan_Antonio_Munoz_Gomez.pdf"><button>Download CV</button></a>
              <button @click="scrollToSection">Contact Me</button>
            </div>
          </div>
        </div>
        <div id="picture-column" class="col-5">
          <img :src="image" width="1286" height="1876" alt="Juan Antonio Muñoz Gómez" fetchpriority="high" decoding="async" />
        </div>
      </div>
    </div>

    <div id="hero-title-shadow" class="title-shadow">
      <h1>FRONTEND<br />DEVELOPER</h1>
    </div>
  </div>
</template>

<script>
import image from "@/assets/images/hero-profile-pic.webp";

export default {
  name: "Header",
  data: function () {
    return {
      image,
    };
  },
  methods: {
    scrollToSection() {
      const element = document.getElementById("contact-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        this.$emit("update-current", 4);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/main";
</style>

<style scoped lang="scss">
@import "@/scss/hero";
</style>
