import { Place, UserInput } from './models';
import { getDynamicTravelTime } from './scorers';

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
    // Check if explicitly rejected by ID (or name if id is undefined)
    if (input.rejected_place_ids?.includes(place.id || place.name)) {
      return false;
    }

    // 1. Time Constraint Check
    // Buffer includes travel to place, travel back, and the minimum ideal time
    const dynamicTravelTime = getDynamicTravelTime(place, input);
    const requiredTime = (dynamicTravelTime * 2) + place.ideal_time_min;
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
    if (dynamicTravelTime > travelTimeThreshold) {
      return false;
    }

    return true;
  });
}
