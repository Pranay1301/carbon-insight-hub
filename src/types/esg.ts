// ESG Assessment Data Types

export interface OrganizationProfile {
  organizationName: string;
  legalEntityName?: string;
  industrySector: IndustrySector;
  organizationSize: OrganizationSize;
  annualRevenue: number;
  fiscalYearEnd?: string;
  geographicRegion?: string;
  numberOfFacilities?: number;
  numberOfEmployees: number;
  countriesOfOperation: string[];
  publicPrivateStatus?: "public" | "private";
  stockExchange?: string;
  primaryContactName?: string;
  primaryContactEmail?: string;
  esgOfficerName?: string;
  publishesSustainabilityReports: "yes" | "no" | "planning";
  reportingFrameworks: string[];
  assessmentPeriodFrom: string;
  assessmentPeriodTo: string;
}

export interface EnvironmentalAssessment {
  // 2.1 Greenhouse Gas Emissions
  measurementLevel: "all-three" | "scope-1-2" | "scope-1-only" | "not-measured";
  scope1Emissions?: number;
  scope1Sources?: {
    stationaryCombustion?: number;
    mobileCombustion?: number;
    processEmissions?: number;
    fugitiveEmissions?: number;
  };
  scope2Emissions?: number;
  scope2CalculationMethod?: "location-based" | "market-based";
  scope2ReCertificates?: number; // kWh or %
  scope3Emissions?: number;
  scope3Categories?: string[];
  scope3Coverage?: number; // 0-100%
  hasReductionTargets: boolean;
  targetType?: "sbti" | "absolute" | "intensity" | "none";
  targetPercentage?: number;
  targetYear?: number;
  currentProgress?: number;

  // 2.2 Energy Management
  totalEnergyConsumption: number; // MWh/year
  energyConsumptionTrend?: "decreasing" | "stable" | "increasing";
  renewablePercentage: number;
  renewableSources: string[];
  energyManagementCertification: "iso-50001" | "in-progress" | "planned" | "not-planned";
  energyAuditConducted?: boolean;
  energyEfficiencyTargets?: boolean;
  targetEfficiencyImprovement?: number;

  // 2.3 Water & Waste Management
  totalWaterWithdrawal: number; // m3/year
  waterSources?: string[];
  operationsInWaterStressed: "yes" | "no";
  waterRecycled?: number; // m3/year
  waterRecyclingRate?: number; // % (auto-calculated usually, but stored for convenience)
  totalWaterDischarge?: number; // m3/year
  dischargeQuality?: "exceeds" | "meets" | "below";
  treatmentBeforeDischarge?: boolean;

  totalWasteGenerated: number; // tonnes/year
  hazardousWaste?: number;
  nonHazardousWaste?: number;
  wasteDisposalMethods?: {
    landfill?: number;
    incinerationRecovery?: number;
    incinerationNoRecovery?: number;
    recycling?: number;
    composting?: number;
    otherRecovery?: number;
  };
  wasteDiversionRate?: number; // %

  // 2.4 Biodiversity & Land Use
  operationsNearProtectedAreas: "yes" | "no";
  operationsInHighBiodiversityValue?: boolean;
  totalLandUse?: number; // hectares
  landUseTypes?: string[];
  biodiversityImpactAssessment?: boolean;
  biodiversityManagementPlan?: boolean;
  habitatsProtectedRestored?: number; // hectares
  iucnRedListSpecies?: boolean;
  iucnSpeciesCount?: number;

  // 2.5 Environmental Compliance
  iso14001Certified?: boolean;
  iso14001CertNumber?: string;
  environmentalPolicyPublic?: boolean;
  regularEnvironmentalAudits?: boolean;
  environmentalViolations?: number;
  totalFinesPenalties?: number;
  natureOfViolations?: string[];
  correctiveActions?: string;
}

export interface SocialAssessment {
  // 3.1 Workforce Health & Safety
  totalWorkforce: number;
  fullTimePermanent?: number;
  partTimePermanent?: number;
  temporaryContract?: number;
  supervisedWorkers?: number;
  totalHoursWorked?: number;
  fatalities: number;
  highConsequenceInjuries?: number;
  recordableInjuries?: number;
  recordableIllHealth?: number;
  iso45001Certified?: boolean;
  hsManagementSystemCoverage?: number; // %
  healthSafetyCommittees?: boolean;
  safetyTrainingHours: number;

