/*
  Surmai content and interactions
  Edit the arrays below to add more fish dishes, regions, or seasonal notes.
*/

const dishes = [
  {
    name: "Surmai Tawa Fry",
    pronunciation: "soor-MY tah-wah fry",
    role: "Fish classic",
    region: "Konkan",
    fish: "Surmai / Seer fish",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Surmai%20Fry.jpg",
    description:
      "A Maharashtra and Goa favourite where kingfish steaks are marinated with chilli, turmeric, garlic, kokum or lime, then seared until the edges turn crisp.",
    tags: ["tawa", "spicy", "firm fish"],
  },
  {
    name: "Pomfret Recheado",
    pronunciation: "POM-fret reh-shah-doh",
    role: "Stuffed fish",
    region: "Goa",
    fish: "White pomfret",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mackerel%20Recheado.jpg",
    description:
      "Whole pomfret is slit and packed with a red masala of chillies, vinegar, garlic, cumin, and warm spices before shallow frying.",
    tags: ["stuffed", "vinegar", "whole fish"],
  },
  {
    name: "Shorshe Ilish",
    pronunciation: "SHOR-shay ee-lish",
    role: "River icon",
    region: "Bengal",
    fish: "Hilsa / Ilish",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Shorshe%20Ilish.jpg",
    description:
      "Hilsa is steamed or simmered in a pungent mustard paste with green chilli and mustard oil, giving Bengal one of its most iconic plates.",
    tags: ["mustard", "steamed", "oily fish"],
  },
  {
    name: "Rohu Machher Jhol",
    pronunciation: "ROH-hoo mah-cher jhol",
    role: "Everyday curry",
    region: "Bengal",
    fish: "Rohu",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bori%20diye%20rui%20machher%20jhol.jpg",
    description:
      "A lighter everyday curry with fried rohu, potatoes, tomatoes, cumin, turmeric, and coriander, usually served with plain rice.",
    tags: ["curry", "freshwater", "home style"],
  },
  {
    name: "Karimeen Pollichathu",
    pronunciation: "kah-ree-meen poh-lee-chah-thu",
    role: "Leaf roast",
    region: "Kerala",
    fish: "Pearl spot / Karimeen",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Karimeen%20Pollichathu.jpg",
    description:
      "Pearl spot is fried, covered with onion-tomato-coconut masala, wrapped in banana leaf, and pan-roasted for a smoky backwater aroma.",
    tags: ["banana leaf", "coconut", "backwater"],
  },
  {
    name: "Meen Moilee",
    pronunciation: "meen moy-lee",
    role: "Coconut curry",
    region: "Kerala",
    fish: "Kingfish or pomfret",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fish%20Moilee%20Kerala%20Style.JPG",
    description:
      "A gentler coconut milk curry scented with curry leaves, ginger, green chilli, and pepper, often paired with appam or idiyappam.",
    tags: ["coconut milk", "mild", "appam"],
  },
  {
    name: "Chettinad Fish Curry",
    pronunciation: "chet-tee-nahd fish curry",
    role: "Spice curry",
    region: "Tamil Nadu",
    fish: "Vanjaram / Seer fish",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chettinad%20Fish%20curry.JPG",
    description:
      "A dark, peppery curry with tamarind, shallots, curry leaves, fennel, coriander, and roasted spice paste from Chettinad kitchens.",
    tags: ["tamarind", "pepper", "seer fish"],
  },
  {
    name: "Andhra Chepala Pulusu",
    pronunciation: "AHN-dhra cheh-pah-lah poo-loo-soo",
    role: "Tamarind stew",
    region: "Andhra",
    fish: "Rohu, murrel, or seer",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fish%20Pulusu%20FoodBells%20of%20WELLBELLS%20Guntur%20Andhra%20Pradesh.jpg",
    description:
      "A punchy tamarind-based fish stew with chilli, fenugreek, garlic, and coriander, often better after resting for a few hours.",
    tags: ["tamarind", "fiery", "pulusu"],
  },
  {
    name: "Bombil Fry",
    pronunciation: "bom-BEEL fry",
    role: "Crisp fry",
    region: "Mumbai",
    fish: "Bombay duck / Bombil",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bombil%20Fry%20%286883605717%29.jpg",
    description:
      "Soft Bombay duck is coated in rice flour, semolina, chilli, and turmeric, then fried until delicate, crisp, and almost lace-like.",
    tags: ["crispy", "coastal", "snack"],
  },
  {
    name: "Goan Prawn Curry",
    pronunciation: "GO-un prawn curry",
    role: "Prawn curry",
    region: "Goa",
    fish: "Prawns / Shrimp",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Goan%20prawn%20curry.jpg",
    description:
      "Prawns simmer in coconut, tamarind, chilli, coriander, and cumin, making a bright curry that needs rice or pao to catch the gravy.",
    tags: ["prawns", "coconut", "tamarind"],
  },
  {
    name: "Squid Ghee Roast",
    pronunciation: "skwid ghee roast",
    role: "Squid roast",
    region: "Mangalore",
    fish: "Squid / Calamari",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Squid%20Ghee%20Roast.jpg",
    description:
      "Tender squid is tossed in a deep red ghee roast masala with chillies, tamarind, garlic, and warm spice until glossy and clingy.",
    tags: ["squid", "ghee roast", "Mangalorean"],
  },
  {
    name: "Crab Xec Xec",
    pronunciation: "crab shek-shek",
    role: "Crab feast",
    region: "Goa",
    fish: "Mud crab",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Crab%20xec%20xec.JPG",
    description:
      "A Goan crab preparation with roasted coconut, spices, tamarind, and shell-on crab pieces that are meant to be cracked and eaten slowly.",
    tags: ["crab", "roasted coconut", "hands-on"],
  },
  {
    name: "Tisrya Sukka",
    pronunciation: "tiss-rya sook-kah",
    role: "Shellfish sukka",
    region: "Konkan",
    fish: "Clams / Tisrya",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Clam%20Sukha.jpg",
    description:
      "Small clams are cooked dry with coconut, onion, chilli, turmeric, and coastal masala, creating a briny side dish for rice bhakri or dal rice.",
    tags: ["clams", "dry masala", "coconut"],
  },
  {
    name: "Kallumakkaya Fry",
    pronunciation: "kah-loo-mah-kai-yah fry",
    role: "Mussel snack",
    region: "Kerala",
    fish: "Mussels / Kallumakkaya",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kallumakkaya%20fry%20from%20Kerala%2001.jpg",
    description:
      "Kerala mussels are cleaned, spiced, and fried until their edges crisp, often eaten as a snack or alongside rice and curry.",
    tags: ["mussels", "shellfish", "Kerala"],
  },
];

