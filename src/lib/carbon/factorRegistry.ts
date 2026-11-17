export type FactorStatus = "approved" | "under-review" | "retired";

export interface EmissionFactorRecord {
  id: string;
  activity: string;
  geography: string;
  value: number;
  unit: string;
  source: string;
  datasetVersion: string;
  reportingPeriod: string;
  gwpBasis: string;
  status: FactorStatus;
}

// Registry metadata is deliberately separate from the calculation tables. A
// production deployment should load approved records from an organization-scoped
// database and pin the selected factor ID on every calculation run.
export const DEMO_FACTOR_REGISTRY: EmissionFactorRecord[] = [
  {
    id: "IN-CEA-GRID-DEMO-2024",
    activity: "Purchased grid electricity",
    geography: "India — national",
    value: 0.716,
    unit: "kg CO2e / kWh",
    source: "CEA CO2 Baseline Database",
    datasetVersion: "Demo registry v1",
    reportingPeriod: "FY 2024–25",
    gwpBasis: "Documented by source",
    status: "under-review",
  },
  {
    id: "GLOBAL-DIESEL-DEMO-2024",
    activity: "Stationary diesel combustion",
    geography: "Global default",
    value: 2.68,
    unit: "kg CO2e / litre",
    source: "Methodology reference required before use",
    datasetVersion: "Demo registry v1",
    reportingPeriod: "2024",
    gwpBasis: "GWP basis must be selected",
    status: "under-review",
  },
  {
    id: "S3-EEIO-GOODS-DEMO",
    activity: "Purchased goods — spend estimate",
    geography: "Illustrative only",
    value: 0.25,
    unit: "tCO2e / $1,000 spend",
    source: "Illustrative EEIO value",
    datasetVersion: "Demo registry v1",
    reportingPeriod: "Not for assurance",
    gwpBasis: "Not applicable",
    status: "retired",
  },
];

export const FACTOR_STATUS_LABEL: Record<FactorStatus, string> = {
  approved: "Approved",
  "under-review": "Under review",
  retired: "Retired",
};
