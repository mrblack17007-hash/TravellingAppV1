import { Place, UserInput } from './models';

/**
 * Step 1: Hard Filtering
 * Remove places that:
 * - Require more time than available (including return buffer)
 * - Are unsuitable for current weather
 * - Are too far (travel time > 40% of total time)
 */
export function filterPlaces(places: Place[], input: UserInput): Place[] {
  const timeAvailableMin = input.time_available * 60;

  return places.filter(place => {
    // Check if explicitly rejected by ID
    if (input.rejected_place_ids?.includes(place.id)) {
      return false;
    }

    // 1. Time Constraint Check
    // Buffer includes travel to place, travel back, and the minimum ideal time
    const requiredTime = (place.avg_travel_time * 2) + place.ideal_time_min;
    if (requiredTime > timeAvailableMin) {
      return false;
    }

    // 2. Weather Constraint Check
    // If not 'any', the place's suitability must include the current weather, 
    // or the place itself must allow 'any' weather.
    if (!place.weather_suitability.includes(input.weather) && 
        !place.weather_suitability.includes('any')) {
      return false;
    }

    // 3. Travel Time Threshold Check
    // Are too far (travel time > 40% of total time)
    const travelTimeThreshold = 0.40 * timeAvailableMin;
    if (place.avg_travel_time > travelTimeThreshold) {
      return false;
    }

    return true;
  });
}
