<template>
  <main class="about-view d-flex space-between">
    <v-card class="about ma-4" elevation="2">
      <v-card-text>
        <h2 class="ma-10" data-cy="aboutDisclaimer">Disclaimer</h2>
        <p class="mx-10">
          Please report any bugs
          <a href="https://github.com/EPFL-ENAC/bpe-sesvc/issues">here</a>
        </p>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <h2 class="ma-10">Map attributions</h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="mx-10" v-html="attributionMapFull"></p>
      </v-card-text>
    </v-card>
    <app-logo />
  </main>
</template>

<script lang="ts">
import AppLogo from "@/components/commons/AppLogo.vue";
import { attributionMapFull } from "@/utils/mapWorld";
import Vue from "vue";

export default Vue.extend({
  name: "AboutView",
  components: {
    AppLogo,
  },
  data() {
    return {
      attributionMapFull,
    };
  },
});
</script>

<style lang="scss" scoped>
.about-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 0 auto;
  height: 100%;
}
</style>
