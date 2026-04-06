"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./engine/index");
var chennaiPlaces = [
    {
        "name": "Kapaleeshwarar Temple",
        "ideal_time_min": 45,
        "ideal_time_max": 90,
        "budget_level": "low",
        "weather_suitability": [
            "cool",
            "evening"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "heritage",
            "spiritual",
            "architecture"
        ],
        "latitude": 13.0337,
        "longitude": 80.2699
    },
    {
        "name": "Elliot\u2019s Beach (Besant Nagar)",
        "ideal_time_min": 60,
        "ideal_time_max": 180,
        "budget_level": "low",
        "weather_suitability": [
            "evening",
            "windy"
        ],
        "travel_time_estimate": 20,
        "risk_level": "low",
        "tags": [
            "beach",
            "food",
            "walking"
        ],
        "latitude": 12.9995,
        "longitude": 80.2724
    },
    {
        "name": "Government Museum (Egmore)",
        "ideal_time_min": 120,
        "ideal_time_max": 300,
        "budget_level": "low",
        "weather_suitability": [
            "hot",
            "any"
        ],
        "travel_time_estimate": 5,
        "risk_level": "low",
        "tags": [
            "history",
            "art",
            "educational"
        ],
        "latitude": 13.0711,
        "longitude": 80.2569
    },
    {
        "name": "Guindy National Park",
        "ideal_time_min": 90,
        "ideal_time_max": 180,
        "budget_level": "low",
        "weather_suitability": [
            "morning",
            "cool"
        ],
        "travel_time_estimate": 15,
        "risk_level": "low",
        "tags": [
            "nature",
            "wildlife",
            "kids"
        ],
        "latitude": 13.0036,
        "longitude": 80.2293
    },
    {
        "name": "Pondy Bazaar Pedestrian Plaza",
        "ideal_time_min": 60,
        "ideal_time_max": 180,
        "budget_level": "medium",
        "weather_suitability": [
            "evening",
            "any"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "shopping",
            "street_food",
            "walking"
        ],
        "latitude": 13.0396,
        "longitude": 80.237
    },
    {
        "name": "San Thome Basilica",
        "ideal_time_min": 30,
        "ideal_time_max": 60,
        "budget_level": "low",
        "weather_suitability": [
            "any"
        ],
        "travel_time_estimate": 15,
        "risk_level": "low",
        "tags": [
            "church",
            "history",
            "architecture"
        ],
        "latitude": 13.0337,
        "longitude": 80.2778
    },
    {
        "name": "Semmozhi Poonga",
        "ideal_time_min": 45,
        "ideal_time_max": 120,
        "budget_level": "low",
        "weather_suitability": [
            "evening",
            "morning"
        ],
        "travel_time_estimate": 5,
        "risk_level": "low",
        "tags": [
            "park",
            "nature",
            "relaxation"
        ],
        "latitude": 13.0519,
        "longitude": 80.252
    },
    {
        "name": "Anna Centenary Library",
        "ideal_time_min": 60,
        "ideal_time_max": 240,
        "budget_level": "low",
        "weather_suitability": [
            "hot",
            "any"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "library",
            "quiet",
            "educational"
        ],
        "latitude": 13.0175,
        "longitude": 80.2391
    },
    {
        "name": "Little Mount Caves",
        "ideal_time_min": 30,
        "ideal_time_max": 60,
        "budget_level": "low",
        "weather_suitability": [
            "any"
        ],
        "travel_time_estimate": 5,
        "risk_level": "low",
        "tags": [
            "hidden_gem",
            "history",
            "spiritual"
        ],
        "latitude": 13.0166,
        "longitude": 80.2269
    },
    {
        "name": "St. Thomas Mount",
        "ideal_time_min": 45,
        "ideal_time_max": 90,
        "budget_level": "low",
        "weather_suitability": [
            "evening",
            "sunset"
        ],
        "travel_time_estimate": 15,
        "risk_level": "low",
        "tags": [
            "viewpoint",
            "hills",
            "photography"
        ],
        "latitude": 13.0028,
        "longitude": 80.1925
    },
    {
        "name": "Vivekananda House",
        "ideal_time_min": 45,
        "ideal_time_max": 90,
        "budget_level": "low",
        "weather_suitability": [
            "hot",
            "any"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "museum",
            "history",
            "coastal"
        ],
        "latitude": 13.0495,
        "longitude": 80.2804
    },
    {
        "name": "DakshinaChitra",
        "ideal_time_min": 180,
        "ideal_time_max": 360,
        "budget_level": "medium",
        "weather_suitability": [
            "cloudy",
            "cool"
        ],
        "travel_time_estimate": 60,
        "risk_level": "low",
        "tags": [
            "culture",
            "crafts",
            "outdoors"
        ],
        "latitude": 12.834,
        "longitude": 80.2392
    },
    {
        "name": "Chennai Rail Museum",
        "ideal_time_min": 60,
        "ideal_time_max": 120,
        "budget_level": "low",
        "weather_suitability": [
            "any"
        ],
        "travel_time_estimate": 25,
        "risk_level": "low",
        "tags": [
            "trains",
            "kids",
            "educational"
        ],
        "latitude": 13.0984,
        "longitude": 80.2079
    },
    {
        "name": "Armenian Church",
        "ideal_time_min": 20,
        "ideal_time_max": 45,
        "budget_level": "low",
        "weather_suitability": [
            "morning"
        ],
        "travel_time_estimate": 5,
        "risk_level": "low",
        "tags": [
            "hidden_gem",
            "peaceful",
            "history"
        ],
        "latitude": 13.0898,
        "longitude": 80.2847
    },
    {
        "name": "Theosophical Society Gardens",
        "ideal_time_min": 60,
        "ideal_time_max": 120,
        "budget_level": "low",
        "weather_suitability": [
            "afternoon",
            "cool"
        ],
        "travel_time_estimate": 20,
        "risk_level": "low",
        "tags": [
            "nature",
            "quiet",
            "heritage"
        ],
        "latitude": 13.0142,
        "longitude": 80.2678
    },
    {
        "name": "Express Avenue Mall",
        "ideal_time_min": 120,
        "ideal_time_max": 240,
        "budget_level": "high",
        "weather_suitability": [
            "hot",
            "any"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "mall",
            "gaming",
            "shopping"
        ],
        "latitude": 13.0587,
        "longitude": 80.2641
    },
    {
        "name": "Birla Planetarium",
        "ideal_time_min": 90,
        "ideal_time_max": 150,
        "budget_level": "low",
        "weather_suitability": [
            "hot",
            "any"
        ],
        "travel_time_estimate": 15,
        "risk_level": "low",
        "tags": [
            "science",
            "kids",
            "indoor"
        ],
        "latitude": 13.0076,
        "longitude": 80.2405
    },
    {
        "name": "Kalakshetra Foundation",
        "ideal_time_min": 60,
        "ideal_time_max": 120,
        "budget_level": "medium",
        "weather_suitability": [
            "morning",
            "cool"
        ],
        "travel_time_estimate": 25,
        "risk_level": "low",
        "tags": [
            "arts",
            "dance",
            "tranquil"
        ],
        "latitude": 12.9866,
        "longitude": 80.2652
    },
    {
        "name": "Fort St. George Museum",
        "ideal_time_min": 60,
        "ideal_time_max": 120,
        "budget_level": "low",
        "weather_suitability": [
            "any"
        ],
        "travel_time_estimate": 10,
        "risk_level": "medium",
        "tags": [
            "colonial",
            "history",
            "military"
        ],
        "latitude": 13.0792,
        "longitude": 80.2872
    },
    {
        "name": "Connemara Public Library",
        "ideal_time_min": 30,
        "ideal_time_max": 90,
        "budget_level": "low",
        "weather_suitability": [
            "any"
        ],
        "travel_time_estimate": 5,
        "risk_level": "low",
        "tags": [
            "books",
            "architecture",
            "quiet"
        ],
        "latitude": 13.0694,
        "longitude": 80.2588
    },
    {
        "name": "Valluvar Kottam",
        "ideal_time_min": 30,
        "ideal_time_max": 60,
        "budget_level": "low",
        "weather_suitability": [
            "evening"
        ],
        "travel_time_estimate": 15,
        "risk_level": "low",
        "tags": [
            "monument",
            "culture",
            "landmark"
        ],
        "latitude": 13.052,
        "longitude": 80.2415
    },
    {
        "name": "Marina Lighthouse",
        "ideal_time_min": 20,
        "ideal_time_max": 45,
        "budget_level": "low",
        "weather_suitability": [
            "evening",
            "clear"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "viewpoint",
            "beach",
            "photography"
        ],
        "latitude": 13.0416,
        "longitude": 80.2818
    },
    {
        "name": "Mylapore Food Walk (Lanes)",
        "ideal_time_min": 60,
        "ideal_time_max": 120,
        "budget_level": "low",
        "weather_suitability": [
            "evening"
        ],
        "travel_time_estimate": 10,
        "risk_level": "low",
        "tags": [
            "street_food",
            "culture",
            "vegetarian"
        ],
        "latitude": 13.0333,
        "longitude": 80.2667
    },
    {
        "name": "Nalli Silks (T. Nagar)",
        "ideal_time_min": 45,
        "ideal_time_max": 150,
        "budget_level": "medium",
        "weather_suitability": [
            "any"
        ],
        "travel_time_estimate": 5,
        "risk_level": "low",
        "tags": [
            "shopping",
            "heritage",
            "textiles"
        ],
        "latitude": 13.0381,
        "longitude": 80.2355
    },
    {
        "name": "Besant Nagar Broken Bridge",
        "ideal_time_min": 30,
        "ideal_time_max": 60,
        "budget_level": "low",
        "weather_suitability": [
            "sunrise",
            "sunset"
        ],
        "travel_time_estimate": 25,
        "risk_level": "medium",
        "tags": [
            "hidden_gem",
            "nature",
            "scenic"
        ],
        "latitude": 13.0146,
        "longitude": 80.2755
    },
    {
        "name": "Phoenix Marketcity",
        "ideal_time_min": 120,
        "ideal_time_max": 300,
        "budget_level": "high",
        "weather_suitability": [
            "hot",
            "rainy",
            "any"
        ],
        "travel_time_estimate": 15,
        "risk_level": "low",
        "tags": [
            "mall",
            "shopping",
            "entertainment"
        ],
        "latitude": 12.9918,
        "longitude": 80.2217
    }
];
// Scenario 1: Quick Kill Time on a Hot Day
console.log("--- Scenario 1: Quick Kill Time on a Hot Day (Budget 2500) ---");
var input1 = {
    latitude: 13.0,
    longitude: 80.2,
    time_available: 3, // Hours -> 180 mins
    budget: 2500,
    mood: "kill time", // Matches mall
    weather: "hot"
};
var engine = new index_1.DecisionEngine();
var result1 = engine.getRecommendation(chennaiPlaces, input1);
console.log("Best Place:", (_a = result1.best_place) === null || _a === void 0 ? void 0 : _a.name);
console.log("Reason:", result1.reason);
console.log("Travel Plan:", JSON.stringify(result1.travel_plan, null, 2));
// Scenario 2: Rejection Handling
// If user says "Too expensive" to Express Avenue Mall
console.log("\n--- Scenario 2: Rejected the Mall (Too expensive) ---");
var input2 = __assign(__assign({}, input1), { rejected_place_ids: ["Express Avenue Mall"], rejected_reasons: [{ place_id: "Express Avenue Mall", reason: "Too expensive" }] });
var result2 = engine.getRecommendation(chennaiPlaces, input2);
console.log("Best Place (after rejection):", (_b = result2.best_place) === null || _b === void 0 ? void 0 : _b.name);
console.log("Backup Options count:", result2.backup_options.length);
console.log("\n--- Scenario 3: Not enough time for Museum ---");
// Time constraint check
var input3 = {
    latitude: 13.0,
    longitude: 80.2,
    time_available: 2.5, // 150 mins
    budget: 1000,
    mood: "explore",
    weather: "normal"
};
var result3 = engine.getRecommendation(chennaiPlaces, input3);
console.log("Best Place:", (_c = result3.best_place) === null || _c === void 0 ? void 0 : _c.name);
// Here the Museum reqs 50*2 + 150 = 250 mins, but user only has 150 mins.
// Thus museum must be hard filtered out.
