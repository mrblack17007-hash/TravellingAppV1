export type BudgetLevel = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';
export type RouteSimplicity = 'direct' | '1 transfer' | '>1 transfer';
export type Mood = 'relax' | 'explore' | 'kill time';

export interface Place {
  id?: string; // Identifier for rejection logic tracking
  name: string;
  latitude?: number;
  longitude?: number;
  ideal_time_min: number; // in minutes
  ideal_time_max: number; // in minutes
  budget_level: BudgetLevel;
  tags: string[];
  weather_suitability: string[];
  travel_time_estimate: number; // total travel time in minutes from user's location
  risk_level: RiskLevel;
  
  // Extended details (mocked for prototype) used in comfort scoring
  route_simplicity?: RouteSimplicity;
  walking_distance_min?: number;
}

export interface UserInput {
  latitude: number;
  longitude: number;
  time_available: number; // in hours
  budget: number; // numeric budget (e.g. INR)
  mood: Mood;
  weather: string;
  
  // Array of completely rejected place IDs to omit them entirely
  rejected_place_ids?: string[];
  // Rejection history to penalize tags/attributes (simulated tracking)
  rejected_reasons?: { place_id: string; reason: string }[];
}

export interface TravelStep {
  instruction: string;
  duration: number; // in minutes
}

export interface TravelPlan {
  total_travel_time: number; // in minutes
  estimated_cost: number;
  steps: TravelStep[];
  backup_option: {
    mode: string;
    estimated_cost: number;
    estimated_time: number; // in minutes
  };
}

export interface RecommendationResult {
  best_place: Place | null;
  reason: string;
  travel_plan: TravelPlan | null;
  backup_options: Place[];
}
