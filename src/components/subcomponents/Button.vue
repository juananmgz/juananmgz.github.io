<template>
  <div class="button d-flex justify-content-between align-items-center">
    <div>
      <h3 v-html="title" class="text-gold-light"></h3>
      <p v-html="desc" class="text-gold-light"></p>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="114.5px"
      height="114.5px"
    >
      <path
        fill-rule="evenodd"
        d="M25.375,57.842 L25.375,56.248 L86.027,56.248 L82.118,52.261 C81.908,51.959 81.946,51.547 82.207,51.287 C82.467,51.027 82.881,50.990 83.184,51.198 L88.603,56.513 C88.727,56.696 88.790,56.913 88.781,57.133 C88.773,57.324 88.711,57.507 88.603,57.665 C86.767,59.437 84.931,61.208 83.095,62.980 C82.821,63.100 82.511,63.065 82.295,62.891 C82.024,62.673 81.938,62.263 82.118,61.917 C83.450,60.559 84.783,59.200 86.116,57.842 C49.069,57.842 62.421,57.842 25.375,57.842 ZM25.330,57.802 L25.330,56.288 M1.602,56.811 L56.811,1.602 L112.500,57.291 L57.291,112.500 L1.602,56.811 ZM2.802,56.811 L56.811,2.802 L111.300,57.291 L57.291,111.300 L2.802,56.811 Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
    desc: String,
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/subcomponents/button";
</style>
