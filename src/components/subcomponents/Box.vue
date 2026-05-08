<template>
  <div :class="cornersClass">
    <div class="desc box-highlight-wrap">
      <div class="box-header" v-if="header">
        <div class="box-header-text">
          <p class="box-header-headline">{{ this.header.headline }}</p>

          <div class="box-subheader">
            <transition name="header-collapse">
              <p v-if="header.subheadline" class="box-header-subheadline">{{ this.header.subheadline }}</p>
            </transition>
            <transition name="header-collapse">
              <p v-if="header.subcomment" class="box-header-subcomment">{{ this.header.subcomment }}</p>
            </transition>
          </div>
        </div>
        <div class="box-round-image">
          <figure>
            <img :src="imgSrc" :alt="(header.headline || '') + ' picture'" class="rounded-circle" width="80" height="80" loading="lazy" decoding="async" @error="onImgError" />
          </figure>
        </div>
      </div>
      <div class="box-content text-hightlight-wrap">
        <p :class="{ margened: header }" v-for="paragraph in textFormat" :key="paragraph" v-html="paragraph"></p>
      </div>
    </div>
  </div>
</template>

<script>
import placeholderLogo from "@/assets/images/placeholder-logo.svg";

export default {
  name: "Box",
  props: {
    text: String,
    header: Object,
    corners: String,
  },
  methods: {
    onImgError(e) {
      e.target.src = placeholderLogo;
    },
  },
  computed: {
    imgSrc() {
      return this.header && this.header.imgURL ? this.header.imgURL : placeholderLogo;
    },
    textFormat() {
      if (!this.text) {
        return "";
      }

      const splittedText = this.text.split("<br/>");
      return splittedText;
    },
    cornersClass() {
      return "box-highlight " + this.corners;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
</style>
