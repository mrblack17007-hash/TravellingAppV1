import re
import json

filepath = r'c:\Users\Mukund ashrit\OneDrive\Desktop\TravellingApp\test_engine.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON array from test_engine.ts
match = re.search(r'const chennaiPlaces: Place\[\] = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("Could not find chennaiPlaces array")
    exit(1)

places_json = match.group(1)
try:
    places = json.loads(places_json)
except json.JSONDecodeError as e:
    print(f"JSON decode error: {e}")
    exit(1)

# Coordinate map
coord_map = {
    "Kapaleeshwarar Temple": (13.0337, 80.2699),
    "Elliot’s Beach (Besant Nagar)": (12.9995, 80.2724),
    "Government Museum (Egmore)": (13.0711, 80.2569),
    "Guindy National Park": (13.0036, 80.2293),
    "Anna Centenary Library": (13.0175, 80.2391),
    "St. Thomas Mount": (13.0028, 80.1925),
    "Little Mount Caves": (13.0166, 80.2269),
    "Vivekananda House": (13.0495, 80.2804),
    "Fort St. George Museum": (13.0792, 80.2872), # Merged names safely
    # Proxies for the rest
    "Pondy Bazaar Pedestrian Plaza": (13.0396, 80.2370),
    "San Thome Basilica": (13.0337, 80.2778),
    "Semmozhi Poonga": (13.0519, 80.2520),
    "DakshinaChitra": (12.8340, 80.2392),
    "Chennai Rail Museum": (13.0984, 80.2079),
    "Armenian Church": (13.0898, 80.2847),
    "Theosophical Society Gardens": (13.0142, 80.2678),
    "Express Avenue Mall": (13.0587, 80.2641),
    "Birla Planetarium": (13.0076, 80.2405),
    "Kalakshetra Foundation": (12.9866, 80.2652),
    "Connemara Public Library": (13.0694, 80.2588),
    "Valluvar Kottam": (13.0520, 80.2415),
    "Marina Lighthouse": (13.0416, 80.2818),
    "Mylapore Food Walk (Lanes)": (13.0333, 80.2667),
    "Nalli Silks (T. Nagar)": (13.0381, 80.2355),
    "Besant Nagar Broken Bridge": (13.0146, 80.2755)
}

# Add Phoenix Marketcity if not present
phoenix = {
    "name": "Phoenix Marketcity",
    "ideal_time_min": 120,
    "ideal_time_max": 300,
    "budget_level": "high",
    "weather_suitability": ["hot", "rainy", "any"],
    "travel_time_estimate": 15,
    "risk_level": "low",
    "tags": ["mall", "shopping", "entertainment"]
}
places.append(phoenix)
coord_map["Phoenix Marketcity"] = (12.9918, 80.2217)

for place in places:
    name = place['name']
    if name in coord_map:
        place['latitude'] = coord_map[name][0]
        place['longitude'] = coord_map[name][1]
    else:
        # Default roughly center Chennai
        place['latitude'] = 13.05
        place['longitude'] = 80.25

updated_json = json.dumps(places, indent=2)
new_content = content.replace(places_json, updated_json)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated coordinates successfully!")
