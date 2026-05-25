<template>
  <div id="hero-wrapper">
    <div id="hero-container" class="container-fluid section">
      <div class="row">
        <div id="text-column" class="col-6 offset-1">
          <div id="hero-title">
            <h1 class="hero-my-name">JUAN ANTONIO MUÑOZ GÓMEZ</h1>
            <h2><span class="hero-frontend">FRONTEND</span> <span class="hero-developer outlined">DEVELOPER</span></h2>
            <div id="hero-buttons">
              <a href="/documents/CV.pdf" download="CV_Juan_Antonio_Munoz_Gomez.pdf"><button>Download CV</button></a>
              <button @click="scrollToSection">Contact Me</button>
            </div>
          </div>
        </div>
        <div id="picture-column" class="col-5">
          <div id="parallax-character">
            <img
              id="layer-body"
              :src="imgBody"
              alt=""
            />
            <img
              id="layer-face"
              :src="imgFace"
              alt=""
              :style="layerStyle(1)"
            />
            <img
              id="layer-eyes"
              :src="imgEyes"
              alt="Juan Antonio Muñoz Gómez"
              fetchpriority="high"
              decoding="async"
              :style="layerStyle(2)"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="hero-title-shadow" class="title-shadow">
      <h1 v-html="backgroundText.join('<br />')"></h1>
    </div>
  </div>
</template>

<script>
import imgBody from "@/assets/images/Juanan_flat__cuerpo.png";
import imgFace from "@/assets/images/Juanan_flat__cara.png";
import imgEyes from "@/assets/images/Juanan_flat__ojos.png";
import hero from "@/assets/messages/hero.js";

const DEPTHS = [0, 12, 22];

export default {
  name: "Header",
  data() {
    return {
      imgBody,
      imgFace,
      imgEyes,
      backgroundText: hero.en.backgroundText,
      mouseX: 0,
      mouseY: 0,
    };
  },
  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
  },
  methods: {
    onMouseMove(e) {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    layerStyle(index) {
      const d = DEPTHS[index];
      const x = this.mouseX * d;
      const y = this.mouseY * d;
      return { transform: `translate(${x}px, ${y}px)` };
    },
    scrollToSection() {
      const element = document.getElementById("contact-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
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
