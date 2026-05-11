<template>
  <div class="menu-list">
    <div class="main-column text-end">
      <div
        v-for="cat in categories"
        :key="cat.key"
        :class="['main-cell', { selected: isCategorySelected(cat.key) }]"
        @mouseover="selectCategory(cat.key)"
      >
        <div class="main-cell-inner">
          <p :class="[isCategorySelected(cat.key) ? 'selected' : '', 'text-uppercase highlight']">{{ cat.title }}</p>
        </div>
      </div>
    </div>
    <div class="submenu-column text-end">
      <div
        v-for="item in selectedCategory.items"
        :key="item.key"
        class="menu-row d-flex justify-end align-items-center"
        @mouseover="selectItem(item.key)"
      >
        <p :class="[isItemSelected(item.key) ? 'selected' : '', 'text-uppercase highlight']">{{ item.title }}</p>
        <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" class="selected-mark">
          <rect v-if="isItemSelected(item.key)" width="15" height="15" x="46.5" y="-32.75" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  emits: ["select"],
  data() {
    return {
      selectedCategoryKey: this.categories[0]?.key,
      selectedItemKey: this.categories[0]?.items?.[0]?.key,
    };
  },
  computed: {
    selectedCategory() {
      return this.categories.find((c) => c.key === this.selectedCategoryKey) || this.categories[0];
    },
    selectedItem() {
      const cat = this.selectedCategory;
      return cat.items.find((i) => i.key === this.selectedItemKey) || cat.items[0];
    },
  },
  mounted() {
    this.$emit("select", this.selectedItem);
  },
  watch: {
    selectedItem(item) {
      this.$emit("select", item);
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
@import "@/scss/subcomponents/menu";
</style>
