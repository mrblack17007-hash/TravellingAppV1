"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngine = void 0;
var filters_1 = require("./filters");
var scorers_1 = require("./scorers");
/**
 * Generate a mockup travel plan matching the required JSON structure.
 * Standardizes actionable travel steps for MVP purposes.
 */
function generateTravelPlan(place, input) {
    // Simplified transit cost based on distance mapping
    var dynamicTravelTime = (0, scorers_1.getDynamicTravelTime)(place, input);
    var baseCost = dynamicTravelTime > 30 ? 50 : 20;
    var walkDist = place.walking_distance_min || 0;
    var sim = place.route_simplicity || 'direct';
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
                instruction: "Walk to ".concat(place.name),
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
var DecisionEngine = /** @class */ (function () {
    function DecisionEngine() {
    }
    /**
     * Main execution flow to find the best recommendation
     */
    DecisionEngine.prototype.getRecommendation = function (places, input) {
        // 1. Hard Filtering
        var validPlaces = (0, filters_1.filterPlaces)(places, input);
        if (validPlaces.length === 0) {
            return {
                best_place: null,
                reason: "No valid places found matching your constraints. Consider increasing available time or budget.",
                travel_plan: null,
                backup_options: []
            };
        }
        // 2. Scoring System
        var scoredPlaces = validPlaces.map(function (place) {
            var fitScore = (0, scorers_1.calculateFitScore)(place, input);
            var comfortScore = (0, scorers_1.calculateComfortScore)(place, input);
            var expScore = (0, scorers_1.calculateExperienceScore)(place, input);
            var proximityScore = (0, scorers_1.calculateProximityScore)(place, input);
            // Formula: (fit_score * 0.4) + (comfort_score * 0.2) + (experience_score * 0.2) + (proximityScore * 0.2)
            var baseFinalScore = (fitScore * 0.4) + (comfortScore * 0.2) + (expScore * 0.2) + (proximityScore * 0.2);
            // Apply penalties from previous rejections
            var finalScore = (0, scorers_1.applyRejectionPenalties)(baseFinalScore, place, input);
            return {
                place: place,
                fitScore: fitScore,
                comfortScore: comfortScore,
                expScore: expScore,
                proximityScore: proximityScore,
                finalScore: finalScore
            };
        });
        // Sort descending by finalScore
        scoredPlaces.sort(function (a, b) { return b.finalScore - a.finalScore; });
        // 3. Selection
        var topPlaceEntry = scoredPlaces[0];
        var bestPlace = topPlaceEntry.place;
        var backupOptions = scoredPlaces.slice(1, 3).map(function (s) { return s.place; }); // Up to 2 backup options
        // Reason Generator
        var topFactor = Math.max(topPlaceEntry.fitScore, topPlaceEntry.comfortScore, topPlaceEntry.expScore);
        var reasonText = "Perfect match for your needs.";
        if (topFactor === topPlaceEntry.comfortScore)
            reasonText = "Fast & easy to reach with your time limits.";
        if (topFactor === topPlaceEntry.expScore)
            reasonText = "Highly aligns with the experience you are looking for.";
        return {
            best_place: bestPlace,
            reason: reasonText,
            travel_plan: generateTravelPlan(bestPlace, input),
            backup_options: backupOptions
        };
    };
    return DecisionEngine;
}());
exports.DecisionEngine = DecisionEngine;
