"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFitScore = calculateFitScore;
exports.calculateComfortScore = calculateComfortScore;
exports.getDistance = getDistance;
exports.getDynamicTravelTime = getDynamicTravelTime;
exports.calculateProximityScore = calculateProximityScore;
exports.calculateExperienceScore = calculateExperienceScore;
exports.applyRejectionPenalties = applyRejectionPenalties;
// Heuristic to map user numeric budget to place budget level (Specific for MVP / INR)
function getUserBudgetLevel(numericBudget) {
    if (numericBudget < 500)
        return 'low';
    if (numericBudget <= 2000)
        return 'medium';
    return 'high';
}
function calculateFitScore(place, input) {
    var score = 0;
    // 1. Matches time range -> +4
    // If the available time falls neatly around the ideal time (or at least covers the min)
    var availableMin = input.time_available * 60;
    // It's already filtered to ensure availableMin >= (travel_time_estimate*2 + ideal_time_min).
    // Strongest match is if they have enough time to fulfill the max ideal experience
    var dynamicTravelTime = getDynamicTravelTime(place, input);
    if (availableMin >= (dynamicTravelTime * 2) + place.ideal_time_max) {
        score += 4;
    }
    else {
        // Partial score if it only covers the minimum
        score += 2;
    }
    // 2. Matches budget -> +3
    var userBudgetLevel = getUserBudgetLevel(input.budget);
    // Matches exactly or is cheaper
    if (place.budget_level === userBudgetLevel) {
        score += 3;
    }
    else if (userBudgetLevel === 'high' || (userBudgetLevel === 'medium' && place.budget_level === 'low')) {
        // Over-budgeting for a cheaper place is still a minor fit, but exact match is +3
        score += 2;
    }
    // 3. Matches weather -> +3
    if (place.weather_suitability.includes(input.weather) || place.weather_suitability.includes('any')) {
        score += 3;
    }
    return Math.min(score, 10);
}
function calculateComfortScore(place, input) {
    var score = 0;
    // 1. Travel time
    // <15 min -> +4
    // 15–30 min -> +3
    // 30–45 min -> +2
    var dynamicTravelTime = getDynamicTravelTime(place, input);
    if (dynamicTravelTime < 15) {
        score += 4;
    }
    else if (dynamicTravelTime <= 30) {
        score += 3;
    }
    else if (dynamicTravelTime <= 45) {
        score += 2;
    }
    // 2. Route simplicity
    // Direct -> +3
    // 1 transfer -> +2
    // >1 -> +1
    var sim = place.route_simplicity || 'direct'; // Default to direct if unknown
    if (sim === 'direct') {
        score += 3;
    }
    else if (sim === '1 transfer') {
        score += 2;
    }
    else {
        score += 1;
    }
    // 3. Walking distance
    // <5 min -> +3
    // else -> +1
    var walkDist = place.walking_distance_min || 0; // Default to minimal
    if (walkDist < 5) {
        score += 3;
    }
    else {
        score += 1;
    }
    return Math.min(score, 10);
}
// Distance Calculation (Haversine formula in km)
function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
// Distance to travel time generic heuristic (roughly 7 mins per km in a city)
function getDynamicTravelTime(place, input) {
    if (!place.latitude || !place.longitude || !input.latitude || !input.longitude) {
        return place.travel_time_estimate; // Fallback to static
    }
    var dist = getDistance(input.latitude, input.longitude, place.latitude, place.longitude);
    return Math.ceil(dist * 7); // minutes
}
function calculateProximityScore(place, input) {
    if (!place.latitude || !place.longitude || !input.latitude || !input.longitude) {
        return 0; // No score
    }
    var dist = getDistance(input.latitude, input.longitude, place.latitude, place.longitude);
    if (dist >= 1.0 && dist <= 2.0) {
        return 5; // Perfect 1-2 km proximity
    }
    else if (dist < 1.0) {
        return 3; // Very close, but maybe less of a "journey", still good
    }
    else if (dist <= 5.0) {
        return 1; // within 5km
    }
    return 0;
}
var MOOD_TAG_MAPPING = {
    relax: ['beach', 'park', 'cafe', 'spa', 'nature'],
    explore: ['museum', 'monument', 'street', 'market', 'cultural'],
    'kill time': ['mall', 'cafe', 'movie', 'park', 'arcade']
};
function calculateExperienceScore(place, input) {
    var score = 0;
    // 1. Tags + Mood match
    var desiredTags = MOOD_TAG_MAPPING[input.mood] || [];
    var matchCount = place.tags.filter(function (tag) { return desiredTags.includes(tag); }).length;
    if (matchCount >= 2) {
        score += 5; // Strong match
    }
    else if (matchCount === 1) {
        score += 3; // Moderate match
    }
    else {
        score += 1; // Weak
    }
    // 2. Risk level
    if (place.risk_level === 'low') {
        score += 2;
    }
    else if (place.risk_level === 'medium') {
        score += 1;
    }
    // To ensure the experience score can reach up to 10 organically if perfectly matched
    // Let's scale or just add a baseline if it's already highly matching
    if (score === 7)
        score += 3; // Normalize a perfect 7/7 to a 10/10 for weight calculations
    else if (score >= 4)
        score += 2;
    return Math.min(score, 10);
}
// Penalty mapping logic
function applyRejectionPenalties(baseFinalScore, place, input) {
    if (!input.rejected_reasons || input.rejected_reasons.length === 0)
        return baseFinalScore;
    var penalty = 0;
    var _loop_1 = function (rejection) {
        // If the user previously rejected a place because it was "Too expensive",
        // penalize other 'high' budget places
        if (rejection.reason === 'Too expensive' && place.budget_level === 'high') {
            penalty += 1.5;
        }
        // If rejected for "Too far", penalize places with similarly long travel times
        if (rejection.reason === 'Too far' && getDynamicTravelTime(place, input) >= 30) {
            penalty += 1.5;
        }
        // If rejected for "Not my type", penalize places that share tags
        // For MVP, if it shares top tags with the rejected place, we could penalize
        // To keep it simple stateless: we assume if reason is "Not my type", we lightly penalize weak mood matches
        if (rejection.reason === 'Not my type') {
            var desiredTags_1 = MOOD_TAG_MAPPING[input.mood] || [];
            var matchCount = place.tags.filter(function (tag) { return desiredTags_1.includes(tag); }).length;
            if (matchCount < 2)
                penalty += 1.0;
        }
    };
    for (var _i = 0, _a = input.rejected_reasons; _i < _a.length; _i++) {
        var rejection = _a[_i];
        _loop_1(rejection);
    }
    return Math.max(0, baseFinalScore - penalty);
}
