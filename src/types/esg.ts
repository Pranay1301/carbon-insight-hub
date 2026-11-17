// ESG Assessment Data Types

// --- Enums & Unions ---

export type Region = "india" | "eu" | "global" | "us" | "other";

export type DueDiligencePurpose =
  | "regulatory-compliance"
  | "investor-disclosure"
  | "stakeholder-transparency"
  | "risk-assessment"
  | "integrated-reporting"
  | "other";

export type Framework =
  | "gri"
  | "sasb"
  | "tcfd"
  | "brsr"
  | "csrd"
  | "other";

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

export type AssessmentStep =
  | "region-selection"        // Step 1
  | "purpose-selection"       // Step 2
  | "materiality-assessment"  // Step 3
  | "policy-input"            // Step 4
  | "gap-analysis"            // Step 5
  | "risk-opportunity"        // Step 6
  | "data-process-review"     // Step 7
  | "stakeholder-engagement"  // Step 8
  | "data-gathering"          // Step 9
  | "disclosure-mapping"      // Step 10
  | "evaluation"              // Step 11
  | "scoring"                 // Step 12
  | "report-generation";      // Step 13-15

// --- Modules ---

export interface OrganizationProfile {
  organizationName: string;
  legalEntityName?: string;
  industrySector: IndustrySector;
  organizationSize: OrganizationSize;
  annualRevenue: number; // in USD or local currency
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
  // New fields
  selectedRegion?: Region;
  selectedPurposes?: DueDiligencePurpose[];
  selectedFrameworks?: Framework[];
  // Legacy fields
  reportingFrameworks?: string[];
  publishesSustainabilityReports?: "yes" | "no" | "planning";
  assessmentPeriodFrom?: string;
  assessmentPeriodTo?: string;
}

export interface MaterialityTopic {
  id: string;
  category: "environmental" | "social" | "governance";
  topicName: string;
  description: string;
  isMaterial: boolean; // Selected by user
  impactLevel: "low" | "medium" | "high"; // Significance to business
  stakeholderImportance: "low" | "medium" | "high"; // Significance to stakeholders
}

export interface PolicyDocument {
  id: string;
  category: "environmental" | "social" | "governance" | "ethics" | "other";
  name: string;
  uploadDate: string; // ISO date
  fileUrl?: string; // If file uploaded
  textContent?: string; // If text pasted
  // Analysis results
  completenessScore?: number; // 0-100
  missingKeywords?: string[];
}

export interface ESGPolicyReview {
  policies: PolicyDocument[];
  gapAnalysisResults?: {
    framework: Framework;
    missingPolicies: string[];
    partialPolicies: string[];
  }[];
}

export interface RiskOpportunityItem {
  id: string;
  type: "risk" | "opportunity";
  category: "climate" | "resource" | "social" | "governance" | "reputational";
  description: string;
  impact: "low" | "medium" | "high" | "critical";
  timeHorizon: "short" | "medium" | "long";
  managementStrategy?: string; // User input on how they handle it
}

export interface DataProcessAnswers {
  dataSource?: string;
  collectionFrequency?: "monthly" | "quaterly" | "annual" | "real-time";
  validationMethod?: "internal-review" | "external-audit" | "automated" | "none";
  managementSystem?: "erp" | "excel" | "dedicated-esg-software" | "manual";
}

export interface StakeholderEngagementEntry {
  id: string;
  stakeholderGroup: "employees" | "suppliers" | "customers" | "communities" | "investors" | "regulators" | "other";
  engagementType: "survey" | "interview" | "meeting" | "grievance-mechanism" | "other";
  date: string;
  topicsRaised: string[];
  keyFeedback: string;
  actionTaken?: string;
}

export interface QuantitativeMetric {
  id: string; // e.g., "ghg_scope1", "energy_total"
  frameworks: Framework[]; // Which frameworks require this
  category: "environmental" | "social" | "governance";
  label: string;
  unit: string;
  value?: number;
  year?: number;
  source?: string;
  isVerified?: boolean;
  verificationType?: "third-party" | "internal" | "estimated";
  notes?: string;
}

// --- Main Data Structure ---

export interface ESGAssessmentData {
  id: string;
  startedAt: number;
  lastUpdated: number;
  currentStep: AssessmentStep;

  // Data Sections
  profile: OrganizationProfile;
  materiality: MaterialityTopic[];
  policies: ESGPolicyReview;
  risksOpportunities: RiskOpportunityItem[];
  dataProcess: DataProcessAnswers;
  stakeholderEngagement: StakeholderEngagementEntry[];
  quantitativeData: QuantitativeMetric[];

  // Legacy/Compatibility fields
  completionStatus: {
    profile: boolean;
    environmental: boolean;
    social: boolean;
    governance: boolean;
    [key: string]: boolean;
  };
  environmental?: Partial<EnvironmentalAssessment>;
  social?: Partial<SocialAssessment>;
  governance?: Partial<GovernanceAssessment>;
}

// --- Scoring & Results ---

export interface FrameworkScore {
  framework: Framework;
  overallScore: number; // 0-100
  pillarScores: {
    environmental: number;
    social: number;
    governance: number;
  };
  alignmentLevel: "aligned" | "partial" | "gap";
}

