<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" center-active hide-slider show-arrows>
          <template v-for="(item, index) in tabItems">
            <v-divider
              v-if="!item.text"
              :key="index"
              class="mx-2"
              vertical
            ></v-divider>
            <v-menu
              v-else-if="item.children"
              :key="index"
              offset-y
              open-on-hover
            >
              <template #activator="{ on, attrs }">
                <v-tab
                  v-bind="attrs"
                  :disabled="!item.toName"
                  :to="{ name: routerPrefix + item.toName }"
                  v-on="on"
                >
                  <v-icon left>{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-tab>
              </template>
              <v-list nav>
                <v-list-item
                  v-for="(subItem, subIndex) in item.children"
                  :key="subIndex"
                >
                  <v-tab
                    :disabled="!subItem.toName"
                    :to="{
                      name: subItem.toName
                        ? routerPrefix + item.toName + subItem.toName
                        : undefined,
                    }"
                  >
                    <v-icon left>{{ subItem.icon }}</v-icon>
                    {{ subItem.text }}
                  </v-tab>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-tab
              v-else
              :key="index"
              :disabled="!item.toName"
              :to="{ name: routerPrefix + item.toName }"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-tab>
          </template>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center">
        <template v-if="$route.name.endsWith('General')">
          <h1 class="project__h3 font-weight-medium">Information</h1>
          <info-tooltip>
            The inputs in the “General” section include data related to the
            context of the camp such as the name, the geographic location, its
            temporariness, the population, number of families or households
            distributed into up to five quality of life levels, the average
            annual income of the households is provided as well. These data may
            have been collected through a survey for the base year or are
            assumed at the best of existing information through interviews of
            the management.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('HouseholdCooking')">
          <h1 class="project__h3 font-weight-medium">Household Cooking</h1>
          <info-tooltip>
            The data on the cookstoves are the number of devices per
            ten-household, and their utilization factor. The user gives these
            data for the base year and their evolution is assumed in the
            scenario section.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('HouseholdLighting')">
          <h1 class="project__h3 font-weight-medium">Household Lighting</h1>
          <info-tooltip>
            The user provides the information related to the lighting devices
            for the base year. The number of devices is provided per
            10-household basis, other data include the type of technology, type
            of fuel, economic and environmental characteristics. The evolution
            is assumed in the scenario section.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('HouseholdHeating')">
          <h1 class="project__h3 font-weight-medium">Household Heating</h1>
          <info-tooltip>
            The inputs of the base year include the number of heating & cooling
            degree days, and the thermal characteristics of the dwelling. In the
            case of a decentralized energy supply, data on the fuels,
            environmental and economic characteristic of the heaters and coolers
            are provided as well. The evolution is assumed in the scenario
            section.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('CommunityLighting')">
          <h1 class="project__h3 font-weight-medium">Community Lighting</h1>
          <info-tooltip>
            The community lighting characterizes for the base year, the street
            lighting demand and supply. The supply may consist in solar lighting
            or public / mini-grid connected street lighting. The evolution of
            the sub-system is assumed in the scenario section.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('CommunityHeating')">
          <h1 class="project__h3 font-weight-medium">Community Heating</h1>
          <info-tooltip>
            The community is divided in different units such as: camp
            management, schools, medical centers, and administrative facilities.
            For each unit, the demand and supply of thermal energy (heating &
            cooling) are assessed from energy, environmental, and economic point
            of view. For each unit, the demand and supply of thermal energy are
            evaluated for the base year and assumed in the scenario section for
            the future.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('CommunityServices')">
          <h1 class="project__h3 font-weight-medium">Community Services</h1>
          <info-tooltip>
            This sector includes units such as: shops, small restaurants, and
            water pumping and distribution. For each sub-units, the productive
            energy use is assessed for the base year, and assumed for the future
            in the scenario section.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('Scenario')">
          <h1 class="project__h3 font-weight-medium">Scenario</h1>
          <info-tooltip>
            The scenario section allows the user to build consistent evolutions
            of the system which are independent to the interventions. These
            evolutions depend on the environment of the system. The scenario
            section is organized at two levels: global scenario includes
            evolutions that impact all the sub-systems (household and
            community); they comprise the number of households, their income,
            the prices of fuels, and the discount rate. These evolutions depend
            on the uncertain future that is depicted through three “pictures”
            labelled as “business as usual”, “pessimistic”, and “optimistic”
            scenario. Once one global scenario is chosen by the user, she/he
            defines the subsequent specific scenario for the variables that are
            sector-specific, e.g. evolution of the used cookstoves park and its
            distribution among the five quality of life levels in terms of
            number of devices per 10-household.
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('Intervention')">
          <h1 class="project__h3 font-weight-medium">Intervention</h1>
          <info-tooltip>
            The logic of this tool consists in defining and assessing
            interventions that will improve the system and its evolutions which
            are assumed in the scenario section. The interventions are defined
            at two levels. The global level distinguished three types of
            intervention: fuel substitution, energy efficiency, and cash-based.
            Once the global type of intervention is chosen - it applies to all
            the sub-systems (household, and community) - the intervention that
            is specific to the sectors is defined in the module of the sectors,
            e.g. for the cooking sub-sector, if a global intervention of fuel
            substitution is chosen, the specific interventions could be the
            diffusion of a technology that uses an alternative fuel (LPG,
            biogas, ethanol, solar cookers).
          </info-tooltip>
        </template>
        <template v-if="$route.name.endsWith('Result')">
          <h1 class="project__h3 font-weight-medium">Summary</h1>
          <info-tooltip>
            <p>
              The results comprise the following: energy needs and demand,
              global energy efficiency, environmental, social, and economic
              indicators. Three categories of results are provided:
            </p>
            <ul>
              <li>The outputs related to a chosen year</li>
              <li>
                The yearly evolution of the key performance indicators over the
                study period
              </li>
              <li>
                The comparison between an alternative case and a reference case.
              </li>
            </ul>
            <p>
              In the case of central energy supply facilities, the results are
              the net present value, the energy affordability index, CO2
              emissions.
            </p>
            <p>The results are provided in tables or/and graphs.</p>
          </info-tooltip>
        </template>
      </v-col>
      <v-col cols="auto" class="d-flex align-center">
        <user-manager v-model="users" @change="changeDocument"></user-manager>
      </v-col>
    </v-row>
    <v-row v-if="$route.name.endsWith('General')">
      <v-col>
        <v-text-field
          v-model="siteName"
          hide-details="auto"
          label="Site Name"
          outlined
          required
          :rules="rules"
          @change="changeDocument"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="name"
          hide-details="auto"
          label="Project Name"
          outlined
          required
          :rules="rules"
          @change="changeDocument"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-checkbox
          v-model="isTemplate"
          hide-details="auto"
          label="Template"
          @change="changeDocument"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row v-if="modules">
      <v-col>
        <router-view
          v-model="modules"
          :document-name="documentName"
          :document-site-name="documentSiteName"
        ></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import InfoTooltip from "@/components/commons/InfoTooltip.vue";
