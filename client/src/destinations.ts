const destinations = [
    {
      name: "Cape Coast",
      region: "Central Region",
      description: "Historic coastal town with rich cultural heritage and stunning beaches. Cape Coast Castle, a UNESCO World Heritage site, stands as a powerful reminder of the transatlantic slave trade. Nearby, Kakum National Park offers treetop walks through lush rainforest.",
      shortDescription: "Historic coastal town with rich cultural heritage and stunning beaches.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Cape_Coast_Castle%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 5.1053, lng: -1.2466 },
      topAttractions: ["Cape Coast Castle", "Kakum National Park"],
      tags: ["Cultural Heritage", "Beaches"]
    },
    {
      name: "Kakum National Park",
      region: "Central Region",
      description: "A tropical rainforest reserve featuring a canopy walkway suspended 30 meters above the forest floor, offering a unique perspective of the rich biodiversity.",
      shortDescription: "Rainforest reserve with a famous canopy walkway.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Kakum_National_Park_Canopy_Walkway.jpg",
      rating: 0,
      coordinates: { lat: 5.3811, lng: -1.3171 },
      topAttractions: ["Canopy Walkway", "Nature Trails"],
      tags: ["Nature", "Adventure"]
    },
    {
      name: "Mole National Park",
      region: "Savannah Region",
      description: "Ghana's largest wildlife refuge, home to elephants, antelopes, and over 250 bird species, offering safari experiences in a savannah landscape.",
      shortDescription: "Ghana's premier safari destination.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Mole_National_Park_elephants.jpg",
      rating: 0,
      coordinates: { lat: 9.7036, lng: -1.8033 },
      topAttractions: ["Wildlife Safaris", "Larbanga Mosque"],
      tags: ["Wildlife", "Safari"]
    },
    {
      name: "Elmina Castle",
      region: "Central Region",
      description: "A UNESCO World Heritage site and one of the oldest European buildings in sub-Saharan Africa, significant for its role in the transatlantic slave trade.",
      shortDescription: "Historic castle with deep historical significance.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Elmina_Castle%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 5.0847, lng: -1.3509 },
      topAttractions: ["Elmina Castle", "Fishing Harbor"],
      tags: ["History", "Architecture"]
    },
    {
      name: "Lake Volta",
      region: "Volta Region",
      description: "One of the world's largest man-made lakes, offering opportunities for boat cruises, fishing, and exploration of surrounding villages.",
      shortDescription: "Expansive lake ideal for water activities.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Lake_Volta%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 7.0, lng: 0.0 },
      topAttractions: ["Boat Tours", "Akosombo Dam"],
      tags: ["Nature", "Recreation"]
    },
    {
      name: "Wli Waterfalls",
      region: "Volta Region",
      description: "The tallest waterfall in West Africa, nestled within the Agumatsa Wildlife Sanctuary, surrounded by lush greenery and rich biodiversity.",
      shortDescription: "West Africa's tallest waterfall amidst nature.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wli_Waterfalls%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 7.0033, lng: 0.5667 },
      topAttractions: ["Wli Falls", "Agumatsa Sanctuary"],
      tags: ["Nature", "Hiking"]
    },
    {
      name: "Aburi Botanical Gardens",
      region: "Eastern Region",
      description: "A serene garden established in 1890, featuring a diverse collection of tropical plants and trees, ideal for relaxation and education.",
      shortDescription: "Historic botanical gardens with diverse flora.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Aburi_Botanical_Gardens%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 5.8480, lng: -0.1730 },
      topAttractions: ["Botanical Gardens", "Scenic Views"],
      tags: ["Nature", "Education"]
    },
    {
      name: "Kumasi",
      region: "Ashanti Region",
      description: "The cultural capital of the Ashanti Kingdom, known for its rich history, traditional crafts, and vibrant markets.",
      shortDescription: "Ashanti cultural hub with historic sites.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Kejetia_Market%2C_Kumasi%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 6.6885, lng: -1.6244 },
      topAttractions: ["Manhyia Palace", "Kejetia Market"],
      tags: ["Culture", "History"]
    },
    {
      name: "Nzulezo",
      region: "Western Region",
      description: "A unique village built entirely on stilts over Lake Tadane, offering insights into traditional lifestyles and architecture.",
      shortDescription: "Stilt village showcasing traditional living.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Nzulezo_stilt_village%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 5.0010, lng: -2.3330 },
      topAttractions: ["Stilt Village Tour", "Lake Tadane"],
      tags: ["Culture", "Unique Architecture"]
    },
    {
      name: "Paga Crocodile Pond",
      region: "Upper East Region",
      description: "A sacred pond where crocodiles are revered and coexist peacefully with humans, allowing for close interactions.",
      shortDescription: "Sacred pond with friendly crocodiles.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Paga_Crocodile_Pond%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 10.9970, lng: -0.8990 },
      topAttractions: ["Crocodile Interactions", "Paga Shrine"],
      tags: ["Culture", "Wildlife"]
    },
    {
      name: "Keta Lagoon",
      region: "Volta Region",
      description: "The largest lagoon in Ghana, recognized as a Ramsar site, supporting diverse bird species and traditional fishing communities.",
      shortDescription: "Vital wetland with rich biodiversity and cultural significance.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Keta_Lagoon%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 5.9167, lng: 0.9833 },
      topAttractions: ["Bird Watching", "Fishing Villages"],
      tags: ["Nature", "Culture"]
    },
    {
      name: "Fort Prinzenstein",
      region: "Volta Region",
      description: "A Danish fort built in 1784, significant for its role in the Atlantic slave trade, now a historical monument.",
      shortDescription: "Historic fort reflecting colonial history.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Fort_Prinzenstein%2C_Keta%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 5.9167, lng: 0.9833 },
      topAttractions: ["Fort Tours", "Historical Exhibits"],
      tags: ["History", "Architecture"]
    },
    {
      name: "Kintampo Waterfalls",
      region: "Bono East Region",
      description: "A multi-stage waterfall on the Pumpum River, surrounded by lush vegetation and featuring a canopy walkway.",
      shortDescription: "Scenic waterfall with lush surroundings.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Kintampo_Waterfalls%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 8.0560, lng: -1.7330 },
      topAttractions: ["Waterfall", "Canopy Walkway"],
      tags: ["Nature", "Adventure"]
    },
    {
      name: "Manhyia Palace Museum",
      region: "Ashanti Region",
      description: "A museum located within the Manhyia Palace, showcasing the history and culture of the Ashanti Kingdom.",
      shortDescription: "Museum preserving Ashanti heritage.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Manhyia_Palace_Museum%2C_Kumasi%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 6.7000, lng: -1.6167 },
      topAttractions: ["Ashanti Artifacts", "Royal History"],
      tags: ["Culture", "History"]
    },
    {
      name: "Tafi Atome Monkey Sanctuary",
      region: "Volta Region",
      description: "A community-based ecotourism project preserving a sacred grove inhabited by mona monkeys.",
      shortDescription: "Sanctuary for mona monkeys in a sacred grove.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tafi_Atome_Monkey_Sanctuary%2C_Ghana.jpg",
      rating: 0,
      coordinates: { lat: 7.0167, lng: 0.5333 },
      topAttractions: ["Monkey Watching", "Nature Trails"],
      tags: ["Wildlife", "Culture"]
    },
]
  