// Demo shop products. Prices and availability are presentation samples, not live Blinkit/Zepto inventory.
const seafoodProducts = [
  {
    id: "surmai-steaks",
    name: "Surmai Steaks",
    category: "Fish",
    weight: "500 g",
    price: 549,
    availability: "Available today",
    eta: "28 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Surmai%20Fish.JPG",
  },
  {
    id: "pomfret-whole",
    name: "Whole Pomfret",
    category: "Fish",
    weight: "2 pcs",
    price: 699,
    availability: "Only 6 left",
    eta: "32 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pomfret%20Fish.jpg",
  },
  {
    id: "cleaned-prawns",
    name: "Cleaned Prawns",
    category: "Prawns",
    weight: "250 g",
    price: 329,
    availability: "Fresh catch",
    eta: "24 min",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mud-crab",
    name: "Live Mud Crab",
    category: "Crab",
    weight: "1 pc",
    price: 499,
    availability: "Limited stock",
    eta: "35 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mud%20crab%20Scylla%20serrata.jpg",
  },
  {
    id: "squid-rings",
    name: "Squid Rings",
    category: "Squid",
    weight: "300 g",
    price: 279,
    availability: "Ready to cook",
    eta: "26 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Squid%20rings.jpg",
  },
  {
    id: "clams-pack",
    name: "Fresh Clams",
    category: "Shellfish",
    weight: "500 g",
    price: 219,
    availability: "Morning batch",
    eta: "30 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Clams%20seafood.jpg",
  },
  {
    id: "mussels-pack",
    name: "Kerala Mussels",
    category: "Shellfish",
    weight: "500 g",
    price: 249,
    availability: "Available today",
    eta: "34 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mussels%20on%20ice.jpg",
  },
  {
    id: "bombil-cleaned",
    name: "Cleaned Bombil",
    category: "Fish",
    weight: "400 g",
    price: 199,
    availability: "Best seller",
    eta: "22 min",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bombay%20duck%20fish.jpg",
  },
];

