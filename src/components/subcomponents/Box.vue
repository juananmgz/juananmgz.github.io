<template>
  <div :class="cornersClass">
    <div class="desc box-highlight-wrap">
      <div :class="['box-header ', isAlwaysOpened ? 'opened' : '']" v-if="header">
        <div class="box-headline">
          <p class="box-header-headline">{{ this.header.headline }}</p>
          <p class="box-see-details" v-if="!isAlwaysOpened">See details</p>
        </div>

        <div class="box-subheader">
          <p class="box-header-subheadline">{{ this.header.subheadline }}</p>
          <p class="box-header-subcomment">{{ this.header.subcomment }}</p>
        </div>
      </div>
      <div class="box-round-image" v-if="header">
        <figure>
          <img v-if="header && header.imgURL" :src="header.imgURL" :alt="header.headline + ' picture'" class="rounded-circle" width="80" />
        </figure>
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
    isAlwaysOpened: Boolean,
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
