<template>
  <div id="contact-container" class="container section">
    <div id="contact-title" class="row">
      <div class="col-10 offset-1">
        <h2 class="title" v-html="this.title"></h2>
        <p v-html="this.paragraph"></p>
      </div>
    </div>

    <div id="contact-form">
      <form @submit.prevent="handleSubmit" class="container">
        <div class="row">
          <div class="form-field offset-1 col-4">
            <label class="highlight" for="name">{{ name.title }}</label>
            <input type="text" id="name" v-model="form.name" :placeholder="name.placeholder" />
          </div>

          <div class="form-field offset-2 col-4">
            <label class="highlight" for="email">{{ email.title }}</label>
            <input type="email" id="email" v-model="form.email" :placeholder="email.placeholder" />
          </div>
        </div>

        <div class="row">
          <div class="form-field offset-1 col-10">
            <label class="highlight" for="description">{{ message.title }}</label>
            <textarea id="description" v-model="form.description" :placeholder="message.placeholder"></textarea>
          </div>
        </div>

        <div class="row d-flex justify-content-center">
          <button id="contact-submit-button" type="submit" :disabled="!isValid">Shoot</button>
        </div>
      </form>
    </div>
  </div>

  <div id="contact-title-shadow" class="title-shadow">
    <h1 v-html="this.title"></h1>
  </div>
</template>

<script>
/* Messages */
import contact from "@/assets/messages/contact.js";

export default {
  name: "Contact",
  data: function () {
    return {
      title: contact.en.title,
      paragraph: contact.en.paragraph,
      name: contact.en.name,
      email: contact.en.email,
      message: contact.en.message,
      form: {
        name: "",
        email: "",
        description: "",
      },
    };
  },
  computed: {
    isValid() {
      if (!this.form) {
        return false;
      }

      if (!this.form.name) {
        return false;
      }

      if (!this.form.email) {
        return false;
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        return false;
      }

      if (!this.form.description) {
        return false;
      }

      return true;
    },
  },
  methods: {
    handleSubmit() {
      console.log("ere");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/main";
</style>

<style scoped lang="scss">
@import "@/scss/contact";
</style>