  // 3.2 Diversity, Equity & Inclusion
  employeesMen?: number;
  employeesWomen?: number;
  employeesNonBinary?: number;
  employeesUnder30?: number;
  employees30to50?: number;
  employeesOver50?: number;
  employeesUnderrepresented?: number; // %
  boardMen?: number;
  boardWomen?: number;
  boardUnderrepresented?: number;
  seniorMgmtMen?: number;
  seniorMgmtWomen?: number;
  seniorMgmtUnderrepresented?: number;
  payEquityAnalysis: boolean;
  genderPayGap?: number;
  remediationPlan?: boolean;
  formalDeiPolicy?: boolean;
  deiTraining?: boolean;
  employeeResourceGroups?: boolean;
  deiInExecutiveComp?: boolean;

  // 3.3 Labor Practices & Human Rights
  collectiveBargainingCoverage?: number; // %
  freedomOfAssociation?: boolean;
  minimumWagePolicy?: "living-wage" | "above-minimum" | "legal-minimum" | "below-minimum";
  averageEmployeeTenure?: number;
  annualTurnoverRate: number;
  humanRightsPolicy?: boolean;
  humanRightsBasedOnUn?: boolean;
  humanRightsDueDiligence?: boolean;
  humanRightsTraining?: number; // %
  humanRightsGrievance?: boolean;
  discriminationIncidents?: number;
  childForcedLaborIncidents?: number;
  averageWeeklyHours?: number;
  overtimePolicyDocumented?: boolean;
  paidLeaveDays?: number;
  parentalLeaveWeeks?: number;

  // 3.4 Supply Chain & Stakeholder Engagement
  totalSuppliers?: number;
  spendWithTopSuppliers?: number; // %
  suppliersScreenedSocial?: number; // %
  supplierAudits?: number;
  suppliersNegativeImpact?: number;
  suppliersImprovedTerminated?: number;
  communityInvestment?: number; // currency
  employeeVolunteering?: boolean;
  volunteerHours?: number;
  localHiringPolicy?: boolean;
  localHiringPercentage?: number;
  communityGrievanceMechanism?: boolean;
  communityIncidents?: number;
  productSafetyIncidents?: number;
  customerPrivacyBreaches?: number;
  customerSatisfactionScore?: number;
  productLabeling?: boolean;
}

export interface GovernanceAssessment {
  // 4.1 Board Structure & Independence
  totalBoardSize: number;
  independentDirectors: number;
  womenOnBoard: number;
  underrepresentedDirectors?: number;
  averageBoardTenure?: number;
  boardAgeDiversity?: boolean;
  auditCommittee?: boolean;
  auditCommitteeIndependent?: number; // %
  riskCommittee?: boolean;
  sustainabilityCommittee?: boolean;
  sustainabilityCommitteeMeetings?: number;
  compensationCommittee?: boolean;
  compensationCommitteeIndependent?: number; // %
  nominationCommittee?: boolean;
  boardMeetings?: number;
  averageAttendance?: number; // %
  boardEvaluation?: boolean;
  directorOnboarding?: boolean;

  // 4.2 Executive Leadership & Compensation
  ceoTotalCompensation?: number;
  medianEmployeeCompensation?: number;
  ceoPayRatio?: number;
  variableCompLinkedToEsg?: boolean;
  esgLinkagePercentage?: number;
  esgMetricsInComp?: string[];
  ceoChairmanSeparated?: boolean;
  leadIndependentDirector?: boolean;
  successionPlanning?: boolean;
  executiveTurnover?: number;

  // 4.3 Ethics, Compliance & Anti-Corruption
  codeOfConduct?: boolean;
  codePublic?: boolean;
  ethicsTraining?: number; // %
  whistleblowerMechanism?: boolean;
  whistleblowerAnonymous?: boolean;
  antiRetaliation?: boolean;
  ethicsCommittee?: boolean;
  antiCorruptionPolicy?: boolean;
  antiCorruptionCoverage?: string[]; // employees, partners, suppliers
  antiCorruptionTraining?: number; // %
  thirdPartyDueDiligence?: boolean;
  politicalContributionsDisclosed?: boolean;
  lobbyingDisclosed?: boolean;
  corruptionViolations?: number;
  antiCompetitiveViolations?: number;
  financialViolations?: number;
  privacyViolations?: number;
  otherViolations?: number;
  totalFines?: number;
  legalProceedings?: number;

