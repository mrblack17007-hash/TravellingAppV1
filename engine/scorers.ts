import { Place, UserInput, BudgetLevel } from './models';

// Heuristic to map user numeric budget to place budget level (Specific for MVP / INR)
function getUserBudgetLevel(numericBudget: number): BudgetLevel {
  if (numericBudget < 500) return 'low';
  if (numericBudget <= 2000) return 'medium';
  return 'high';
}

export function calculateFitScore(place: Place, input: UserInput): number {
  let score = 0;

  // 1. Matches time range -> +4
  // If the available time falls neatly around the ideal time (or at least covers the min)
  const availableMin = input.time_available * 60;
  // It's already filtered to ensure availableMin >= (avg_travel*2 + ideal_time_min).
  // Strongest match is if they have enough time to fulfill the max ideal experience
  if (availableMin >= (place.avg_travel_time * 2) + place.ideal_time_max) {
    score += 4;
  } else {
    // Partial score if it only covers the minimum
    score += 2;
  }

  // 2. Matches budget -> +3
  const userBudgetLevel = getUserBudgetLevel(input.budget);
  // Matches exactly or is cheaper
  if (place.budget_level === userBudgetLevel) {
    score += 3;
  } else if (userBudgetLevel === 'high' || (userBudgetLevel === 'medium' && place.budget_level === 'low')) {
    // Over-budgeting for a cheaper place is still a minor fit, but exact match is +3
    score += 2; 
  }

  // 3. Matches weather -> +3
  if (place.weather_suitability.includes(input.weather) || place.weather_suitability.includes('any')) {
    score += 3;
  }

  return Math.min(score, 10);
}

export function calculateComfortScore(place: Place, input: UserInput): number {
  let score = 0;

  // 1. Travel time
  // <15 min -> +4
  // 15–30 min -> +3
  // 30–45 min -> +2
  if (place.avg_travel_time < 15) {
    score += 4;
  } else if (place.avg_travel_time <= 30) {
    score += 3;
  } else if (place.avg_travel_time <= 45) {
    score += 2;
  }

  // 2. Route simplicity
  // Direct -> +3
  // 1 transfer -> +2
  // >1 -> +1
  if (place.route_simplicity === 'direct') {
    score += 3;
  } else if (place.route_simplicity === '1 transfer') {
    score += 2;
  } else {
    score += 1;
  }

  // 3. Walking distance
  // <5 min -> +3
  // else -> +1
  if (place.walking_distance_min < 5) {
    score += 3;
  } else {
    score += 1;
  }

  return Math.min(score, 10);
}

const MOOD_TAG_MAPPING: Record<string, string[]> = {
  relax: ['beach', 'park', 'cafe', 'spa', 'nature'],
  explore: ['museum', 'monument', 'street', 'market', 'cultural'],
  'kill time': ['mall', 'cafe', 'movie', 'park', 'arcade']
};

export function calculateExperienceScore(place: Place, input: UserInput): number {
  let score = 0;

  // 1. Tags + Mood match
  const desiredTags = MOOD_TAG_MAPPING[input.mood] || [];
  const matchCount = place.tags.filter(tag => desiredTags.includes(tag)).length;
  
  if (matchCount >= 2) {
      score += 5; // Strong match
  } else if (matchCount === 1) {
      score += 3; // Moderate match
  } else {
      score += 1; // Weak
  }

  // 2. Risk level
  if (place.risk_level === 'low') {
    score += 2;
  } else if (place.risk_level === 'medium') {
    score += 1;
  }
  
  // To ensure the experience score can reach up to 10 organically if perfectly matched
  // Let's scale or just add a baseline if it's already highly matching
  if (score === 7) score += 3; // Normalize a perfect 7/7 to a 10/10 for weight calculations
  else if (score >= 4) score += 2;

  return Math.min(score, 10);
}

// Penalty mapping logic
export function applyRejectionPenalties(baseFinalScore: number, place: Place, input: UserInput): number {
  if (!input.rejected_reasons || input.rejected_reasons.length === 0) return baseFinalScore;
  
  let penalty = 0;
  
  for (const rejection of input.rejected_reasons) {
    // If the user previously rejected a place because it was "Too expensive",
    // penalize other 'high' budget places
    if (rejection.reason === 'Too expensive' && place.budget_level === 'high') {
      penalty += 1.5;
    }
    
    // If rejected for "Too far", penalize places with similarly long travel times
    if (rejection.reason === 'Too far' && place.avg_travel_time >= 30) {
      penalty += 1.5;
    }

    // If rejected for "Not my type", penalize places that share tags
    // For MVP, if it shares top tags with the rejected place, we could penalize
    // To keep it simple stateless: we assume if reason is "Not my type", we lightly penalize weak mood matches
    if (rejection.reason === 'Not my type') {
       const desiredTags = MOOD_TAG_MAPPING[input.mood] || [];
       const matchCount = place.tags.filter(tag => desiredTags.includes(tag)).length;
       if (matchCount < 2) penalty += 1.0;
    }
  }

  return Math.max(0, baseFinalScore - penalty);
}
