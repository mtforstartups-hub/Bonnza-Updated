export type CapitalOrientation = 'lower' | 'moderate' | 'higher';

export type OperatingComplexity = 'simpler' | 'guided' | 'specialist';

export type BusinessModelKey =
  | 'source_and_sell_own_account'
  | 'make_own_product'
  | 'personalise_to_order'
  | 'original_digital_product'
  | 'authorised_licence_resale';

export type StorageProfile =
  | 'no_physical_stock'
  | 'small_dedicated_storage'
  | 'larger_space';

export type TimeProfile = 'flexible_blocks' | 'scheduled_operations';

export type OperatingTag =
  | 'fragile_items'
  | 'bulky_storage_or_shipping'
  | 'size_or_fit_variants'
  | 'expiry_or_storage_control'
  | 'electrical_or_battery_variants'
  | 'specialist_product_checks'
  | 'safety_critical_variants'
  | 'health_or_personal_wellness';

export type SkillTag =
  | 'technical'
  | 'styling'
  | 'product_care'
  | 'home_styling'
  | 'crafting'
  | 'practical'
  | 'food_preparation'
  | 'fitness'
  | 'creative';

export type ChannelResearchTag =
  | 'own_social_or_store'
  | 'domestic_marketplaces'
  | 'Etsy_creativity_rules';

export interface DepartmentRecord {
  id: string;
  name: string;
  slug: string;
  category_ids: string[];
}

export interface SubcategoryRecord {
  id: string;
  name: string;
  notes: string[];
}

export interface CategoryRecord {
  id: string;
  department_id: string;
  name: string;
  slug: string;
  subcategories: SubcategoryRecord[];
  example_idea_id: string;
  capital_orientation: CapitalOrientation;
  operating_complexity: OperatingComplexity;
  business_models_to_explore: BusinessModelKey[];
  skill_tags: SkillTag[];
  storage_profile: StorageProfile;
  time_profile: TimeProfile;
  operating_tags: OperatingTag[];
  channel_research_status: string;
  possible_channel_research: ChannelResearchTag[];
  editorial_status: string;
  classification_note: string;
}

export interface StarterIdeaRecord {
  id: string;
  category_id: string;
  title: string;
  customer: string;
  angle: string;
  first_validation_step: string;
  profit_claim: null | string;
  sales_forecast: null | string;
  source_status: string;
  primary_cta: string;
  secondary_cta: string;
}

export type QuizQuestionId =
  | 'budget'
  | 'interests'
  | 'model'
  | 'strengths'
  | 'storage'
  | 'time'
  | 'avoid'
  | 'channel';

export interface QuizQuestionRecord {
  id: QuizQuestionId;
  question: string;
  type: 'single' | 'multiple' | 'multiple_max_3';
  options?: string[];
  options_source?: 'departments';
  include_no_preference?: boolean;
  note?: string;
  weight: number;
}

export interface SourceReferenceRecord {
  name: string;
  url: string;
  reviewed: string;
  use: string;
}

export interface IdeaFinderDataset {
  version: string;
  prepared: string;
  brand: string;
  page: string;
  scope: string;
  counts: {
    departments: number;
    selling_categories: number;
    product_subcategories: number;
    starter_ideas: number;
  };
  authority: string;
  capital_definition: Record<CapitalOrientation, string>;
  departments: DepartmentRecord[];
  categories: CategoryRecord[];
  ideas: StarterIdeaRecord[];
  quiz: QuizQuestionRecord[];
  ranking: {
    weights_sum: number;
    public_score: string;
    hard_rules: string[];
    diversity: string;
    unanswered: string;
  };
  sources: SourceReferenceRecord[];
}

export interface EnrichedIdeaItem {
  idea: StarterIdeaRecord;
  category: CategoryRecord;
  department: DepartmentRecord;
  categoryImage: string;
  ideaImage: string;
}

export interface QuizAnswersState {
  budget: string | null;
  interests: string[]; // Department IDs or ['NO_PREFERENCE']
  model: string | null;
  strengths: string[];
  storage: string | null;
  time: string | null;
  avoid: string[];
  channel: string | null;
}

export type FitLabel =
  | 'Strong alignment'
  | 'Worth exploring'
  | 'Needs more preparation';

export interface RankedIdeaMatch {
  item: EnrichedIdeaItem;
  fitLabel: FitLabel;
  normalizedScore: number; // internal deterministic ranking score 0..100
  reasons: string[]; // 2-3 reasons derived strictly from visitor answers
  operatingConsideration: string;
  channelCaveat: string | null;
  firstValidationStep: string;
}

export interface EliminationSummaryItem {
  constraintLabel: string;
  removedCount: number;
  stepId: QuizQuestionId;
}

export interface QuizEvaluationResult {
  matches: RankedIdeaMatch[];
  totalCompatibleCount: number;
  eliminatedSummaries: EliminationSummaryItem[];
  activeWeightTotal: number;
  skippedFactors: string[];
  channelInvestigationNote: string | null;
  budgetEditorialNote: string | null;
  storageEditorialNote: string | null;
  diversityApplied: boolean;
}

export type DiscoveryMode = 'quiz' | 'browse';

export type DirectorySortOption =
  | 'relevance'
  | 'simpler_operations'
  | 'alphabetical';

export interface DirectoryFilterState {
  search: string;
  departmentIds: string[];
  categoryIds: string[];
  subcategoryIds: string[];
  capitalOrientations: CapitalOrientation[];
  businessModels: BusinessModelKey[];
  operatingComplexities: OperatingComplexity[];
  storageProfiles: StorageProfile[];
  channelsToResearch: ChannelResearchTag[];
  avoidTags: OperatingTag[];
  sort: DirectorySortOption;
}

export interface IdeaFinderStorageState {
  savedIdeaIds: string[];
  compareIdeaIds: string[];
}
