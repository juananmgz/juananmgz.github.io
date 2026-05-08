<template>
  <div id="background-container" class="container-fluid section">
    <div id="background-main" class="row">
      <div id="background-left" class="col-4 offset-1">
        <div id="background-title">
          <h2 class="title" v-html="this.title"></h2>
          <p v-html="this.paragraph"></p>
        </div>
        <div id="background-list">
          <div class="main-column text-end">
            <div v-for="cat in categories" :key="cat.key" :class="['main-cell', { selected: isCategorySelected(cat.key) }]" @mouseover="selectCategory(cat.key)">
              <div class="main-cell-inner">
                <p :class="[isCategorySelected(cat.key) ? 'selected' : '', 'text-uppercase highlight']">{{ cat.title }}</p>
              </div>
            </div>
          </div>
          <div class="submenu-column text-end">
            <div v-for="item in selectedCategory.items" :key="item.key" class="menu-row d-flex justify-end align-items-center" @mouseover="selectItem(item.key)">
              <p :class="[isItemSelected(item.key) ? 'selected' : '', 'text-uppercase highlight']">{{ item.title }}</p>
              <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" class="selected-mark">
                <rect v-if="isItemSelected(item.key)" width="15" height="15" x="46.5" y="-32.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div id="background-text" class="col-5">
        <Box :header="this.header" :text="this.selected.desc" corners="top-right"></Box>
      </div>
    </div>
  </div>

  <div id="background-title-shadow" class="title-shadow">
    <h1 v-html="this.title"></h1>
  </div>
</template>

<script>
/* Components */
import Box from "@/components/subcomponents/Box.vue";

/* Messages */
import background from "@/assets/messages/background.js";

export default {
  name: "Background",
  components: {
    Box,
  },
  data: function () {
    return {
      title: background.en.title,
      paragraph: background.en.paragraph,
      categories: background.en.categories,
      selectedCategoryKey: background.en.categories[0].key,
      selectedItemKey: background.en.categories[0].items[0].key,
    };
  },
  computed: {
    selectedCategory() {
      return this.categories.find((c) => c.key === this.selectedCategoryKey) || this.categories[0];
    },
    selected() {
      const cat = this.selectedCategory;
      return cat.items.find((i) => i.key === this.selectedItemKey) || cat.items[0];
    },
    header() {
      return {
        imgURL: this.selected.imgURL,
        headline: this.selected.title,
        subheadline: this.selected.position,
        subcomment: this.selected.duration,
      };
    },
  },
  methods: {
    isCategorySelected(key) {
      return this.selectedCategoryKey === key;
    },
    isItemSelected(key) {
      return this.selectedItemKey === key;
    },
    selectCategory(key) {
      if (this.selectedCategoryKey === key) return;
      this.selectedCategoryKey = key;
      const cat = this.categories.find((c) => c.key === key);
      if (cat && cat.items.length) this.selectedItemKey = cat.items[0].key;
    },
    selectItem(key) {
      this.selectedItemKey = key;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
@import "@/scss/background";
</style>