// Regional cards power the tabbed section below the dish atlas.
const regions = [
  {
    name: "Konkan and Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80",
    summary:
      "This belt cooks with coconut, kokum, toddy vinegar, dried chillies, and rice. Fish is often fried hard, while prawns, crab, clams, and squid take roasted coconut or dry sukka masalas beautifully.",
    fish: ["Surmai for tawa fry", "Pomfret for recheado", "Prawns for coconut curry", "Crab for xec xec", "Clams for tisrya sukka", "Squid for chilli fry"],
  },
  {
    name: "Bengal and Odisha",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Mustard oil, nigella, poppy seed, yoghurt, and green chilli define many river and estuary dishes. Hilsa is prized, rohu anchors everyday meals, and prawns become celebratory in malai curry.",
    fish: ["Hilsa for shorshe ilish", "Rohu for machher jhol", "Catla for kalia", "Prawns for chingri malai curry", "Crab for kosha-style gravies", "Freshwater prawns for festive plates"],
  },
  {
    name: "Kerala Coast",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Kerala balances coconut milk, curry leaves, black pepper, tamarind, raw mango, and banana-leaf cooking. Fish, prawns, mussels, squid, and crab each get their own rhythm of roast, fry, curry, or leaf steam.",
    fish: ["Karimeen for pollichathu", "Kingfish for moilee", "Prawns for chemmeen roast", "Mussels for kallumakkaya fry", "Crab for nadan njandu curry", "Squid for kanava roast"],
  },
  {
    name: "Tamil and Andhra",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Tamarind, shallots, chilli, curry leaves, and roasted spice pastes create deeply savoury curries. Prawns, crab, and squid can carry the same heat as seer fish or murrel.",
    fish: ["Vanjaram for Chettinad curry", "Murrel for pulusu", "Prawns for eral thokku", "Crab for nandu masala", "Squid for kanava fry", "Rohu for home curries"],
  },
];

// Restaurant guide: review notes are editorial summaries, not live ratings.
const restaurantGuide = [
  {
    region: "Konkan and Goa",
    places: [
      {
        name: "Mahesh Lunch Home",
        city: "Fort, Mumbai",
        image:
          "https://media.cntraveler.com/photos/69c8491453b0b190d5518aa4/16%3A9/w_748%2Cc_limit/A1_00005%2520%281%29.jpg",
        try: "Surmai curry, kingfish fry, butter garlic crab, prawn curry",
        review:
          "A classic Mumbai seafood room with a long Mangalorean-Konkan reputation. Go here when you want polished service, strong gravies, surmai, crab, and prawn dishes under one roof.",
        source: "https://www.tripadvisor.com/Restaurant_Review-g304554-d1115698-Reviews-Mahesh_Lunch_Home-Mumbai_Maharashtra.html",
      },
      {
        name: "Bombil",
        city: "Panjim, Goa",
        image: "https://imgmediagumlet.lbb.in/media/2019/05/5cf0dca7967cbb4374d87410_1559288999024.jpg",
        try: "Goan fish thali, kingfish special thali, prawn curry, crab xec xec",
        review:
          "A modern Goan thali spot that keeps the meal coastal and generous without feeling old-fashioned. Best for tasting fish, prawns, crab, and dry seafood sides in one sitting.",
        source: "https://www.timeout.com/india/restaurants/bombil",
      },
    ],
  },
  {
    region: "Bengal and Odisha",
    places: [
      {
        name: "Aaheli",
        city: "Kolkata",
        image: "https://www.peerlesshotels.com/assets/images/sd/sbr_gallery/gall1.jpg",
        try: "Shorshe Ilish, chingri malai curry, seasonal hilsa menus",
        review:
          "A fine-dining Bengali institution that helped make dishes like shorshe ilish restaurant classics. Choose it for elegant mustard fish and richer prawn preparations like chingri malai curry.",
        source: "https://www.cntraveller.in/story/best-bengali-restaurants-in-kolkata/",
      },
      {
        name: "Ilish Truly Bong",
        city: "Park Street, Kolkata",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bengali%20Cuisine%20Thali.jpg",
        try: "Bhapa Hilsa, Bhapa Bhetki, prawn malai-style specials",
        review:
          "A more focused Bengali seafood destination with a menu built around fish comfort. It is useful when the goal is ilish first, with prawns as the natural second order.",
        source: "https://wanderlog.com/place/details/4864993/ilish-truly-bong-restaurant-parkstreet-a-unit-of-saveurs-innovantes-pvt-ltd",
      },
    ],
  },
  {
    region: "Kerala Coast",
    places: [
      {
        name: "Grand Pavilion",
        city: "Kochi",
        image: "https://grandhotelkerala.com/wp-content/uploads/2025/11/Grand-38.jpg",
        try: "Karimeen Pollichathu, prawn roast, Kerala crab curry, appam",
        review:
          "An old-school Kochi favourite with dependable Kerala seafood and a family-dining feel. Keep it on the list for karimeen, but use it for prawns and crab when you want a fuller coastal spread.",
        source: "https://www.tripadvisor.com/Restaurant_Review-g297633-d1798430-Reviews-Grand_Pavilion-Kochi_Cochin_Ernakulam_District_Kerala.html",
      },
      {
        name: "No.10 Fort Cochin",
        city: "Bengaluru",
        image: "https://10fortcochin.com/wp-content/uploads/2022/09/about-2.jpg",
        try: "Karimeen Pollichathu, Alleppey karimeen curry, netholi curry, prawn roast",
        review:
          "A good pick for Kerala seafood comfort without hunting too far. The menu names pearl-spot and anchovy dishes clearly, and prawn roast rounds out the order well.",
        source: "https://10fortcochin.com/",
      },
    ],
  },
  {
    region: "Tamil and Andhra",
    places: [
      {
        name: "Anjappar",
        city: "Chennai",
        image:
          "https://static.wixstatic.com/media/4e5aec_58555bf4687243568aaa16c4f964eedc~mv2.png/v1/crop/x_0%2Cy_637%2Cw_12502%2Ch_690/fill/w_1494%2Ch_77%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/4e5aec_58555bf4687243568aaa16c4f964eedc~mv2.png",
        try: "Chettinad fish curry, nandu masala, prawn pepper fry, vanjaram fry",
        review:
          "A heritage Chettinad chain that is useful for the peppery, tamarind-led Tamil side of the guide. Order fish curry, crab, or prawn pepper fry with rice rather than treating it like a snack.",
        source: "https://www.anjappar.com/",
      },
      {
        name: "Poruginti Chepala Pulusu",
        city: "Hyderabad",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fish%20Pulusu%20FoodBells%20of%20WELLBELLS%20Guntur%20Andhra%20Pradesh.jpg",
        try: "Chepala pulusu, royyala pulusu, crab fry, fish head pulusu",
        review:
          "A direct Andhra-style choice for pulusu cravings: sour, chilli-forward, and rice-friendly. Use it for fish pulusu first, then branch into prawns or crab for the same tamarind heat.",
        source: "https://www.zomato.com/hyderabad/poruginti-chepala-pulusu-moosapet/order",
      },
    ],
  },
];

