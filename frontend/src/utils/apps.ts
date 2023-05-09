export const energy = {
  title: "Energy planning",
  to: "energy",
  logoIcon: "$mdiFlash",
  description:
    "This Decision Support Tool assesses from a sustainability perspective, multi-year comparative performances of energy interventions for refugee camps. The boundaries of the energy system is Scope 1, i.e. activities in the camps. The energy system is composed of the following sub-systems: Household, Community, Production of goods and services, Central energy supply. The results encompass energy demand and supply, environmental and economic performances of the interventions under various (up to three) scenarios of the future.",
};

export default [energy] as {
  title: string;
  to: string;
  logoIcon: string;
  description?: string;
}[];
