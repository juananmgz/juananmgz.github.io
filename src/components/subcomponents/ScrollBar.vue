<template>
  <div :class="['scroll-bar', { middle: current != 0 }]">
    <!-- Loop through the number of sections -->
    <div v-for="index in number" :key="index" class="diamond-wrapper" @click="scrollToSection(index - 1)">
      <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" :class="['diamond', { 'diamond--selected': isSelected(index - 1) }]" viewBox="0 0 39 39">
        <rect
          :width="isSelected(index - 1) ? '20' : '10'"
          :height="isSelected(index - 1) ? '20' : '10'"
          :x="isSelected(index - 1) ? '7' : '10'"
          :y="isSelected(index - 1) ? '7' : '10'"
          :class="['diamond-rect', { 'diamond-rect--selected': isSelected(index - 1) }]"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollBar",
  props: {
    number: Number,
    current: Number,
  },
  methods: {
    isSelected(index) {
      return this.current === index;
    },
    scrollToSection(index) {
      // Scroll to the section corresponding to the clicked diamond
      const sections = document.querySelectorAll(".section");

      if (sections) {
        sections[index].scrollIntoView({ behavior: "smooth" });
        this.$emit("update-current", index);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/subcomponents/scroll-bar";
</style>
