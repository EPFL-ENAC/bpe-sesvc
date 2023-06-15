import { energy } from "@/utils/apps";
import { RouteConfig } from "vue-router";

export default {
  path: "/energy",
  name: "energy",
  redirect: { name: "energyHome" },
  component: () =>
    import(/* webpackChunkName: "energy" */ "../views/energy/Energy.vue"),
  meta: {
    title: energy.title,
  },
  children: [
    {
      path: "",
      name: "energyHome",
      component: () =>
        import(
          /* webpackChunkName: "energy-home" */ "../views/energy/EnergyHome.vue"
        ),
    },
    {
      path: "sites/:id",
      name: "energySite",
      redirect: { name: "energySiteGeneral" },
      component: () =>
        import(
          /* webpackChunkName: "energy-site" */ "../views/energy/EnergySite.vue"
        ),
      children: projectChildren("energySite"),
    },
  ],
} as RouteConfig;

function projectChildren(prefix: string): RouteConfig[] {
  return [
    {
      path: "general",
      name: prefix + "General",
      component: () =>
        import(
          /* webpackChunkName: "energy-general" */ "../views/energy/EnergyGeneralView.vue"
        ),
    },
    {
      path: "household",
      name: prefix + "Household",
      redirect: { name: prefix + "HouseholdCooking" },
      component: () =>
        import(
          /* webpackChunkName: "energy-household" */ "../views/energy/EnergyHouseholdView.vue"
        ),
      children: [
        {
          path: "cooking",
          name: prefix + "HouseholdCooking",
          component: () =>
            import(
              /* webpackChunkName: "energy-household-cooking" */ "../views/energy/EnergyHouseholdCookingView.vue"
            ),
        },
        // {
        //   path: "lighting",
        //   name: prefix + "HouseholdLighting",
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "energy-household-lighting" */ "../views/energy/EnergyHouseholdLightingView.vue"
        //     ),
        // },
        // {
        //   path: "heating",
        //   name: prefix + "HouseholdHeating",
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "energy-household-heating" */ "../views/energy/EnergyHouseholdHeatingView.vue"
        //     ),
        // },
      ],
    },
    // {
    //   path: "community",
    //   name: prefix + "Community",
    //   redirect: { name: prefix + "CommunityLighting" },
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "energy-community" */ "../views/energy/EnergyCommunityView.vue"
    //     ),
    //   children: [
    //     {
    //       path: "lighting",
    //       name: prefix + "CommunityLighting",
    //       component: () =>
    //         import(
    //           /* webpackChunkName: "energy-community-lighting" */ "../views/energy/EnergyCommunityLightingView.vue"
    //         ),
    //     },
    //     {
    //       path: "heating",
    //       name: prefix + "CommunityHeating",
    //       component: () =>
    //         import(
    //           /* webpackChunkName: "energy-community-heating" */ "../views/energy/EnergyCommunityHeatingView.vue"
    //         ),
    //     },
    //     {
    //       path: "services",
    //       name: prefix + "CommunityServices",
    //       component: () =>
    //         import(
    //           /* webpackChunkName: "energy-community-services" */ "../views/energy/EnergyCommunityServicesView.vue"
    //         ),
    //     },
    //   ],
    // },
    {
      path: "scenario",
      name: prefix + "Scenario",
      component: () =>
        import(
          /* webpackChunkName: "energy-scenario" */ "../views/energy/EnergyScenarioView.vue"
        ),
    },
    {
      path: "result",
      name: prefix + "Result",
      component: () =>
        import(
          /* webpackChunkName: "energy-result" */ "../views/energy/EnergyResultView.vue"
        ),
    },
  ];
}
