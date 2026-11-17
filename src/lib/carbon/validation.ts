import type { ElectricitySource, Scope1Data } from "@/types/carbon";
import { ELECTRICITY_GRID_FACTORS, MOBILE_FUEL_FACTORS, STATIONARY_FACTORS } from "./factors";

export interface CalculationIssue {
  severity: "error" | "warning";
  sourceId: string;
  message: string;
}

export function validateScope1Inputs(data: Scope1Data): CalculationIssue[] {
  const issues: CalculationIssue[] = [];
  data.stationary.forEach((source) => {
    const factors = STATIONARY_FACTORS[source.fuelType as keyof typeof STATIONARY_FACTORS];
    if (!factors || !(source.unit in factors)) {
      issues.push({ severity: "error", sourceId: source.id, message: `No approved factor is configured for ${source.fuelType} in ${source.unit}.` });
    }
  });
  data.mobileFuel.forEach((source) => {
    const factors = MOBILE_FUEL_FACTORS[source.fuelType as keyof typeof MOBILE_FUEL_FACTORS];
    if (!factors || !(source.unit in factors)) {
      issues.push({ severity: "error", sourceId: source.id, message: `No approved factor is configured for ${source.fuelType} in ${source.unit}.` });
    }
  });
  return issues;
}

export function validateElectricityInputs(sources: ElectricitySource[]): CalculationIssue[] {
  return sources.flatMap((source) =>
    !source.customFactor && !(source.region in ELECTRICITY_GRID_FACTORS)
      ? [{ severity: "error" as const, sourceId: source.id, message: `No grid factor is configured for ${source.region}. Add a reviewed custom factor with evidence.` }]
      : [],
  );
}
