<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" v-model="formValid" lazy-validation>
        <v-row v-for="(rowItem, index) in formItems" :key="index">
          <template v-for="(item, index) in rowItem">
            <v-col
              v-if="!item.hidden"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <form-item-component
                v-model="module[item.key]"
                v-bind="item"
              ></form-item-component>
            </v-col>
          </template>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :disabled="saveDisabled" @click="save">
        <v-icon left>mdi-check</v-icon>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import FormItemComponent, {
  FormItem,
} from "@/components/commons/FormItemComponent.vue";
import {
  AreaPerPerson,
  FarApartHouses,
  GeneralModule,
  Integration,
  Topography,
  VacantSpaceInside,
  vacantSpaceOutside,
  WoodLandscape,
} from "@/models/energyModel";
import { VForm } from "@/utils/vuetify";
import { cloneDeep, isEqual } from "lodash";
import "vue-class-component/hooks";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    FormItemComponent,
  },
})
export default class EnergyGeneral extends Vue {
  @Prop({ type: Object as () => GeneralModule })
  readonly initialModule: GeneralModule | undefined;
  @Ref()
  readonly form!: VForm;

  formValid = true;
  module: GeneralModule = EnergyGeneral.getDefaultModule();

  get formItems(): FormItem<keyof GeneralModule>[][] {
    return [
      [
        {
          type: "number",
          key: "year",
          label: "Year of the data",
        },
        {
          type: "text",
          key: "name",
          label: "Name of the camp",
        },
      ],
      [
        {
          type: "number",
          key: "locationLatitude",
          label: "Latitude of the camp",
          unit: "Decimal Degrees",
          min: -90,
          max: 90,
        },
        {
          type: "number",
          key: "locationLongitude",
          label: "Longitude of the camp",
          unit: "Decimal Degrees",
          min: -180,
          max: 180,
        },
      ],
      [
        {
          type: "boolean",
          key: "temporary",
          label: "Is the camp temporary?",
          options: {
            true: "Yes, temporary",
            false: "No, permanent",
          },
        },
        {
          type: "number",
          key: "expirationYear",
          label: "In what year will it be removed?",
          hidden: !this.module.temporary,
        },
        {
          type: "select",
          key: "integration",
          label: "In what extent is it integrated with the host community?",
          options: [
            {
              text: "Well integrated",
              value: "well",
            },
            {
              text: "Moderatly integrated",
              value: "moderately",
            },
            {
              text: "Badly integrated",
              value: "badly",
            },
          ],
          hidden: this.module.temporary,
        } as FormItem<keyof GeneralModule, Integration>,
      ],
      [
        {
          type: "text",
          key: "electricityCompanyName",
          label: "Electricity company name",
        },
        {
          type: "boolean",
          key: "publicGridConnection",
          label: "Connected to the public grid",
        },
        {
          type: "number",
          key: "publicGridDomesticRate",
          label: "Domestic customers rate",
          unit: `${this.module.currency}/kWh`,
          hidden: !this.module.publicGridConnection,
        },
        {
          type: "number",
          key: "publicGridDistance",
          label: "How far is the camp from the public grid?",
          unit: "m",
          hidden: !this.module.publicGridConnection,
        },
        {
          type: "boolean",
          key: "networkExtension",
          label:
            "Does the electricity company envisage to extend its network in the framework of the electricity programme?",
          hidden: this.module.publicGridConnection,
        },
      ],
      [
        {
          type: "number",
          subtype: "percent",
          key: "shelterTemporary",
          label: "Temporary and transitional shelters proportion",
        },
        {
          type: "number",
          subtype: "percent",
          key: "shelterTemporaryTent",
          label: "Tents proportion",
          hidden: this.module.shelterTemporary === 0,
        },
        {
          type: "number",
          subtype: "percent",
          key: "shelterTemporarySheeting",
          label: "Plastic sheeting proportion",
          hidden: this.module.shelterTemporary === 0,
        },
        {
          type: "number",
          subtype: "percent",
          key: "shelterTemporaryKit",
          label: "Self construction with shelter kits proportion",
          hidden: this.module.shelterTemporary === 0,
        },
      ],
      [
        {
          type: "number",
          subtype: "percent",
          key: "shelterPermanent",
          label: "Permanent shelters proportion",
        },
        {
          type: "number",
          subtype: "percent",
          key: "shelterPermanentContainer",
          label: "Containers proportion",
          hidden: this.module.shelterPermanent === 0,
        },
        {
          type: "number",
          subtype: "percent",
          key: "shelterPermanentPrefabricated",
          label: "Prefabricated proportion",
          hidden: this.module.shelterPermanent === 0,
        },
        {
          type: "number",
          subtype: "percent",
          key: "shelterPermanentRhu",
          label: "RHU refugee housing unit ( prefabricated IKEA) proportion",
          hidden: this.module.shelterPermanent === 0,
        },
      ],
      [
        {
          type: "number",
          subtype: "percent",
          key: "electricalSafetyCompliance",
          label:
            "What proportion of shelters are in compliance with the electrical safety codes?",
        },
      ],
      [
        {
          type: "number",
          key: "annualLocalWindMinimum",
          label: "Annual minimal local wind velocity",
          unit: "km/h",
        },
        {
          type: "number",
          key: "annualLocalWindAverage",
          label: "Annual average local wind velocity",
          unit: "km/h",
        },
        {
          type: "number",
          key: "annualLocalWindMaximum",
          label: "Annual maximum local wind velocity",
          unit: "km/h",
        },
      ],
      [
        {
          type: "number",
          key: "totalPopulation",
          label: "Total population of the camp",
        },
        {
          type: "number",
          key: "familiesCount",
          label: "How many families are in the camp?",
        },
        {
          type: "text",
          key: "currency",
          label: "National currency",
        },
        {
          type: "number",
          key: "exchangeRateUsd",
          label: "Exchange rate with the US dollar",
          unit: `${this.module.currency} = 1 USD`,
        },
      ],
      [
        {
          type: "number",
          subtype: "percent",
          key: "businessShare",
          label: "What share of households operate a business in their house?",
        },
        {
          type: "select",
          key: "farApartHouses",
          label:
            "How far apart- typically- are the houses/living spaces in the camp blocks (not counting roads)?",
          options: [
            {
              text: "A few",
              value: "few",
            },
            {
              text: "3 to 6",
              value: "3-6",
            },
            {
              text: "6 to 12",
              value: "6-12",
            },
            {
              text: "12 to 20",
              value: "12-20",
            },
            {
              text: "20 +",
              value: "20+",
            },
          ],
          unit: "m",
        } as FormItem<keyof GeneralModule, FarApartHouses>,
        {
          type: "select",
          key: "areaPerPerson",
          label:
            "What is the average camp area per person (square meters as per UNHCR design )?",
          options: [
            {
              text: "29 or less",
              value: "-29",
            },
            {
              text: "20 to 34",
              value: "30-34",
            },
            {
              text: "35 to 44",
              value: "35-44",
            },
            {
              text: "45 or more",
              value: "45+",
            },
          ],
        } as FormItem<keyof GeneralModule, AreaPerPerson>,
        {
          type: "select",
          key: "vacantSpaceInside",
          label:
            "What is the average camp area per person (square meters as per UNHCR design )?",
          options: [
            {
              text: "No Space",
              value: "no",
            },
            {
              text: "Space equal to housing 10 families",
              value: "10",
            },
            {
              text: "Space equal to housing 50 families",
              value: "50",
            },
            {
              text: "Space equal to housing 100 families",
              value: "100",
            },
            {
              text: "Space equal to housing 250 families",
              value: "250",
            },
            {
              text: "Space equal to housing 500 families",
              value: "500",
            },
            {
              text: "Space equal to housing 1000+ families",
              value: "1000+",
            },
          ],
        } as FormItem<keyof GeneralModule, VacantSpaceInside>,
        {
          type: "select",
          key: "woodLandscape",
          label:
            "What does the landscape outside of the camp where wood is harvested primarily look like?",
          options: [
            {
              text: "Evergreen forest / rain forest",
              value: "rain",
            },
            {
              text: "Forest-savanna (Mosaic)",
              value: "forest-savanna",
            },
            {
              text: "Deciduous forest",
              value: "deciduous",
            },
            {
              text: "Sparse forest (woodland)",
              value: "woodland",
            },
            {
              text: "Shrubland",
              value: "shrubland",
            },
            {
              text: "Grassland / savannah",
              value: "grassland-savannah",
            },
          ],
        } as FormItem<keyof GeneralModule, WoodLandscape>,
        {
          type: "select",
          key: "topography",
          label: "What does the topography outside of the camp look like?",
          options: [
            {
              text: "Flat",
              value: "flat",
            },
            {
              text: "Hilly",
              value: "hilly",
            },
            {
              text: "Valley",
              value: "valley",
            },
          ],
        } as FormItem<keyof GeneralModule, Topography>,
        {
          type: "select",
          key: "vacantSpaceOutside",
          label:
            "Is there vacant space available - outside - the camp place energy infrastructure (if permission is granted) ?",
          options: [
            {
              text: "No Space",
              value: "no",
            },
            {
              text: "Little Space",
              value: "little",
            },
            {
              text: "Medium Space",
              value: "medium",
            },
            {
              text: "Lots of Space",
              value: "lots",
            },
          ],
        } as FormItem<keyof GeneralModule, vacantSpaceOutside>,
      ],
    ];
  }

