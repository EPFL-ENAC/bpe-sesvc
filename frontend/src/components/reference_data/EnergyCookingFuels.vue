<template>
  <div class="ma-3">
    <v-data-table :headers="fuelHeaders" :items="fuels"></v-data-table>
  </div>
</template>

<script lang="ts">
import { CookingFuel } from "@/models/energyModel";
import { DatabaseName, SyncDatabase } from "@/utils/couchdb";
import "vue-class-component/hooks";
import { Component, Vue } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";

@Component
export default class EnergyCookingFuels extends Vue {
  readonly fuelHeaders: TableHeader<keyof CookingFuel>[] = (
    [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Name",
        value: "energy",
        unit: "MJ/kg",
      },
      {
        text: "Emission factor for CO2",
        value: "emissionFactorCo2",
        unit: "kg/kg of fuel",
      },
      {
        text: "Price",
        value: "price",
        unit: "$/kg",
      },
    ] as TableHeader<keyof CookingFuel>[]
  ).map(this.mapHeader);

  fuels: CookingFuel[] = [];

  created(): void {
    const fuelsDatabase = new SyncDatabase<CookingFuel>(
      DatabaseName.EnergyCookingFuels
    );
    fuelsDatabase
      .getAllDocuments()
      .then((documents) => (this.fuels = documents))
      .finally(() => fuelsDatabase.cancel());
  }

  mapHeader<V extends string>(header: TableHeader<V>): TableHeader<V> {
    if (header.unit) {
      header.text = `${header.text} [${header.unit}]`;
    }
    return header;
  }
}

interface TableHeader<V extends string> extends DataTableHeader {
  value: V;
  unit?: string;
}
</script>