import UserManager from "@/components/commons/UserManager.vue";
import { ExistingDocument } from "@/models/couchdbModel";
import { Modules, ProjectDocument } from "@/models/energyModel";
import { CouchUser } from "@/store/UserModule";
import { SyncDatabase } from "@/utils/couchdb";
import { checkRequired } from "@/utils/rules";
import { cloneDeep, isEqual } from "lodash";
import "vue-class-component/hooks";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    InfoTooltip,
    UserManager,
  },
})
export default class EnergyProject extends Vue {
  readonly rules = [checkRequired];

  @Prop(String)
  readonly idName!: string;
  @Prop({ type: Object as () => SyncDatabase<ProjectDocument> })
  readonly database!: SyncDatabase<ProjectDocument>;
  @Prop({ type: Array as () => ExistingDocument<ProjectDocument>[] })
  readonly documents!: ExistingDocument<ProjectDocument>[];
  @Prop(String)
  readonly routerPrefix!: string;

  readonly tabItems: TabItem[] = [
    {
      text: "Information",
      icon: "$mdiInformation",
      toName: "General",
    },
    {
      text: "Scenario",
      icon: "$mdiSkipNext",
      toName: "Scenario",
    },
    {
      text: "Household",
      icon: "$mdiHome",
      toName: "Household",
      children: [
        {
          text: "Cooking",
          icon: "$mdiStove",
          toName: "Cooking",
        },
        // {
        //   text: "Lighting",
        //   icon: "$mdiLightbulb",
        //   toName: "Lighting",
        // },
        // {
        //   text: "Heating & Cooling",
        //   icon: "$mdiSunSnowflake",
        //   toName: "Heating",
        // },
      ],
    },
    // {
    //   text: "Community",
    //   icon: "$mdiHomeCity",
    //   toName: "Community",
    //   children: [
    //     {
    //       text: "Lighting",
    //       icon: "$mdiLightbulb",
    //       toName: "Lighting",
    //     },
    //     {
    //       text: "Heating & Cooling",
    //       icon: "$mdiSunSnowflake",
    //       toName: "Heating",
    //     },
    //     {
    //       text: "Goods & Services",
    //       icon: "$mdiRoomService",
    //       toName: "Services",
    //     },
    //   ],
    // },
    {},
    {
      text: "Summary",
      icon: "$mdiChartBox",
      toName: "Result",
    },
  ];