export interface Recommendation {
  id?: string;
  priority: "critical" | "high" | "medium";
  category: string;
  issue: string;
  action: string;
  impact: string;
  frameworkRef?: Framework;
  // Legacy/Optional fields for compatibility
  timeline?: string;
  resources?: string[];
  scoreImprovement?: number;
  complexity?: "easy" | "medium" | "hard";
}

export interface EnvironmentalAssessment {
  measurementLevel?: "all-three" | "scope-1-2" | "scope-1-only" | "not-measured";
  scope1Emissions?: number;
  scope2Emissions?: number;
  scope3Emissions?: number;
  scope3Coverage?: number;
  hasReductionTargets?: boolean;
  targetType?: "sbti" | "absolute" | "intensity" | "none";
  targetPercentage?: number;
  targetYear?: number;
  currentProgress?: number;
  scope3Categories?: string[];
  totalEnergyConsumption?: number;
  energyConsumptionTrend?: "decreasing" | "stable" | "increasing";
  renewablePercentage?: number;
  renewableSources?: string[];
  energyManagementCertification?: "iso-50001" | "in-progress" | "planned" | "not-planned";
  energyEfficiencyPrograms?: "comprehensive" | "limited" | "no";
  energyEfficiencyTargets?: boolean;
  targetEfficiencyImprovement?: number;
  totalWaterWithdrawal?: number;
  operationsInWaterStressed?: "yes" | "no";
  waterRecyclingRate?: number;
  treatmentBeforeDischarge?: boolean;
  totalWasteGenerated?: number;
  hazardousWaste?: number;
  wasteDiversionRate?: number;
  wasteDisposalMethods?: { landfill?: number; recycling?: number; composting?: number; incineration?: number };
  zeroWasteGoal?: "yes-with-targets" | "under-development" | "no";
  operationsNearProtectedAreas?: "yes" | "no";
  biodiversityImpactAssessment?: boolean;
  biodiversityManagementPlan?: boolean;
  biodiversityConservationPrograms?: "active" | "limited" | "no";
  habitatsProtectedRestored?: number;
  iso14001Certified?: boolean;
  environmentalViolations?: number;
  environmentalPolicyPublic?: boolean;
  regularEnvironmentalAudits?: boolean;
}

export interface SocialAssessment {
  totalWorkforce?: number;
  trir?: number;
  ltir?: number;
  recordableInjuries?: number;
  totalHoursWorked?: number;
  fatalities?: number;
  iso45001Certified?: boolean;
  hsManagementSystemCoverage?: number;
  safetyTrainingHours?: number;
  employeesWomen?: number;
  seniorMgmtWomen?: number;
  seniorMgmtMen?: number;
  boardWomen?: number;
  boardMen?: number;
  womenInWorkforce?: number;
  womenInManagement?: number;
  womenInLeadership?: number;
  womenOnBoard?: number;
  formalDeiPolicy?: boolean;
  deiTraining?: boolean;
  diversityTargets?: "specific" | "aspirational" | "no";
  payEquityAnalysis?: boolean;
  genderPayGap?: number;
  annualTurnoverRate?: number;
  minimumWagePolicy?: "living-wage" | "above-minimum" | "legal-minimum" | "below-minimum";
  collectiveBargainingCoverage?: number;
  freedomOfAssociation?: boolean;
  childForcedLaborIncidents?: number;
  humanRightsPolicy?: boolean;
  humanRightsDueDiligence?: boolean;
  supplierAudits?: number;
  supplierAuditsFrequency?: "regular" | "risk-based" | "occasional" | "none";
  suppliersScreenedSocial?: number;
  communityInvestment?: number;
  customerSatisfactionScore?: number;
  productSafetyIncidents?: number;
  dataPrivacyFramework?: "iso-27001" | "gdpr" | "other" | "none";
}

export interface GovernanceAssessment {
  totalBoardSize?: number;
  independentDirectors?: number;
  womenOnBoard?: number;
  sustainabilityCommittee?: boolean;
  riskCommittee?: boolean;
  boardEvaluation?: boolean;
  variableCompLinkedToEsg?: boolean;
  esgLinkagePercentage?: number;
  ceoPayRatio?: number;
  executiveTurnover?: number;
  ceoChairmanSeparated?: boolean;
  codeOfConduct?: boolean;
  antiCorruptionPolicy?: boolean;
  whistleblowerMechanism?: boolean;
  antiRetaliation?: boolean;
  corruptionViolations?: number;
  antiCompetitiveViolations?: number;
  financialViolations?: number;
  ermFramework?: "coso" | "iso-31000" | "proprietary" | "other";
  esgRisksIntegrated?: boolean;
  cybersecurityFramework?: "nist" | "iso-27001" | "soc2" | "none";
  internalAudit?: boolean;
  sustainabilityReport?: boolean;
  thirdPartyAssurance?: boolean;
  externalAudit?: boolean;
  materialityAssessment?: boolean;
  stakeholderInput?: boolean;
  engagementProcessDocumented?: boolean;
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

export interface ESGScores {
  environmental: EnvironmentalScore;
  social: SocialScore;
  governance: GovernanceScore;
  composite: number;
  sectorWeights: { environmental: number; social: number; governance: number };
  riskLevel: "low" | "medium" | "high" | "critical";
  alignmentClassification: "fully-aligned" | "partially-aligned" | "developing" | "not-aligned" | "critical-gaps";
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