  get saveDisabled(): boolean {
    return !this.formValid || isEqual(this.initialModule, this.module);
  }

  static getDefaultModule(): GeneralModule {
    const currentYear = new Date().getFullYear();
    return {
      year: currentYear,
      name: "",
      locationLatitude: 0,
      locationLongitude: 0,
      temporary: false,
      expirationYear: currentYear,
      electricityCompanyName: "",
      publicGridConnection: false,
      shelterTemporary: 0,
      shelterTemporaryTent: 0,
      shelterTemporarySheeting: 0,
      shelterTemporaryKit: 0,
      shelterPermanent: 0,
      shelterPermanentContainer: 0,
      shelterPermanentPrefabricated: 0,
      shelterPermanentRhu: 0,
      electricalSafetyCompliance: 0,
      annualLocalWindMinimum: 0,
      annualLocalWindAverage: 0,
      annualLocalWindMaximum: 0,
      totalPopulation: 0,
      familiesCount: 0,
      currency: "",
      exchangeRateUsd: 1,
      businessShare: 0,
      farApartHouses: "few",
      areaPerPerson: "-29",
      vacantSpaceInside: "no",
      woodLandscape: "rain",
      topography: "flat",
      vacantSpaceOutside: "no",
    };
  }

  @Watch("initialModule")
  onInitialModuleChanged(): void {
    if (this.initialModule) {
      this.module = cloneDeep(this.initialModule);
    }
  }

  save(): void {
    if (this.form.validate()) {
      this.$emit("save", this.module);
    }
  }
}
</script>