  document: ExistingDocument<ProjectDocument> | null = null;
  tab: string | null = null;

  get siteName(): string {
    return this.document?.siteName ?? "";
  }

  set siteName(value: string) {
    if (this.document) {
      this.document.siteName = value;
    }
  }

  get name(): string {
    return this.document?.name ?? "";
  }

  set name(value: string) {
    if (this.document) {
      this.document.name = value;
    }
  }

  get isTemplate(): boolean {
    return this.document?.isTemplate ?? false;
  }

  set isTemplate(value: boolean) {
    if (this.document) {
      this.document.isTemplate = value;
    }
  }

  get users(): (string | CouchUser)[] {
    return this.document?.users ?? [];
  }

  set users(value: (string | CouchUser)[]) {
    if (this.document) {
      this.document.users = value;
    }
  }

  get documentId(): string {
    return this.$route.params.id;
  }

  get modules(): Modules | undefined {
    return this.document?.modules;
  }

  get documentName(): string | undefined {
    return this.document?.name;
  }

  get documentSiteName(): string | undefined {
    return this.document?.siteName;
  }

  get savedDocument(): ExistingDocument<ProjectDocument> | null {
    return this.documents.find((doc) => doc._id === this.documentId) ?? null;
  }

  created(): void {
    this.resetDocument();
  }

  @Watch("savedDocument", { deep: true })
  onSavedDocumentUpdated(): void {
    this.resetDocument();
  }

  @Watch("modules", { deep: true })
  onModulesUpdated(): void {
    if (this.document && !isEqual(this.savedDocument, this.document)) {
      this.updateDocument(this.document);
    }
  }

  resetDocument(): void {
    this.document = this.savedDocument ? cloneDeep(this.savedDocument) : null;
  }

  changeDocument(): void {
    if (this.document) {
      this.updateDocument(this.document);
    }
  }

  private updateDocument(document: ExistingDocument<ProjectDocument>): void {
    this.database.remoteDB
      .put(document)
      .then(() => {
        console.debug(`document ${this.document?._id} updated`);
      })
      .catch((reason) => {
        this.$store.dispatch("notifyUser", {
          message: reason.message ?? reason,
        });
        console.error(reason);
        this.resetDocument();
      });
  }
}

interface TabItem {
  text?: string;
  toName?: string;
  icon?: string;
  children?: TabItem[];
}
</script>
