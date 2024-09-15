<template>
  <div :class="cornersClass">
    <div class="desc box-highlight-wrap">
      <div class="box-header" v-if="header">
        <p class="box-header-headline">{{ this.header.headline }}</p>

        <div class="box-subheader">
          <p class="box-header-subheadline">{{ this.header.subheadline }}</p>
          <p class="box-header-subcomment">{{ this.header.subcomment }}</p>
        </div>
        <div class="box-round-image">
          <figure>
            <img :src="header.imgURL" :alt="header.headline + ' picture'" class="rounded-circle" width="80" />
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
export default {
  name: "Box",
  props: {
    text: String,
    header: Object,
    corners: String,
  },
  computed: {
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
