<template>
  <div id="hero-container" class="container-fluid section">
    <div class="row">
      <div id="text-column" class="col-6 offset-1">
        <div id="hero-title">
          <h1 class="hero-my-name">JUAN ANTONIO MUÑOZ GÓMEZ</h1>
          <h2><span class="hero-frontend">FRONTEND</span> <span class="hero-developer">DEVELOPER</span></h2>
          <div id="hero-buttons">
            <button @click="downloadCV">Download CV</button>
            <button @click="scrollToSection">Contact Me</button>
          </div>
        </div>
      </div>
      <div id="picture-column" class="col-5">
        <img :src="image" />
      </div>
    </div>
  </div>

  <div id="hero-title-shadow" class="title-shadow">
    <h1>FRONTEND<br />DEVELOPER</h1>
  </div>
</template>

<script>
import image from "@/assets/images/hero-profile-pic.png";

export default {
  name: "Header",
  data: function () {
    return {
      image,
    };
  },
  methods: {
    downloadCV() {
      // Define the path to the file you want to download
      const fileUrl = "/documents/CV.pdf";

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "CV_Juan_Antonio_Muñoz_Gomez.pdf";

      // Append the link to the body and trigger a click
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    },
    scrollToSection() {
      const element = document.getElementById("contact-container");
      console.log(element);
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