  // 4.4 Risk Management & Internal Controls
  ermSystem?: boolean;
  ermFramework?: "coso" | "iso-31000" | "proprietary" | "other";
  riskCommitteeBoardLevel?: boolean;
  croExists?: boolean;
  riskAssessmentFrequency?: "quarterly" | "semi-annually" | "annually" | "adhoc";
  esgRisksIntegrated?: boolean;
  internalAudit?: boolean;
  internalAuditReportsTo?: "board" | "ceo" | "cfo" | "other";
  internalAuditCoverage?: number; // %
  cisoExists?: boolean;
  cybersecurityFramework?: "nist" | "iso-27001" | "soc2" | "none";
  dataPrivacyFrameworks?: string[];
  cybersecurityIncidents?: number;
  dataBreaches?: number;
  boardCyberOversight?: boolean;

  // 4.5 Transparency & Reporting
  externalAudit?: boolean;
  auditFirm?: "big4" | "other-international" | "regional";
  auditOpinion?: "unqualified" | "qualified" | "adverse" | "disclaimer";
  financialStatementsPublic?: boolean;
  auditCommitteeFullyIndependent?: boolean;
  sustainabilityReport?: boolean;
  reportFrequency?: "annual" | "biennial" | "other";
  reportingFrameworksUsed?: string[];
  thirdPartyAssurance?: boolean;
  assuranceLevel?: "limited" | "reasonable";
  reportPublic?: boolean;
  annualReport?: boolean;
  investorCommunications?: boolean;
  investorCommFrequency?: "quarterly" | "monthly" | "other";
  materialityAssessment?: boolean;
  stakeholderInput?: boolean;
  engagementProcessDocumented?: boolean;
  esgRatings?: string[];
}

export interface ESGAssessmentData {
  id: string;
  lastUpdated: number;
  completionStatus: {
    profile: boolean;
    environmental: boolean;
    social: boolean;
    governance: boolean;
  };
  profile: Partial<OrganizationProfile>;
  environmental: Partial<EnvironmentalAssessment>;
  social: Partial<SocialAssessment>;
  governance: Partial<GovernanceAssessment>;
}

export interface ESGScores {
  environmental: EnvironmentalScore;
  social: SocialScore;
  governance: GovernanceScore;
  composite: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  alignmentClassification: "fully-aligned" | "partially-aligned" | "developing" | "not-aligned" | "critical-gaps";
  sectorWeights: {
    environmental: number;
    social: number;
    governance: number;
  };
}

export interface EnvironmentalScore {
  total: number;
  ghgEmissions: number;
  energyRenewable: number;
  waterManagement: number;
  wasteManagement: number;
  biodiversity: number;
  compliance: number;
}

export interface SocialScore {
  total: number;
  healthSafety: number;
  diversityEquityInclusion: number;
  laborPractices: number;
  humanRights: number;
  supplyChain: number;
  customerCommunity: number;
}

export interface GovernanceScore {
  total: number;
  boardStructure: number;
  executiveComp: number;
  ethicsCompliance: number;
  riskControls: number;
  transparencyDisclosure: number;
}

export type IndustrySector =
  | "manufacturing"
  | "it-technology"
  | "retail"
  | "healthcare"
  | "finance"
  | "construction"
  | "agriculture"
  | "energy"
  | "transportation"
  | "hospitality"
  | "education"
  | "real-estate"
  | "pharmaceuticals"
  | "mining"
  | "food-beverage"
  | "telecommunications"
  | "professional-services"
  | "other";

export type OrganizationSize = "micro" | "small" | "medium" | "large" | "very-large" | "enterprise";

export interface Recommendation {
  priority: "critical" | "high" | "medium";
  category: string;
  issue: string;
  impact: string;
  action: string;
  timeline: string;
  resources: string[];
  scoreImprovement: number;
  complexity: "easy" | "medium" | "hard";
}

export interface IndustryBenchmark {
  sector: IndustrySector;
  averageE: number;
  averageS: number;
  averageG: number;
  topQuartileE: number;
  topQuartileS: number;
  topQuartileG: number;
  trirBenchmark: number;
}
