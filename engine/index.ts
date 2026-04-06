import { Place, UserInput, RecommendationResult, TravelPlan } from './models';
import { filterPlaces } from './filters';
import { calculateFitScore, calculateComfortScore, calculateExperienceScore, applyRejectionPenalties, getDynamicTravelTime, calculateProximityScore } from './scorers';

// Type mapping to hold scored places
interface ScoredPlace {
  place: Place;
  fitScore: number;
  comfortScore: number;
  expScore: number;
  proximityScore: number;
  finalScore: number;
}

/**
 * Generate a mockup travel plan matching the required JSON structure.
 * Standardizes actionable travel steps for MVP purposes.
 */
function generateTravelPlan(place: Place, input: UserInput): TravelPlan {
  // Simplified transit cost based on distance mapping
  const dynamicTravelTime = getDynamicTravelTime(place, input);
  const baseCost = dynamicTravelTime > 30 ? 50 : 20; 
  
  const walkDist = place.walking_distance_min || 0;
  const sim = place.route_simplicity || 'direct';
  return {
    total_travel_time: dynamicTravelTime,
    estimated_cost: baseCost,
    steps: [
      {
        instruction: "Walk to nearest transit stop",
        duration: walkDist > 0 ? Math.ceil(walkDist / 2) : 2
      },
      {
        instruction: sim === 'direct' ? "Take direct transport" : "Take transit with transfer",
        duration: Math.max(1, dynamicTravelTime - walkDist)
      },
      {
        instruction: `Walk to ${place.name}`,
        duration: walkDist > 0 ? Math.ceil(walkDist / 2) : 2
      }
    ],
    backup_option: {
      mode: "Rapido",
      estimated_cost: baseCost * 2.5, // Auto/cabs cost roughly 2.5x standard transit
      estimated_time: Math.ceil(dynamicTravelTime * 0.7) // Cabs are roughly 30% faster
    }
  };
}

export class DecisionEngine {
  
  /**
   * Main execution flow to find the best recommendation
   */
  public getRecommendation(places: Place[], input: UserInput): RecommendationResult {
    // 1. Hard Filtering
    const validPlaces = filterPlaces(places, input);
    
    if (validPlaces.length === 0) {
      return {
        best_place: null,
        reason: "No valid places found matching your constraints. Consider increasing available time or budget.",
        travel_plan: null,
        backup_options: []
      };
    }

    // 2. Scoring System
    const scoredPlaces: ScoredPlace[] = validPlaces.map(place => {
      const fitScore = calculateFitScore(place, input);
      const comfortScore = calculateComfortScore(place, input);
      const expScore = calculateExperienceScore(place, input);
      const proximityScore = calculateProximityScore(place, input);

      // Formula: (fit_score * 0.4) + (comfort_score * 0.2) + (experience_score * 0.2) + (proximityScore * 0.2)
      const baseFinalScore = (fitScore * 0.4) + (comfortScore * 0.2) + (expScore * 0.2) + (proximityScore * 0.2);
      
      // Apply penalties from previous rejections
      const finalScore = applyRejectionPenalties(baseFinalScore, place, input);

      return {
        place,
        fitScore,
        comfortScore,
        expScore,
        proximityScore,
        finalScore
      };
    });

    // Sort descending by finalScore
    scoredPlaces.sort((a, b) => b.finalScore - a.finalScore);

    // 3. Selection
    const topPlaceEntry = scoredPlaces[0];
    const bestPlace = topPlaceEntry.place;
    const backupOptions = scoredPlaces.slice(1, 3).map(s => s.place); // Up to 2 backup options

    // Reason Generator
    const topFactor = Math.max(topPlaceEntry.fitScore, topPlaceEntry.comfortScore, topPlaceEntry.expScore);
    let reasonText = "Perfect match for your needs.";
    if (topFactor === topPlaceEntry.comfortScore) reasonText = "Fast & easy to reach with your time limits.";
    if (topFactor === topPlaceEntry.expScore) reasonText = "Highly aligns with the experience you are looking for.";

    return {
      best_place: bestPlace,
      reason: reasonText,
      travel_plan: generateTravelPlan(bestPlace, input),
      backup_options: backupOptions
    };
  }
}
