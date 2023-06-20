<template>
  <div class="ma-3">
    <v-data-table :headers="stoveHeaders" :items="stoves">
      <template #[`item.energyEfficiency`]="{ item }">
        {{ item.energyEfficiency * 100 }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { CookingStove } from "@/models/energyModel";
import { DatabaseName, SyncDatabase } from "@/utils/couchdb";
import "vue-class-component/hooks";
import { Component, Vue } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";

@Component
export default class EnergyCooking extends Vue {
  readonly stoveHeaders: TableHeader<keyof CookingStove>[] = (
    [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Fuel",
        value: "fuel",
      },
      {
        text: "Technology Type",
        value: "technologyType",
      },
      {
        text: "Energy efficiency",
        value: "energyEfficiency",
        unit: "%",
      },
      {
        text: "Capacity",
        value: "capacity",
        unit: "kW",
      },
      {
        text: "Investment Cost",
        value: "investmentCost",
        unit: "$",
      },
      {
        text: "Lifetime",
        value: "lifetime",
        unit: "year",
      },
      {
        text: "Emission factor for CO",
        value: "emissionFactorCo",
        unit: "g/MJ",
      },
      {
        text: "Emission factor for PM2.5",
        value: "emissionFactorPm",
        unit: "mg/MJ",
      },
      {
        text: "IWA efficiency TIER",
        value: "iwaEfficiencyTier",
      },
      {
        text: "IWA indoor emission TIER",
        value: "iwaIndoorEmissionTier",
      },
    ] as TableHeader<keyof CookingStove>[]
  ).map(this.mapHeader);

  stoves: CookingStove[] = [];

  created(): void {
    const stovesDatabase = new SyncDatabase<CookingStove>(
      DatabaseName.EnergyCookingStoves
    );
    stovesDatabase
      .getAllDocuments()
      .then((documents) => (this.stoves = documents))
      .finally(() => stovesDatabase.cancel());
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
