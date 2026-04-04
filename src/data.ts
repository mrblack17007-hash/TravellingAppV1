import { Place } from '../engine/models';

export const mockPlaces: Place[] = [
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
    tags: ["mall", "movie", "cafe", "kill time"],
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
  },
  {
    id: "p4",
    name: "Semmozhi Poonga Botanical Garden",
    latitude: 13.0487,
    longitude: 80.2520,
    ideal_time_min: 45,
    ideal_time_max: 120,
    budget_level: "low",
    tags: ["park", "nature", "relax", "explore"],
    weather_suitability: ["normal"],
    avg_travel_time: 20,
    risk_level: "low",
    route_simplicity: "direct",
    walking_distance_min: 5
  },
  {
    id: "p5",
    name: "Phoenix Marketcity",
    latitude: 12.9915,
    longitude: 80.2166,
    ideal_time_min: 90,
    ideal_time_max: 240,
    budget_level: "high",
    tags: ["mall", "cafe", "kill time"],
    weather_suitability: ["any"],
    avg_travel_time: 40,
    risk_level: "low",
    route_simplicity: "1 transfer",
    walking_distance_min: 4 // Requires walking inside compound
  }
];
