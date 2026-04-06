"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPlaces = filterPlaces;
var scorers_1 = require("./scorers");
/**
 * Step 1: Hard Filtering
 * Remove places that:
 * - Require more time than available (including return buffer)
 * - Are unsuitable for current weather
 * - Are too far (travel time > 40% of total time)
 */
function filterPlaces(places, input) {
    var timeAvailableMin = input.time_available * 60;
    return places.filter(function (place) {
        var _a;
        // Check if explicitly rejected by ID (or name if id is undefined)
        if ((_a = input.rejected_place_ids) === null || _a === void 0 ? void 0 : _a.includes(place.id || place.name)) {
            return false;
        }
        // 1. Time Constraint Check
        // Buffer includes travel to place, travel back, and the minimum ideal time
        var dynamicTravelTime = (0, scorers_1.getDynamicTravelTime)(place, input);
        var requiredTime = (dynamicTravelTime * 2) + place.ideal_time_min;
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
        var travelTimeThreshold = 0.40 * timeAvailableMin;
        if (dynamicTravelTime > travelTimeThreshold) {
            return false;
        }
        return true;
    });
}