// Mumbai-only fresh seafood finder. Other coastal regions are marked coming soon in the UI.
const mumbaiMarkets = [
  {
    name: "Navghar Fish Market",
    area: "Bhayandar East",
    lat: 19.3107,
    lng: 72.8539,
    bestFor: "Daily fish, prawns, small shellfish",
    tip: "Useful for the northern end of the route. Visit early morning for better choice and cleaner cuts.",
    quality: "Local buying spot",
    code: "BHY",
    mapsQuery: "Navghar Fish Market Bhayandar East Mumbai",
  },
  {
    name: "Borivali IC Colony Fresh Fish",
    area: "Borivali West",
    lat: 19.2364,
    lng: 72.8476,
    bestFor: "Surmai, pomfret, prawns, crab, bombil",
    tip: "A practical Borivali-side option for home delivery or local pickup-style buying when you do not want to travel to Malad or Versova.",
    quality: "Borivali seafood access",
    code: "BOR",
    mapsQuery: "Fresh fish IC Colony Borivali West Mumbai",
  },
  {
    name: "Farm & Fish",
    area: "Kandivali East",
    lat: 19.2058,
    lng: 72.8682,
    bestFor: "Cleaned fish, prawns, squid, ready-to-cook seafood",
    tip: "Good for Kandivali and Thakur Complex users who want a cleaner store-style buy instead of a wet-market run.",
    quality: "Kandivali store pick",
    code: "KAN",
    mapsQuery: "Farm & Fish Kandivali East Mumbai",
  },
  {
    name: "Malad Fish Market",
    area: "Malad West",
    lat: 19.1867,
    lng: 72.8488,
    bestFor: "Pomfret, prawns, crabs, bombil, wholesale buys",
    tip: "One of the strongest western-line market stops. Go early, expect wet floors, bargain respectfully, and use the cleaning/cutting section.",
    quality: "Wholesale variety",
    code: "MAL",
    mapsQuery: "Malad Fish Market Sainath Road Malad West Mumbai",
  },
  {
    name: "Versova Fish Market",
    area: "Versova / Andheri West",
    lat: 19.1351,
    lng: 72.8096,
    bestFor: "Surmai, pomfret, prawns, crabs",
    tip: "A strong western-suburb market connected to the Koli fishing belt. Great when you want variety without going south.",
    quality: "Coastal catch variety",
    code: "VER",
    mapsQuery: "Versova Fish Market Mumbai",
  },
  {
    name: "Khar Danda Fish Market",
    area: "Khar / Bandra",
    lat: 19.0701,
    lng: 72.8247,
    bestFor: "Prawns, pomfret, mackerel, crabs",
    tip: "Good for Bandra, Khar, and Santacruz residents. Expect a busy local market feel and negotiate politely.",
    quality: "Neighbourhood favourite",
    code: "KHR",
    mapsQuery: "Khar Danda Fish Market Mumbai",
  },
  {
    name: "Bandra Fish Market",
    area: "Bandra West",
    lat: 19.0552,
    lng: 72.8294,
    bestFor: "Pomfret, surmai, prawns, squid",
    tip: "Convenient if you live around Bandra or Mahim. Go before lunch for fresher display and faster cleaning.",
    quality: "Easy suburb access",
    code: "BDR",
    mapsQuery: "Bandra Fish Market Mumbai",
  },
  {
    name: "Dadar Fish Market",
    area: "Dadar West",
    lat: 19.0188,
    lng: 72.8426,
    bestFor: "Bombil, mackerel, prawns, clams",
    tip: "A practical central stop for home cooks. Best for everyday seafood and quick buys after a morning commute.",
    quality: "Central Mumbai pick",
    code: "DDR",
    mapsQuery: "Dadar Fish Market Mumbai",
  },
  {
    name: "Crawford Market Fish Section",
    area: "Fort / CST",
    lat: 18.9476,
    lng: 72.8342,
    bestFor: "Prawns, crabs, squid, imported and local seafood",
    tip: "Closest useful market zone for Fort and Churchgate if you want variety plus other groceries in one trip.",
    quality: "South Mumbai variety",
    code: "CST",
    mapsQuery: "Crawford Market Fish Market Mumbai",
  },
  {
    name: "Sassoon Dock Fish Market",
    area: "Colaba / Churchgate side",
    lat: 18.9158,
    lng: 72.8214,
    bestFor: "Fresh landings, surmai, prawns, crabs, squid",
    tip: "The standout South Mumbai seafood source. Go very early for the real dock-market energy and best fresh catch.",
    quality: "Iconic wholesale dock",
    code: "SSD",
    mapsQuery: "Sassoon Dock Fish Market Mumbai",
  },
];

