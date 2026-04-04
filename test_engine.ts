import { Place, UserInput } from './engine/models';
import { DecisionEngine } from './engine/index';

const mockPlaces: Place[] = [
  {
    id: "p1",
    name: "Marina Beach",
    latitude: 13.0500,
    longitude: 80.2824,
    ideal_time_min: 60,
    ideal_time_max: 180,
    budget_level: "low",
    tags: ["beach", "relax", "nature"],
    weather_suitability: ["hot", "normal"],
    avg_travel_time: 25,
    risk_level: "low",
    route_simplicity: "1 transfer",
    walking_distance_min: 10
  },
  {
    id: "p2",
    name: "Express Avenue Mall",
    latitude: 13.0587,
    longitude: 80.2641,
    ideal_time_min: 120,
    ideal_time_max: 240,
    budget_level: "high",
    tags: ["mall", "movie", "cafe"],
    weather_suitability: ["any"],
    avg_travel_time: 15,
    risk_level: "low",
    route_simplicity: "direct",
    walking_distance_min: 3
  },
  {
    id: "p3",
    name: "DakshinaChitra Museum",
    latitude: 12.8340,
    longitude: 80.2392,
    ideal_time_min: 150,
    ideal_time_max: 300,
    budget_level: "medium",
    tags: ["museum", "cultural", "explore"],
    weather_suitability: ["normal"],
    avg_travel_time: 50,
    risk_level: "low",
    route_simplicity: ">1 transfer",
    walking_distance_min: 15
  }
];

// Scenario 1: Quick Kill Time on a Hot Day
console.log("--- Scenario 1: Quick Kill Time on a Hot Day (Budget 2500) ---");
const input1: UserInput = {
  latitude: 13.0,
  longitude: 80.2,
  time_available: 3, // Hours -> 180 mins
  budget: 2500,
  mood: "kill time", // Matches mall
  weather: "hot"
};

const engine = new DecisionEngine();
const result1 = engine.getRecommendation(mockPlaces, input1);
console.log("Best Place:", result1.best_place?.name);
console.log("Reason:", result1.reason);
console.log("Travel Plan:", JSON.stringify(result1.travel_plan, null, 2));


// Scenario 2: Rejection Handling
// If user says "Too expensive" to Express Avenue Mall
console.log("\n--- Scenario 2: Rejected the Mall (Too expensive) ---");
const input2: UserInput = {
  ...input1,
  rejected_place_ids: ["p2"],
  rejected_reasons: [{ place_id: "p2", reason: "Too expensive" }]
};

const result2 = engine.getRecommendation(mockPlaces, input2);
console.log("Best Place (after rejection):", result2.best_place?.name);
console.log("Backup Options count:", result2.backup_options.length);

console.log("\n--- Scenario 3: Not enough time for Museum ---");
// Time constraint check
const input3: UserInput = {
  latitude: 13.0,
  longitude: 80.2,
  time_available: 2.5, // 150 mins
  budget: 1000,
  mood: "explore",
  weather: "normal"
};
const result3 = engine.getRecommendation(mockPlaces, input3);
console.log("Best Place:", result3.best_place?.name);
// Here the Museum reqs 50*2 + 150 = 250 mins, but user only has 150 mins.
// Thus museum must be hard filtered out.
