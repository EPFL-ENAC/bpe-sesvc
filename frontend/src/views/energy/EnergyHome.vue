<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Energy</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <energy-project-list></energy-project-list>
      </v-col>
      <v-col>
        <energy-template-list></energy-template-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import EnergyProjectList from "@/components/energy/EnergyProjectList.vue";
import EnergyTemplateList from "@/components/energy/EnergyTemplateList.vue";
import "vue-class-component/hooks";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    EnergyProjectList,
    EnergyTemplateList,
  },
})
export default class EnergyHome extends Vue {}
</script>