const mumbaiLocations = [
  { label: "Bhayandar", lat: 19.3107, lng: 72.8539 },
  { label: "Borivali", lat: 19.229, lng: 72.857 },
  { label: "Kandivali", lat: 19.2058, lng: 72.8682 },
  { label: "Malad", lat: 19.1867, lng: 72.8488 },
  { label: "Goregaon", lat: 19.1646, lng: 72.8493 },
  { label: "Andheri", lat: 19.1197, lng: 72.8464 },
  { label: "Juhu", lat: 19.1075, lng: 72.8263 },
  { label: "Khar", lat: 19.0701, lng: 72.8247 },
  { label: "Bandra", lat: 19.0596, lng: 72.8295 },
  { label: "Mahim", lat: 19.0437, lng: 72.8397 },
  { label: "Dadar", lat: 19.0188, lng: 72.8426 },
  { label: "CST", lat: 18.9402, lng: 72.8356 },
  { label: "Fort", lat: 18.9352, lng: 72.8374 },
  { label: "Churchgate", lat: 18.9322, lng: 72.8264 },
];

// Season guide: activeMonthIndex uses the visitor's current month by default.
const seasons = [
  {
    month: "January",
    fish: ["Pomfret", "Kingfish", "Crab", "Squid", "Clams"],
    note: "Cooler water months are strong for pomfret and kingfish, with crab, squid, and clams also popular in coastal markets.",
  },
  {
    month: "February",
    fish: ["Mackerel", "Tuna", "Mussels", "Oysters", "Prawns"],
    note: "A good month for oily fish, prawns, and bivalves. Mackerel works beautifully in coconut curry or a dry chilli fry.",
  },
  {
    month: "March",
    fish: ["Pomfret", "Prawns", "Cuttlefish", "Squid"],
    note: "Late-season pomfret is still useful for recheado, while prawns, squid, and cuttlefish begin showing well in many markets.",
  },
  {
    month: "April",
    fish: ["Tuna", "Mussels", "Clams", "Prawns"],
    note: "Pre-monsoon heat makes fast handling important. Choose fish and shellfish from vendors with good icing and quick turnover.",
  },
  {
    month: "May",
    fish: ["Mackerel", "Crab", "Lobster", "Squid"],
    note: "Availability varies by coast as fishing restrictions approach. Ask vendors what was landed locally that morning.",
  },
  {
    month: "June",
    fish: ["Clams", "Mussels", "Limited fresh catch", "Farmed freshwater fish"],
    note: "Many western coastal areas observe monsoon fishing bans around June and July, especially for mechanised vessels.",
    warning: "Buy thoughtfully during monsoon. Fresh marine fish may be limited, pricier, or brought from farther away.",
  },
  {
    month: "July",
    fish: ["Prawns", "Shrimp", "Cuttlefish", "Squid", "Freshwater fish"],
    note: "Monsoon restrictions can continue in several coastal states. Freshwater fish and responsibly sourced prawns become practical choices.",
    warning: "Check local advisories and avoid undersized fish during breeding periods.",
  },
  {
    month: "August",
    fish: ["Squid", "Tuna", "Mussels", "Clams"],
    note: "Markets begin waking up after the roughest monsoon stretch, with squid and mussels returning in better condition.",
  },
  {
    month: "September",
    fish: ["Mackerel", "Prawns", "Mussels", "Crab"],
    note: "Post-monsoon mackerel is abundant and flavourful. This is a strong month for bangda curry and crisp fry.",
  },
  {
    month: "October",
    fish: ["Pomfret", "Crab", "Lobster", "Prawns"],
    note: "One of the best market months: pomfret improves, shellfish gets sweeter, and festive menus often lean seafood-heavy.",
  },
  {
    month: "November",
    fish: ["Kingfish", "Pomfret", "Oysters", "Mussels", "Crab"],
    note: "Excellent for surmai steaks, pomfret fry, and richer coastal curries with clean winter flavour.",
  },
  {
    month: "December",
    fish: ["Tuna", "Pomfret", "Squid", "Kingfish", "Prawns"],
    note: "Peak entertaining season. Firm fish hold marinades well, while squid is ideal for quick high-heat cooking.",
  },
];

const dishGrid = document.querySelector("[data-dish-grid]");
const shopGrid = document.querySelector("[data-shop-grid]");
const filterBar = document.querySelector("[data-filter-bar]");
const regionTabs = document.querySelector("[data-region-tabs]");
const regionDetail = document.querySelector("[data-region-detail]");
const restaurantGrid = document.querySelector("[data-restaurant-grid]");
const marketGrid = document.querySelector("[data-market-grid]");
const marketSearch = document.querySelector("[data-market-search]");
const locationChips = document.querySelector("[data-location-chips]");
const marketRecommendation = document.querySelector("[data-market-recommendation]");
const monthPicker = document.querySelector("[data-month-picker]");
const seasonCard = document.querySelector("[data-season-card]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartOpenButton = document.querySelector("[data-cart-open]");
const cartCloseButton = document.querySelector("[data-cart-close]");
const cartItems = document.querySelector("[data-cart-items]");
const cartSubtotal = document.querySelector("[data-cart-subtotal]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartCount = document.querySelector("[data-cart-count]");
const placeOrderButton = document.querySelector("[data-place-order]");
const orderStatus = document.querySelector("[data-order-status]");
const paymentOptions = document.querySelector("[data-payment-options]");

let activeRegion = "All";
let activeRegionIndex = 0;
let activeMonthIndex = new Date().getMonth();
let activeMarket = mumbaiMarkets[mumbaiMarkets.length - 1];
let selectedPayment = "Debit card";
const cart = new Map();

function formatRupees(amount) {
  return `Rs ${amount.toLocaleString("en-IN")}`;
}

function renderShop() {
  shopGrid.innerHTML = seafoodProducts
    .map(
      (product) => `
        <article class="shop-card reveal is-visible">
          <div class="shop-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <span>${product.eta}</span>
          </div>
          <div class="shop-copy">
            <span class="shop-category">${product.category} / ${product.weight}</span>
            <h3>${product.name}</h3>
            <p>${product.availability}</p>
            <div class="shop-card-bottom">
              <strong>${formatRupees(product.price)}</strong>
              <button type="button" data-add-product="${product.id}">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  const entries = [...cart.values()];
  const subtotal = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = entries.length ? 29 : 0;

  cartCount.textContent = entries.reduce((sum, item) => sum + item.quantity, 0);
  cartSubtotal.textContent = formatRupees(subtotal);
  cartTotal.textContent = formatRupees(subtotal + delivery);

  cartItems.innerHTML = entries.length
    ? entries
        .map(
          ({ product, quantity }) => `
            <div class="cart-item">
              <img src="${product.image}" alt="${product.name}" />
              <div>
                <strong>${product.name}</strong>
                <span>${product.weight} / ${formatRupees(product.price)}</span>
              </div>
              <div class="quantity-stepper">
                <button type="button" data-decrease-product="${product.id}">-</button>
                <span>${quantity}</span>
                <button type="button" data-add-product="${product.id}">+</button>
              </div>
            </div>
          `
        )
        .join("")
    : `<p class="empty-cart">Add seafood to start your demo order.</p>`;
}

function addToCart(productId) {
  const product = seafoodProducts.find((item) => item.id === productId);
  const current = cart.get(productId);
  cart.set(productId, { product, quantity: current ? current.quantity + 1 : 1 });
  orderStatus.textContent = "";
  renderCart();
}

function decreaseCart(productId) {
  const current = cart.get(productId);
  if (!current) return;

  if (current.quantity === 1) {
    cart.delete(productId);
  } else {
    cart.set(productId, { product: current.product, quantity: current.quantity - 1 });
  }

  renderCart();
}

function renderFilters() {
  const regionsList = ["All", ...new Set(dishes.map((dish) => dish.region))];

  filterBar.innerHTML = regionsList
    .map(
      (region) => `
        <button class="filter-btn ${region === activeRegion ? "active" : ""}" type="button" data-filter="${region}">
          ${region}
        </button>
      `
    )
    .join("");
}

function renderDishes() {
  const visibleDishes = activeRegion === "All" ? dishes : dishes.filter((dish) => dish.region === activeRegion);

  dishGrid.innerHTML = visibleDishes
    .map(
      (dish) => `
        <article class="dish-card reveal is-visible">
          <div class="dish-image">
            <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
          </div>
          <div class="dish-body">
            <span class="dish-role">${dish.role}</span>
            <span class="dish-meta">${dish.region} / ${dish.fish}</span>
            <h3>${dish.name}</h3>
            <span class="dish-pronunciation">Pronounced: ${dish.pronunciation}</span>
            <p>${dish.description}</p>
            <div class="dish-tags">
              ${dish.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderRegionTabs() {
  regionTabs.innerHTML = regions
    .map(
      (region, index) => `
        <button
          class="region-tab ${index === activeRegionIndex ? "active" : ""}"
          type="button"
          role="tab"
          aria-selected="${index === activeRegionIndex}"
          data-region-index="${index}"
        >
          ${region.name}
        </button>
      `
    )
    .join("");
}

function renderRegionDetail() {
  const region = regions[activeRegionIndex];

  regionDetail.innerHTML = `
    <img src="${region.image}" alt="${region.name}" loading="lazy" />
    <div class="region-copy">
      <h3>${region.name}</h3>
      <p>${region.summary}</p>
      <ul class="fish-list">
        ${region.fish.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderRestaurantGuide() {
  restaurantGrid.innerHTML = restaurantGuide
    .map(
      (group) => `
        <article class="restaurant-card reveal is-visible">
          <span class="restaurant-region">${group.region}</span>
          <div class="restaurant-list">
            ${group.places
              .map(
                (place) => `
                  <div class="restaurant-place">
                    <div class="restaurant-image">
                      <img
                        src="${place.image}"
                        alt="${place.name}"
                        loading="lazy"
                        onerror="this.src='https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80'"
                      />
                    </div>
                    <div class="restaurant-content">
                      <div class="restaurant-topline">
                        <span class="restaurant-city">${place.city}</span>
                        <span>Guide pick</span>
                      </div>
                      <h3>${place.name}</h3>
                      <p class="restaurant-order">Try: ${place.try}</p>
                      <p>${place.review}</p>
                      <a href="${place.source}" target="_blank" rel="noreferrer">Source / details</a>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function distanceInKm(pointA, pointB) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(pointB.lat - pointA.lat);
  const dLng = toRadians(pointB.lng - pointA.lng);
  const lat1 = toRadians(pointA.lat);
  const lat2 = toRadians(pointB.lat);
  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function getMapsUrl(market) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(market.mapsQuery)}`;
}

function findNearestMarket(location) {
  return mumbaiMarkets
    .map((market) => ({
      ...market,
      distance: distanceInKm(location, market),
    }))
    .sort((a, b) => a.distance - b.distance)[0];
}

function setActiveMarket(market, searchedLocation) {
  activeMarket = market;
  renderMarketCards();
  renderMarketRecommendation(searchedLocation);
}

function renderLocationChips() {
  locationChips.innerHTML = mumbaiLocations
    .map(
      (location) => `
        <button class="location-chip" type="button" data-location="${location.label}">
          ${location.label}
        </button>
      `
    )
    .join("");
}

function renderMarketRecommendation(searchedLocation = mumbaiLocations[mumbaiLocations.length - 1]) {
  const distance = distanceInKm(searchedLocation, activeMarket).toFixed(1);

  marketRecommendation.innerHTML = `
    <span>Recommended closest spot</span>
    <h4>${activeMarket.name}</h4>
    <p>${activeMarket.area} / about ${distance} km from ${searchedLocation.label}</p>
    <p>${activeMarket.tip}</p>
    <a class="maps-primary" href="${getMapsUrl(activeMarket)}">
      Open in Google Maps
    </a>
  `;
}

function renderMarketCards() {
  marketGrid.innerHTML = mumbaiMarkets
    .map(
      (market) => `
        <article class="market-card ${market.name === activeMarket.name ? "active" : ""}">
          <div class="market-card-image" aria-hidden="true">
            <span class="market-route-code">${market.code}</span>
            <span class="market-pin"></span>
            <span class="market-line"></span>
          </div>
          <div class="market-card-copy">
            <span>${market.quality}</span>
            <h3>${market.name}</h3>
            <p class="market-area">${market.area}</p>
            <p>Best for: ${market.bestFor}</p>
            <div class="market-actions">
              <a href="${getMapsUrl(market)}">Open Google Maps</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function handleMarketSearch(value) {
  const normalized = value.trim().toLowerCase();
  const matchedLocation =
    mumbaiLocations.find((location) => location.label.toLowerCase().includes(normalized)) ||
    mumbaiLocations.find((location) => normalized.includes(location.label.toLowerCase())) ||
    mumbaiLocations[mumbaiLocations.length - 1];

  setActiveMarket(findNearestMarket(matchedLocation), matchedLocation);
}

function renderMonths() {
  monthPicker.innerHTML = seasons
    .map(
      (season, index) => `
        <button class="month-btn ${index === activeMonthIndex ? "active" : ""}" type="button" data-month-index="${index}">
          ${season.month.slice(0, 3)}
        </button>
      `
    )
    .join("");
}

function renderSeasonCard() {
  const season = seasons[activeMonthIndex];

  seasonCard.innerHTML = `
    <span class="season-tag">${season.month}</span>
    <h3>Best to look for: ${season.fish.slice(0, 2).join(" and ")}</h3>
    <p>${season.note}</p>
    <div class="fish-pills">
      ${season.fish.map((fish) => `<span class="fish-pill">${fish}</span>`).join("")}
    </div>
    ${
      season.warning
        ? `<p class="season-warning">${season.warning}</p>`
        : `<p class="season-warning">Seasonality changes by landing centre, weather, and state rules, so treat this as a smart market guide.</p>`
    }
  `;
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

filterBar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  activeRegion = button.dataset.filter;
  renderFilters();
  renderDishes();
});

shopGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-product]");
  if (!button) return;

  addToCart(button.dataset.addProduct);
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
});

regionTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-region-index]");
  if (!button) return;

  activeRegionIndex = Number(button.dataset.regionIndex);
  renderRegionTabs();
  renderRegionDetail();
});

monthPicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-month-index]");
  if (!button) return;

  activeMonthIndex = Number(button.dataset.monthIndex);
  renderMonths();
  renderSeasonCard();
});

marketSearch.addEventListener("input", (event) => {
  handleMarketSearch(event.target.value);
});

locationChips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-location]");
  if (!button) return;

  marketSearch.value = button.dataset.location;
  handleMarketSearch(button.dataset.location);
});

marketGrid.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;

  const card = event.target.closest(".market-card");
  if (!card) return;

  const marketName = card.querySelector("h3").textContent;
  const market = mumbaiMarkets.find((item) => item.name === marketName);
  setActiveMarket(market, { label: market.area, lat: market.lat, lng: market.lng });
});

cartOpenButton.addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
});

cartCloseButton.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
});

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    return;
  }

  const addButton = event.target.closest("[data-add-product]");
  const decreaseButton = event.target.closest("[data-decrease-product]");

  if (addButton) addToCart(addButton.dataset.addProduct);
  if (decreaseButton) decreaseCart(decreaseButton.dataset.decreaseProduct);
});

paymentOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-payment]");
  if (!button) return;

  selectedPayment = button.dataset.payment;
  paymentOptions.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
});

placeOrderButton.addEventListener("click", () => {
  if (!cart.size) {
    orderStatus.textContent = "Add at least one item before placing a demo order.";
    return;
  }

  orderStatus.textContent = `Order placed with ${selectedPayment}. Your seafood will be delivered soon.`;
  cart.clear();
  renderCart();
});

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
});

renderShop();
renderCart();
renderFilters();
renderDishes();
renderRegionTabs();
renderRegionDetail();
renderRestaurantGuide();
renderLocationChips();
renderMarketCards();
renderMarketRecommendation();
renderMonths();
renderSeasonCard();
setupRevealAnimation();
